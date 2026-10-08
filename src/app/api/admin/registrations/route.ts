import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { validateReferralCode } from "@/config/coupons";
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
    let registrations: any[] = [];

    try {
      const dbPromise = supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Supabase Timeout")), 2000)
      );

      const result: any = await Promise.race([dbPromise, timeoutPromise]);
      if (result && !result.error && Array.isArray(result.data)) {
        registrations = result.data;
      }
    } catch (err: any) {
      console.warn("Admin registrations fetch notice (using empty fallback):", err.message || err);
    }

    const formatted = ((registrations as any[]) || []).map((r: any) => {
      let refCode: string | null = null;
      if (r.message) {
        const match = r.message.match(/\[(?:Referral|Coupon):\s*([A-Za-z0-9]+)\]/i);
        if (match && match[1] && match[1].toUpperCase() !== "NONE") {
          refCode = match[1].toUpperCase();
        }
      }
      const refInfo = refCode ? validateReferralCode(refCode) : null;

      return {
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
        referralCode: refCode,
        counselorName: refInfo?.staffName || null,
        message: r.message,
        paymentStatus: r.payment_status,
        termsAccepted: r.terms_accepted,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      };
    });

    return NextResponse.json({ registrations: formatted });
  } catch (error: any) {
    console.error("Admin registrations fetch error:", error);
    return NextResponse.json({ error: error.message || "Failed to load registrations" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSessionToken(sessionToken);
    const sbToken = req.cookies.get("sb-access-token")?.value;
    const authCookie = req.cookies.get("jbm_admin_auth")?.value || req.cookies.get("admin_auth")?.value;

    if (!session && !sbToken && !authCookie) {
      return NextResponse.json({ error: "Unauthorized: Admin session required" }, { status: 401 });
    }

    const { id, registrationReference } = await req.json();

    if (!id && !registrationReference) {
      return NextResponse.json({ error: "Missing registration ID or Reference for deletion" }, { status: 400 });
    }

    const supabase = getAdminClient();

    // 1. Delete associated payments if any
    if (id) {
      await supabase.from("payments").delete().eq("registration_id", id);
    }

    // 2. Delete registration record
    let query = supabase.from("registrations").delete();
    if (id) {
      query = query.eq("id", id);
    } else if (registrationReference) {
      query = query.eq("registration_reference", registrationReference);
    }

    const { error: delError } = await query;
    if (delError) {
      console.error("Database deletion error:", delError);
      return NextResponse.json({ error: delError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Registration record deleted successfully" });
  } catch (error: any) {
    console.error("Admin registration delete error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete record" }, { status: 500 });
  }
}
