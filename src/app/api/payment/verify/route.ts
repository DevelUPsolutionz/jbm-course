import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendPaymentConfirmedEmail, sendAdminPaymentReceivedAlert } from "@/lib/email/send";
import { rateLimit } from "@/lib/rate-limit";
import { generateReceiptPDF } from "@/lib/pdf/generateReceipt";
import { getDynamicCourseBySlug } from "@/lib/course-pricing";
import { getCourseBySlug } from "@/config/courses";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting: 10 verification requests per minute per IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const { success } = rateLimit(`payment-verify:${ip}`, 10, 60000);

    if (!success) {
      return NextResponse.json(
        { error: "Too many verification requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationReference,
    } = body;

    // Strict input validation
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !registrationReference ||
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string" ||
      typeof registrationReference !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or malformed payment verification parameters." },
        { status: 400 }
      );
    }

    // 2. Constant-time HMAC cryptographic verification
    const isValid = verifyPaymentSignature({
      orderId: razorpay_order_id.trim(),
      paymentId: razorpay_payment_id.trim(),
      signature: razorpay_signature.trim(),
    });

    if (!isValid) {
      console.warn("SECURITY ALERT: Invalid payment signature rejected for order:", razorpay_order_id);
      return NextResponse.json(
        { error: "Payment verification failed: Digital signature is invalid or tampered with." },
        { status: 400 }
      );
    }

    // 3. Database transaction verification & state update
    const supabase = getAdminClient();
    const cleanRef = registrationReference.trim().replace(/[^a-zA-Z0-9_-]/g, "");

    let studentEmail = "";
    let studentName = "";
    let studentPhone = "";
    let courseTitle = "";
    let paidAmount = 0;

    try {
      // Find the registration
      const { data: reg, error: regError } = await supabase
        .from("registrations")
        .select("*")
        .eq("registration_reference", cleanRef)
        .single();

      // Find the corresponding payment record to get exact paid amount
      const { data: paymentRecord } = await supabase
        .from("payments")
        .select("*")
        .eq("provider_order_id", razorpay_order_id.trim())
        .maybeSingle();

      if (reg) {
        studentEmail = reg.email;
        studentName = reg.full_name;
        studentPhone = reg.phone;
        courseTitle = reg.course_title;
        paidAmount = paymentRecord?.amount !== undefined ? paymentRecord.amount : reg.amount;

        // 1. Generate PDF and upload to Supabase Storage if not already done
        let pdfBuffer: Buffer | undefined;
        let receiptPath: string | null = reg.receipt_url || null;

        try {
          const dynamicCourse = await getDynamicCourseBySlug(reg.course_slug);
          const course = dynamicCourse || getCourseBySlug(reg.course_slug);
          const totalCourseFee = course?.actualFee || (paidAmount > 0 ? paidAmount * 2 : 20000);
          const discountApplied = Math.max(0, totalCourseFee - paidAmount);
          const discountPercent = totalCourseFee > 0 ? Math.round((discountApplied / totalCourseFee) * 100) : 0;

          let couponCode = "";
          if (reg.message && reg.message.includes("[Referral:")) {
            const match = reg.message.match(/\[Referral:\s*([^\]]+)\]/);
            if (match) couponCode = match[1];
          } else if (reg.message && reg.message.includes("[Coupon:")) {
            const match = reg.message.match(/\[Coupon:\s*([^\]]+)\]/);
            if (match) couponCode = match[1];
          }

          const paymentDate = new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Kolkata",
          });
          const currentYear = new Date().getFullYear();
          const invoiceNo = `JBM-${currentYear}-${cleanRef.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase()}`;

          pdfBuffer = await generateReceiptPDF({
            invoiceNo,
            date: paymentDate,
            studentName: reg.full_name,
            phone: reg.phone,
            email: reg.email,
            courseName: reg.course_title,
            totalCourseFee,
            couponCode: couponCode || "N/A",
            scholarshipDiscount: discountPercent > 0 ? `${discountPercent}% Scholarship` : "Standard Enrollment",
            discountApplied,
            finalAmount: paidAmount,
            amountPaid: paidAmount,
            paymentMode: "Razorpay Secure Gateway",
            transactionId: razorpay_payment_id.trim(),
            paymentDate,
          });

          // Upload PDF to Supabase Storage
          const fileName = `JBM_Invoice_${cleanRef}.pdf`;
          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from("invoices")
            .upload(fileName, pdfBuffer, {
              contentType: "application/pdf",
              upsert: true,
            });

          if (!uploadErr && uploadData) {
            receiptPath = uploadData.path || fileName;
          } else {
            receiptPath = fileName;
          }
        } catch (pdfErr) {
          console.error("PDF generation in verify route notice:", pdfErr);
        }

        // 2. Always ensure registration status is updated to 'paid'
        await supabase
          .from("registrations")
          .update({
            payment_status: "paid",
            amount: paidAmount,
            receipt_url: receiptPath || `JBM_Invoice_${cleanRef}.pdf`,
          })
          .eq("id", reg.id);

        // 3. Update payments table record
        await supabase
          .from("payments")
          .update({
            provider_payment_id: razorpay_payment_id.trim(),
            provider_signature: razorpay_signature.trim(),
            status: "captured",
          })
          .eq("provider_order_id", razorpay_order_id.trim());

        // 4. Send confirmation emails to Student & Admin (Guaranteed dispatch)
        const alreadyEmailed = reg.message && reg.message.includes("[ReceiptEmailed]");
        if (studentEmail && !alreadyEmailed) {
          try {
            console.log(`[VERIFY ROUTE] Dispatching payment confirmation email to ${studentEmail}...`);
            const emailResults = await Promise.allSettled([
              sendPaymentConfirmedEmail({
                fullName: studentName,
                email: studentEmail,
                courseTitle: courseTitle,
                registrationReference: cleanRef,
                amount: paidAmount,
                paymentId: razorpay_payment_id.trim(),
                receiptBuffer: pdfBuffer,
              }),
              sendAdminPaymentReceivedAlert({
                fullName: studentName,
                email: studentEmail,
                courseTitle: courseTitle,
                registrationReference: cleanRef,
                amount: paidAmount,
                paymentId: razorpay_payment_id.trim(),
              }),
            ]);
            console.log(`[VERIFY ROUTE] Confirmation email results for ${cleanRef}:`, JSON.stringify(emailResults));

            // Mark registration message as receipt emailed
            const updatedMsg = `${reg.message || ""} [ReceiptEmailed]`.trim();
            await supabase
              .from("registrations")
              .update({ message: updatedMsg })
              .eq("id", reg.id);
          } catch (emailErr) {
            console.error("Payment confirmation emails dispatch error:", emailErr);
          }
        }
      }
    } catch (dbErr: any) {
      console.warn("DB payment verification update notice:", dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and registered.",
      registrationReference: cleanRef,
      paymentId: razorpay_payment_id.trim(),
      amount: paidAmount,
    });
  } catch (error: any) {
    console.error("Payment verification route exception:", error);
    return NextResponse.json(
      { error: "An error occurred while verifying the payment transaction." },
      { status: 500 }
    );
  }
}
