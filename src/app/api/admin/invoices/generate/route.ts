import { NextRequest, NextResponse } from "next/server";
import { generateReceiptPDF, ReceiptData } from "@/lib/pdf/generateReceipt";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendPaymentConfirmedEmail } from "@/lib/email/send";
import { getCourseBySlug } from "@/config/courses";
import { getDynamicCourseBySlug } from "@/lib/course-pricing";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth/admin-session";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Admin Session / Authentication
    const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSessionToken(sessionToken);
    const sbToken = req.cookies.get("sb-access-token")?.value;
    const authHeader = req.headers.get("authorization");
    const jbmAuthCookie = req.cookies.get("jbm_admin_auth")?.value;

    if (!session && !sbToken && !authHeader && !jbmAuthCookie) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    // 2. Parse and Validate Request Payload
    const body = await req.json();
    const {
      studentName,
      email,
      phone,
      courseSlug,
      courseName: customCourseName,
      totalCourseFee: customTotalFee,
      amountPaid,
      paymentMode,
      transactionId,
      paymentDate: customPaymentDate,
      invoiceNo: customInvoiceNo,
      couponCode,
      sendEmail,
      recordInDb,
    } = body;

    if (!studentName || !email || !phone || !amountPaid) {
      return NextResponse.json(
        { error: "Missing required fields: Student Name, Email, Phone, and Amount Paid are mandatory." },
        { status: 400 }
      );
    }

    // 3. Resolve Course Information
    const dynamicCourse = courseSlug ? await getDynamicCourseBySlug(courseSlug) : null;
    const staticCourse = courseSlug ? getCourseBySlug(courseSlug) : null;
    const course = dynamicCourse || staticCourse;

    const courseName = customCourseName || course?.title || "Professional Certification Course";
    const totalCourseFee = Number(customTotalFee) || course?.actualFee || Number(amountPaid) * 2 || 20000;
    const paidAmount = Number(amountPaid);

    const discountApplied = Math.max(0, totalCourseFee - paidAmount);
    const discountPercent = totalCourseFee > 0 ? Math.round((discountApplied / totalCourseFee) * 100) : 0;

    // 4. Resolve Invoice Number & Date
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const invoiceNo = (customInvoiceNo && customInvoiceNo.trim()) || `JBM-${currentYear}-OFF${randomSuffix}`;

    const formattedDate = customPaymentDate
      ? new Date(customPaymentDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
      : new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        });

    const paymentDateStr = customPaymentDate
      ? new Date(customPaymentDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
      : formattedDate;

    // 5. Build Receipt Data for the Official Canva Template
    const receiptData: ReceiptData = {
      invoiceNo,
      date: formattedDate,
      studentName: studentName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      courseName,
      totalCourseFee,
      couponCode: couponCode ? couponCode.trim() : "DIRECT_OFFLINE",
      scholarshipDiscount: discountPercent > 0 ? `${discountPercent}% Scholarship` : "Standard Enrollment",
      discountApplied,
      finalAmount: paidAmount,
      amountPaid: paidAmount,
      paymentMode: paymentMode || "Direct UPI / Google Pay",
      transactionId: transactionId || `UPI-${Date.now().toString().slice(-8)}`,
      paymentDate: paymentDateStr,
    };

    // 6. Generate the High-Resolution PDF
    const pdfBuffer = await generateReceiptPDF(receiptData);
    const fileName = `JBM_Invoice_${invoiceNo}.pdf`;

    // 7. Optional Database & Supabase Storage Recording
    const supabase = getAdminClient();
    if (recordInDb !== false) {
      try {
        // Upload PDF to Supabase Storage
        await supabase.storage.from("invoices").upload(fileName, pdfBuffer, {
          contentType: "application/pdf",
          upsert: true,
        });

        // Insert into registrations table so admin analytics & registrations table see this student
        const { data: regData, error: regError } = await supabase
          .from("registrations")
          .insert({
            registration_reference: invoiceNo,
            full_name: studentName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            course_slug: courseSlug || "custom-offline",
            course_title: courseName,
            amount: paidAmount,
            status: "captured",
            payment_status: "captured",
            message: `[Offline UPI Payment: ${paymentMode || "UPI"} | Ref: ${transactionId || "N/A"}]`,
            receipt_url: fileName,
          })
          .select("id")
          .single();

        if (!regError && regData?.id) {
          // Record under payments table
          await supabase.from("payments").insert({
            registration_id: regData.id,
            provider_payment_id: transactionId || `TXN_OFFLINE_${Date.now()}`,
            amount: paidAmount,
            status: "captured",
          });
        }
      } catch (dbErr) {
        console.warn("Notice: Offline payment DB recording skipped/errored:", dbErr);
      }
    }

    // 8. Optional: Send Email to Student with PDF Attached
    let emailSent = false;
    if (sendEmail) {
      try {
        const emailRes = await sendPaymentConfirmedEmail({
          fullName: studentName.trim(),
          email: email.trim().toLowerCase(),
          courseTitle: courseName,
          registrationReference: invoiceNo,
          amount: paidAmount,
          paymentId: transactionId || invoiceNo,
          receiptBuffer: pdfBuffer,
        });
        emailSent = emailRes.success;
      } catch (eErr) {
        console.warn("Notice: Resend email dispatch notice:", eErr);
      }
    }

    // 9. Return Base64 PDF for Instant Direct Download in Browser
    return NextResponse.json({
      success: true,
      invoiceNo,
      fileName,
      emailSent,
      pdfBase64: pdfBuffer.toString("base64"),
      receiptData,
    });
  } catch (error: any) {
    console.error("Error generating manual invoice:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate manual invoice PDF" },
      { status: 500 }
    );
  }
}
