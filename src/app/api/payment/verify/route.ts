import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendPaymentConfirmedEmail, sendAdminPaymentReceivedAlert } from "@/lib/email/send";
import { rateLimit } from "@/lib/rate-limit";

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
    let courseTitle = "";
    let amount = 0;

    try {
      // Find the registration
      const { data: reg, error: regError } = await supabase
        .from("registrations")
        .select("*")
        .eq("registration_reference", cleanRef)
        .single();

      if (reg) {
        studentEmail = reg.email;
        studentName = reg.full_name;
        courseTitle = reg.course_title;
        amount = reg.amount;

        // Idempotency: Check if already marked paid
        if (reg.payment_status !== "paid") {
          // Update registration status to 'paid'
          await supabase
            .from("registrations")
            .update({ payment_status: "paid" })
            .eq("id", reg.id);

          // Update payments table record
          await supabase
            .from("payments")
            .update({
              provider_payment_id: razorpay_payment_id.trim(),
              provider_signature: razorpay_signature.trim(),
              status: "captured",
            })
            .eq("provider_order_id", razorpay_order_id.trim());

          // Send confirmation emails to Student and Admin
          if (studentEmail) {
            sendPaymentConfirmedEmail({
              fullName: studentName,
              email: studentEmail,
              courseTitle: courseTitle,
              registrationReference: cleanRef,
              amount: amount,
              paymentId: razorpay_payment_id.trim(),
            }).catch((err) => console.error("Payment email dispatch error:", err));

            sendAdminPaymentReceivedAlert({
              fullName: studentName,
              email: studentEmail,
              courseTitle: courseTitle,
              registrationReference: cleanRef,
              amount: amount,
              paymentId: razorpay_payment_id.trim(),
            }).catch((err) => console.error("Admin payment alert dispatch error:", err));
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
    });
  } catch (error: any) {
    console.error("Payment verification route exception:", error);
    return NextResponse.json(
      { error: "An error occurred while verifying the payment transaction." },
      { status: 500 }
    );
  }
}
