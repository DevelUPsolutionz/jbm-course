import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendPaymentConfirmedEmail, sendAdminPaymentReceivedAlert } from "@/lib/email/send";
import { generateReceiptPDF } from "@/lib/pdf/generateReceipt";
import { getCourseBySlug } from "@/config/courses";
import { getDynamicCourseBySlug } from "@/lib/course-pricing";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature header." }, { status: 400 });
    }

    // 1. Verify Webhook Signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event;
    const eventId = payload.event_id || `${eventType}_${Date.now()}`;

    const supabase = getAdminClient();

    // 2. Idempotency Check: Prevent processing repeated webhook deliveries
    try {
      const { data: existingLog } = await supabase
        .from("webhook_logs")
        .select("id")
        .eq("event_id", eventId)
        .single();

      if (existingLog) {
        return NextResponse.json({ status: "already_processed" }, { status: 200 });
      }

      // Record webhook event log
      await supabase.from("webhook_logs").insert({
        event_id: eventId,
        event_type: eventType,
        payload: payload,
        status: "processed",
      });
    } catch (logErr) {
      console.warn("Webhook idempotency log notice:", logErr);
    }

    // 3. Handle Specific Payment Events
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;
      const notes = paymentEntity?.notes || {};
      const registrationReference = notes.registrationReference;

      if (registrationReference) {
        try {
          const { data: reg } = await supabase
            .from("registrations")
            .select("*")
            .eq("registration_reference", registrationReference)
            .single();

          if (reg && reg.payment_status !== "paid") {
            
            // 1. Calculate dynamic sequential invoice number: e.g., JBM-2026-0001, JBM-2026-0002...
            const currentYear = new Date().getFullYear();
            const yearStart = `${currentYear}-01-01T00:00:00.000Z`;
            const yearEnd = `${currentYear + 1}-01-01T00:00:00.000Z`;

            const { count } = await supabase
              .from("registrations")
              .select("id", { count: "exact", head: true })
              .eq("payment_status", "paid")
              .gte("created_at", yearStart)
              .lt("created_at", yearEnd);

            const seqNum = ((count || 0) + 1).toString().padStart(4, "0");
            const dynamicInvoiceNo = `JBM-${currentYear}-${seqNum}`;

            const paymentDate = new Date().toLocaleDateString("en-IN", {
              day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata"
            });
            
            let pdfBuffer;
            let receiptPath = null;
            
            try {
              let couponCode = "";
              if (reg.message && reg.message.includes("[Referral:")) {
                const match = reg.message.match(/\[Referral:\s*([^\]]+)\]/);
                if (match) couponCode = match[1];
              }

              const dynamicCourse = await getDynamicCourseBySlug(reg.course_slug);
              const course = dynamicCourse || getCourseBySlug(reg.course_slug);
              const actualFee = course ? course.actualFee : reg.amount * 2; 
              const discountPercent = course ? course.discountPercent : 50;
              const discountApplied = actualFee - reg.amount;

              pdfBuffer = await generateReceiptPDF({
                invoiceNo: dynamicInvoiceNo,
                date: paymentDate,
                studentName: reg.full_name,
                phone: reg.phone,
                email: reg.email,
                courseName: reg.course_title,
                totalCourseFee: actualFee,
                couponCode: couponCode,
                scholarshipDiscount: `${discountPercent}% Scholarship`,
                discountApplied: discountApplied,
                finalAmount: reg.amount,
                amountPaid: reg.amount,
                paymentMode: "Razorpay Secure Gateway",
                transactionId: paymentId || "ONLINE_PAYMENT",
                paymentDate: paymentDate
              });

              // 2. Upload to Supabase Storage
              const fileName = `JBM_Invoice_${reg.registration_reference}.pdf`;
              const { data: uploadData, error: uploadError } = await supabase.storage
                .from("invoices")
                .upload(fileName, pdfBuffer, {
                  contentType: 'application/pdf',
                  upsert: true
                });
                
              if (!uploadError && uploadData) {
                receiptPath = uploadData.path; // Store the storage path
              } else {
                console.error("Failed to upload invoice to Supabase:", uploadError);
              }
            } catch (pdfErr) {
              console.error("Failed to generate PDF:", pdfErr);
            }

            // 3. Update registration to paid and set receipt_url
            await supabase
              .from("registrations")
              .update({ 
                payment_status: "paid",
                receipt_url: receiptPath
              })
              .eq("id", reg.id);

            // Update payments table
            if (orderId) {
              await supabase
                .from("payments")
                .update({
                  provider_payment_id: paymentId,
                  status: "captured",
                  raw_payload: paymentEntity,
                })
                .eq("provider_order_id", orderId);
            }

            // Send confirmation emails to Student & Admin (AWAITED)
            try {
              await Promise.allSettled([
                sendPaymentConfirmedEmail({
                  fullName: reg.full_name,
                  email: reg.email,
                  courseTitle: reg.course_title,
                  registrationReference: reg.registration_reference,
                  amount: reg.amount,
                  paymentId: paymentId || "ONLINE_PAYMENT",
                  receiptBuffer: pdfBuffer,
                }),
                sendAdminPaymentReceivedAlert({
                  fullName: reg.full_name,
                  email: reg.email,
                  courseTitle: reg.course_title,
                  registrationReference: reg.registration_reference,
                  amount: reg.amount,
                  paymentId: paymentId || "ONLINE_PAYMENT",
                }),
              ]);
            } catch (emailErr) {
              console.error("Webhook email notification dispatch error:", emailErr);
            }
          }
        } catch (dbErr: any) {
          console.error("Webhook database update failed:", dbErr);
        }
      }
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook processing exception:", error);
    return NextResponse.json({ error: error.message || "Webhook processing error" }, { status: 500 });
  }
}
