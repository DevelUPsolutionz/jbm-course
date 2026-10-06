import { NextResponse } from "next/server";
import { getDynamicCourses } from "@/lib/course-pricing";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const courses = await getDynamicCourses();
    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
