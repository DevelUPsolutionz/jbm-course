import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { getLocalContactMessages } from "@/lib/contact-store";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth/admin-session";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSessionToken(sessionToken);
    const sbToken = req.cookies.get("sb-access-token")?.value;
    const authHeader = req.headers.get("authorization");

    if (!session && !sbToken && !authHeader) {
      // Return 401 if unauthorized
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const localMsgs = getLocalContactMessages();
    let messages: any[] = [...localMsgs];

    try {
      const supabase = getAdminClient();
      const dbPromise = supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Supabase Timeout")), 2000)
      );

      const result: any = await Promise.race([dbPromise, timeoutPromise]);

      if (result && !result.error && Array.isArray(result.data)) {
        const dbMsgs = result.data;
        const existingIds = new Set(localMsgs.map((m) => m.id));
        dbMsgs.forEach((dbM: any) => {
          if (!existingIds.has(dbM.id)) {
            messages.push(dbM);
          }
        });
        messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    } catch (dbErr: any) {
      console.warn("Supabase messages query notice (serving local store):", dbErr.message || dbErr);
    }

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error: any) {
    console.error("Admin messages API GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
