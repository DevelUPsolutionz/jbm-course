import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref");

  if (!ref) {
    return NextResponse.json({ error: "Missing registration reference" }, { status: 400 });
  }

  const supabase = getAdminClient();

  try {
    // 1. Get registration record
    const { data: reg, error: regError } = await supabase
      .from("registrations")
      .select("receipt_url")
      .eq("registration_reference", ref)
      .single();

    if (regError || !reg) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    if (!reg.receipt_url) {
      return NextResponse.json({ error: "Invoice not generated yet. Please try again later." }, { status: 404 });
    }

    // 2. Generate signed URL for the PDF
    const { data: signedData, error: signedError } = await supabase.storage
      .from("invoices")
      .createSignedUrl(reg.receipt_url, 60 * 60); // 1 hour validity

    if (signedError || !signedData?.signedUrl) {
      return NextResponse.json({ error: "Failed to access invoice file" }, { status: 500 });
    }

    // 3. Redirect user to the signed URL to view/download
    return NextResponse.redirect(signedData.signedUrl);
  } catch (error) {
    console.error("Invoice download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
