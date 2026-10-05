import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendPaymentConfirmedEmail } from "@/lib/email/send";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationReference,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters." },
        { status: 400 }
      );
    }

    // 1. Verify HMAC signature server-side
    const isValid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed: Invalid digital signature." },
        { status: 400 }
      );
    }

    // 2. Update database records in Supabase
    const supabase = getAdminClient();
    let studentEmail = "";
    let studentName = "";
    let courseTitle = "";
    let amount = 0;

    try {
      // Find the registration
      const { data: reg } = await supabase
        .from("registrations")
        .select("*")
        .eq("registration_reference", registrationReference)
        .single();

      if (reg) {
        studentEmail = reg.email;
        studentName = reg.full_name;
        courseTitle = reg.course_title;
        amount = reg.amount;

        // Check if already marked paid (idempotency)
        if (reg.payment_status !== "paid") {
          // Update registration status to 'paid'
          await supabase
            .from("registrations")
            .update({ payment_status: "paid" })
            .eq("id", reg.id);

          // Update payment record
          await supabase
            .from("payments")
            .update({
              provider_payment_id: razorpay_payment_id,
              provider_signature: razorpay_signature,
              status: "captured",
            })
            .eq("provider_order_id", razorpay_order_id);

          // Send confirmation email
          if (studentEmail) {
            sendPaymentConfirmedEmail({
              fullName: studentName,
              email: studentEmail,
              courseTitle: courseTitle,
              registrationReference: registrationReference,
              amount: amount,
              paymentId: razorpay_payment_id,
            }).catch((err) => console.error("Payment email error:", err));
          }
        }
      }
    } catch (dbErr: any) {
      console.warn("DB payment verification update notice:", dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and registered.",
      registrationReference,
      paymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error("Payment verification route error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during payment verification." },
      { status: 500 }
    );
  }
}
