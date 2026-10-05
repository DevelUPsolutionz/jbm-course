import { NextRequest, NextResponse } from "next/server";
import { getCourseBySlug } from "@/config/courses";
import { createRazorpayOrder } from "@/lib/razorpay";
import { getAdminClient } from "@/lib/supabase/admin";
import { calculateDiscountedPrice } from "@/config/coupons";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { registrationReference, courseSlug, couponCode } = body;

    if (!registrationReference || !courseSlug) {
      return NextResponse.json(
        { error: "Missing registration reference or course identifier." },
        { status: 400 }
      );
    }

    // 1. Server-side price lookup & coupon discount verification
    const course = getCourseBySlug(courseSlug);
    if (!course) {
      return NextResponse.json(
        { error: "Invalid course program." },
        { status: 400 }
      );
    }

    const { finalPrice, discountAmount, appliedCoupon } = calculateDiscountedPrice(
      course.fee,
      couponCode
    );

    // If 100% discount referral coupon is applied, amount is 0, handle free VIP pass
    if (finalPrice === 0) {
      const supabase = getAdminClient();
      try {
        await supabase
          .from("registrations")
          .update({ payment_status: "paid" })
          .eq("registration_reference", registrationReference);
      } catch (e) {
        console.warn("VIP Referral registration mark paid:", e);
      }

      return NextResponse.json({
        success: true,
        isFree: true,
        orderId: `free_vip_${Date.now()}`,
        amount: 0,
        currency: course.currency,
        keyId: "free_pass",
        discountAmount,
      });
    }

    // 2. Create Razorpay order with verified discounted price
    const order = await createRazorpayOrder({
      amount: finalPrice,
      currency: course.currency,
      receipt: registrationReference,
      notes: {
        registrationReference,
        courseSlug: course.slug,
        courseTitle: course.title,
        couponCode: appliedCoupon?.code || "NONE",
      },
    });

    // 3. Persist order to payments table in Supabase
    try {
      const supabase = getAdminClient();
      
      const { data: reg } = await supabase
        .from("registrations")
        .select("id")
        .eq("registration_reference", registrationReference)
        .single();

      if (reg) {
        await supabase.from("payments").insert({
          registration_id: reg.id,
          provider: "razorpay",
          provider_order_id: order.id,
          amount: finalPrice,
          currency: course.currency,
          status: "created",
          raw_payload: order as any,
        });
      }
    } catch (err: any) {
      console.warn("Payment order record notice:", err.message);
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      discountAmount,
      isMock: (order as any).isMock || false,
    });
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment order." },
      { status: 500 }
    );
  }
}
