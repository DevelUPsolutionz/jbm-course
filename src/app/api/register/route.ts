import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validations/registration";
import { getCourseBySlug } from "@/config/courses";
import { getDynamicCourseBySlug } from "@/lib/course-pricing";
import { generateRegistrationReference } from "@/lib/utils";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendRegistrationReceivedEmail, sendAdminNewRegistrationAlert } from "@/lib/email/send";
import { rateLimit } from "@/lib/rate-limit";
import { validateReferralCode } from "@/config/coupons";
import { sanitizeText } from "@/lib/security/sanitize";

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

    // 2. Validate course existence & price lookup (dynamic pricing)
    const dynamicCourse = await getDynamicCourseBySlug(data.courseSlug);
    const course = dynamicCourse || getCourseBySlug(data.courseSlug);
    if (!course) {
      return NextResponse.json(
        { error: "The selected course does not exist." },
        { status: 400 }
      );
    }

    // 3. Validate Referral Code if provided
    let appliedReferralCode: string | null = null;
    if (data.couponCode && data.couponCode.trim()) {
      const codeClean = data.couponCode.trim().toUpperCase();
      const validRef = validateReferralCode(codeClean);
      if (!validRef) {
        return NextResponse.json(
          { error: `Invalid Referral Code "${codeClean}". Please check with your counselor or leave it blank.` },
          { status: 400 }
        );
      }
      appliedReferralCode = validRef.code;
    }

    // 4. Generate unique reference
    const registrationReference = generateRegistrationReference(data.courseSlug);

    // 5. Save to Supabase (Referral code recorded in message tag and note)
    const supabase = getAdminClient();
    try {
      const referralTag = appliedReferralCode ? `[Referral: ${appliedReferralCode}]` : "";
      const rawMessage = [referralTag, data.message].filter(Boolean).join(" ").trim() || null;
      const cleanMessage = rawMessage ? sanitizeText(rawMessage) : null;
      const cleanFullName = sanitizeText(data.fullName);

      const { error: dbError } = await supabase.from("registrations").insert({
        registration_reference: registrationReference,
        full_name: cleanFullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        course_id: course.id,
        course_slug: course.slug,
        course_title: course.title,
        amount: course.fee,
        currency: course.currency,
        message: cleanMessage,
        payment_status: "pending",
        terms_accepted: data.termsAccepted,
      });

      if (dbError) {
        console.warn("Database persistence notice (Supabase table check):", dbError.message);
      }
    } catch (err: any) {
      console.warn("Database insert skipped or failed:", err.message);
    }

    // 6. Send emails to Student and Admin (AWAITED for serverless reliability)
    try {
      await Promise.allSettled([
        sendRegistrationReceivedEmail({
          fullName: data.fullName,
          email: data.email,
          courseTitle: course.title,
          registrationReference: registrationReference,
          amount: course.fee,
        }),
        sendAdminNewRegistrationAlert({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          courseTitle: course.title,
          registrationReference: registrationReference,
          amount: course.fee,
          referralCode: appliedReferralCode,
          message: data.message,
        }),
      ]);
    } catch (emailErr) {
      console.error("Registration email dispatch notice:", emailErr);
    }

    return NextResponse.json({
      success: true,
      registrationReference,
      course: {
        title: course.title,
        slug: course.slug,
        originalFee: course.fee,
        fee: course.fee,
        discountAmount: 0,
        couponCode: appliedReferralCode,
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
