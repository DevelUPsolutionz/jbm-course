import { NextRequest, NextResponse } from "next/server";
import { getCourseBySlug } from "@/config/courses";
import { getDynamicCourseBySlug } from "@/lib/course-pricing";
import { createRazorpayOrder } from "@/lib/razorpay";
import { getAdminClient } from "@/lib/supabase/admin";
import { calculateDiscountedPrice } from "@/config/coupons";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting: 10 requests per minute per IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const { success } = rateLimit(`create-order:${ip}`, 10, 60000);

    if (!success) {
      return NextResponse.json(
        { error: "Too many payment order requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { registrationReference, courseSlug, couponCode } = body;

    // Strict input type & format validation
    if (
      !registrationReference ||
      !courseSlug ||
      typeof registrationReference !== "string" ||
      typeof courseSlug !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid registration reference or course identifier." },
        { status: 400 }
      );
    }

    // Sanitize reference to alphanumeric and safe hyphens
    const cleanReference = registrationReference.trim().replace(/[^a-zA-Z0-9_-]/g, "");

    // 2. Server-side dynamic price lookup & coupon discount verification
    const dynamicCourse = await getDynamicCourseBySlug(courseSlug.trim());
    const course = dynamicCourse || getCourseBySlug(courseSlug.trim());
    if (!course) {
      return NextResponse.json(
        { error: "Invalid course program specified." },
        { status: 400 }
      );
    }

    const { finalPrice, discountAmount, appliedCoupon } = calculateDiscountedPrice(
      course.fee,
      typeof couponCode === "string" ? couponCode.trim() : undefined
    );

    // If 100% discount referral coupon is applied, handle free VIP pass
    if (finalPrice === 0) {
      const supabase = getAdminClient();
      try {
        await supabase
          .from("registrations")
          .update({ payment_status: "paid" })
          .eq("registration_reference", cleanReference);
      } catch (e) {
        console.warn("VIP Referral registration mark paid notice:", e);
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

    // 3. Create Razorpay order with server-calculated price
    const order = await createRazorpayOrder({
      amount: finalPrice,
      currency: course.currency,
      receipt: cleanReference,
      notes: {
        registrationReference: cleanReference,
        courseSlug: course.slug,
        courseTitle: course.title,
        couponCode: appliedCoupon?.code || "NONE",
      },
    });

    // 4. Persist order to payments table in Supabase
    try {
      const supabase = getAdminClient();

      const { data: reg } = await supabase
        .from("registrations")
        .select("id")
        .eq("registration_reference", cleanReference)
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

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      "rzp_test_placeholder";

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
