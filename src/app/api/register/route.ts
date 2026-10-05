import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validations/registration";
import { getCourseBySlug } from "@/config/courses";
import { generateRegistrationReference } from "@/lib/utils";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendRegistrationReceivedEmail } from "@/lib/email/send";
import { rateLimit } from "@/lib/rate-limit";
import { calculateDiscountedPrice } from "@/config/coupons";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = rateLimit(ip, 15, 60000); // 15 requests per minute

    if (!success) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 1. Validate payload
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid registration data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 2. Validate course existence & price lookup
    const course = getCourseBySlug(data.courseSlug);
    if (!course) {
      return NextResponse.json(
        { error: "The selected course does not exist." },
        { status: 400 }
      );
    }

    // 3. Calculate discounted price if coupon applied
    const { finalPrice, discountAmount, appliedCoupon } = calculateDiscountedPrice(
      course.fee,
      data.couponCode
    );

    // 4. Generate unique reference
    const registrationReference = generateRegistrationReference(data.courseSlug);

    // 5. Save to Supabase
    const supabase = getAdminClient();
    try {
      const { error: dbError } = await supabase.from("registrations").insert({
        registration_reference: registrationReference,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        course_id: course.id,
        course_slug: course.slug,
        course_title: course.title,
        amount: finalPrice,
        currency: course.currency,
        message: data.message ? `[Coupon: ${data.couponCode || "None"}] ${data.message}` : (data.couponCode ? `Coupon Applied: ${data.couponCode}` : null),
        payment_status: "pending",
        terms_accepted: data.termsAccepted,
      });

      if (dbError) {
        console.warn("Database persistence notice (Supabase table check):", dbError.message);
      }
    } catch (err: any) {
      console.warn("Database insert skipped or failed:", err.message);
    }

    // 6. Send registration received email
    sendRegistrationReceivedEmail({
      fullName: data.fullName,
      email: data.email,
      courseTitle: course.title,
      registrationReference: registrationReference,
      amount: finalPrice,
    }).catch((err) => console.error("Email send error:", err));

    return NextResponse.json({
      success: true,
      registrationReference,
      course: {
        title: course.title,
        slug: course.slug,
        originalFee: course.fee,
        fee: finalPrice,
        discountAmount,
        couponCode: appliedCoupon?.code || null,
        currency: course.currency,
      },
    });
  } catch (error: any) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing registration." },
      { status: 500 }
    );
  }
}
