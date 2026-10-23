import { NextResponse } from "next/server";
import { getDynamicCourses } from "@/lib/course-pricing";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const courses = await getDynamicCourses();
    return NextResponse.json(
      {
        success: true,
        courses,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
