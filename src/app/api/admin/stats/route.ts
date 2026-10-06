import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { COURSES } from "@/config/courses";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth/admin-session";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSessionToken(sessionToken);
    const sbToken = req.cookies.get("sb-access-token")?.value;

    if (!session && !sbToken) {
      return NextResponse.json({ error: "Unauthorized access: Admin session required" }, { status: 401 });
    }

    const supabase = getAdminClient();
    const { data: registrations, error } = await supabase
      .from("registrations")
      .select("*");

    const allRegs: any[] = (registrations as any[]) || [];

    const totalRegistrations = allRegs.length;
    const paidRegistrations = allRegs.filter((r) => r.payment_status === "paid").length;
    const pendingRegistrations = allRegs.filter((r) => r.payment_status === "pending").length;
    const failedRegistrations = allRegs.filter((r) => r.payment_status === "failed").length;
    
    const totalRevenue = allRegs
      .filter((r) => r.payment_status === "paid")
      .reduce((sum, r) => sum + (r.amount || 0), 0);

    const courseStats = COURSES.map((course) => {
      const courseRegs = allRegs.filter((r) => r.course_slug === course.slug);
      const paid = courseRegs.filter((r) => r.payment_status === "paid").length;
      const pending = courseRegs.filter((r) => r.payment_status === "pending").length;
      const revenue = courseRegs
        .filter((r) => r.payment_status === "paid")
        .reduce((sum, r) => sum + (r.amount || 0), 0);

      return {
        courseSlug: course.slug,
        courseTitle: course.title,
        total: courseRegs.length,
        paid,
        pending,
        revenue,
      };
    });

    return NextResponse.json({
      stats: {
        totalRegistrations,
        paidRegistrations,
        pendingRegistrations,
        failedRegistrations,
        totalRevenue,
        courseStats,
      },
    });
  } catch (error: any) {
    console.error("Admin stats fetch error:", error);
    return NextResponse.json({ error: error.message || "Failed to load stats" }, { status: 500 });
  }
}
