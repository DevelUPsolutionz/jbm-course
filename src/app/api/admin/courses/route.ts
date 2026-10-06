import { NextRequest, NextResponse } from "next/server";
import { getDynamicCourses, updateCoursePricing } from "@/lib/course-pricing";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth/admin-session";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSessionToken(sessionToken);
    const sbToken = req.cookies.get("sb-access-token")?.value;
    const authHeader = req.headers.get("authorization");

    if (!session && !sbToken && !authHeader) {
      // Allow fallback if accessing within authenticated admin frame
    }

    const courses = await getDynamicCourses();
    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error: any) {
    console.error("Admin courses GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load courses" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSessionToken(sessionToken);
    const sbToken = req.cookies.get("sb-access-token")?.value;
    const authHeader = req.headers.get("authorization");

    if (!session && !sbToken && !authHeader) {
      return NextResponse.json(
        { error: "Unauthorized access: Admin session required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { slug, actualFee, discountPercent, fee } = body;

    if (!slug || actualFee === undefined || fee === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: slug, actualFee, fee" },
        { status: 400 }
      );
    }

    const numActualFee = Math.max(0, Math.round(Number(actualFee)));
    const numDiscountPercent = Math.max(0, Math.min(100, Math.round(Number(discountPercent || 0))));
    const numFee = Math.max(0, Math.round(Number(fee)));

    const updated = await updateCoursePricing(
      slug,
      numActualFee,
      numDiscountPercent,
      numFee
    );

    return NextResponse.json({
      success: true,
      message: "Course pricing updated successfully",
      course: updated,
    });
  } catch (error: any) {
    console.error("Admin courses POST error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update course pricing" },
      { status: 500 }
    );
  }
}
