import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  try {
    const supabase = getAdminClient();
    const { data: registrations, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Fallback empty array if table not yet migrated
      return NextResponse.json({ registrations: [] });
    }

    const formatted = ((registrations as any[]) || []).map((r: any) => ({
      id: r.id,
      registrationReference: r.registration_reference,
      fullName: r.full_name,
      email: r.email,
      phone: r.phone,
      courseId: r.course_id,
      courseSlug: r.course_slug,
      courseTitle: r.course_title,
      amount: r.amount,
      currency: r.currency,
      message: r.message,
      paymentStatus: r.payment_status,
      termsAccepted: r.terms_accepted,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));

    return NextResponse.json({ registrations: formatted });
  } catch (error: any) {
    console.error("Admin registrations fetch error:", error);
    return NextResponse.json({ error: error.message || "Failed to load registrations" }, { status: 500 });
  }
}
