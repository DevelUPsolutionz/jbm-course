import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendPaymentConfirmedEmail, sendAdminPaymentReceivedAlert } from "@/lib/email/send";

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
            // Update registration to paid
            await supabase
              .from("registrations")
              .update({ payment_status: "paid" })
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

            // Send confirmation emails to Student & Admin
            sendPaymentConfirmedEmail({
              fullName: reg.full_name,
              email: reg.email,
              courseTitle: reg.course_title,
              registrationReference: reg.registration_reference,
              amount: reg.amount,
              paymentId: paymentId || "ONLINE_PAYMENT",
            }).catch((err) => console.error("Webhook student email notification error:", err));

            sendAdminPaymentReceivedAlert({
              fullName: reg.full_name,
              email: reg.email,
              courseTitle: reg.course_title,
              registrationReference: reg.registration_reference,
              amount: reg.amount,
              paymentId: paymentId || "ONLINE_PAYMENT",
            }).catch((err) => console.error("Webhook admin payment notification error:", err));
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
