import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { generateReceiptPDF } from "@/lib/pdf/generateReceipt";
import { getDynamicCourseBySlug } from "@/lib/course-pricing";
import { getCourseBySlug } from "@/config/courses";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref");

  if (!ref) {
    return NextResponse.json({ error: "Missing registration reference" }, { status: 400 });
  }

  const cleanRef = ref.trim();
  const supabase = getAdminClient();

  try {
    // 1. Get registration record with payment details
    const { data: reg, error: regError } = await supabase
      .from("registrations")
      .select("*, payments(*)")
      .eq("registration_reference", cleanRef)
      .single();

    if (regError || !reg) {
      return NextResponse.json({ error: "Registration record not found" }, { status: 404 });
    }

    const fileName = reg.receipt_url || `JBM_Invoice_${cleanRef}.pdf`;

    // Always generate dynamically with the latest official Excel template
    // using the student's existing registration and payment records
    const capturedPayment = Array.isArray(reg.payments)
      ? reg.payments.find((p: any) => p.status === "captured") || reg.payments[0]
      : null;

    const paidAmount = capturedPayment?.amount !== undefined ? capturedPayment.amount : (reg.amount || 0);

    const isOffline = reg.message && reg.message.includes("[Offline");
    const paymentMode = isOffline
      ? (reg.message.match(/\[Offline\s+([^|\]]+)/)?.[1]?.trim() || "Direct UPI / Offline")
      : "Razorpay Secure Gateway";

    const offlineTxn = reg.message && reg.message.includes("Ref:")
      ? reg.message.match(/Ref:\s*([^\]]+)/)?.[1]?.trim()
      : null;
    const transactionId = offlineTxn || capturedPayment?.provider_payment_id || "TXN_ONLINE_SECURE";

    const dynamicCourse = await getDynamicCourseBySlug(reg.course_slug);
    const staticCourse = getCourseBySlug(reg.course_slug);
    const course = dynamicCourse || staticCourse;

    const totalCourseFee = course?.actualFee || (paidAmount > 0 ? paidAmount * 2 : 20000);
    const discountApplied = Math.max(0, totalCourseFee - paidAmount);
    const discountPercent = totalCourseFee > 0 ? Math.round((discountApplied / totalCourseFee) * 100) : 0;

    let couponCode = "";
    if (reg.message && reg.message.includes("[Referral:")) {
      const match = reg.message.match(/\[Referral:\s*([^\]]+)\]/);
      if (match) couponCode = match[1];
    } else if (reg.message && reg.message.includes("[Coupon:")) {
      const match = reg.message.match(/\[Coupon:\s*([^\]]+)\]/);
      if (match) couponCode = match[1];
    }

    const paymentDate = new Date(
      capturedPayment?.created_at || reg.updated_at || Date.now()
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });

    const currentYear = new Date().getFullYear();
    const invoiceNo = `JBM-${currentYear}-${cleanRef.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase()}`;

    const pdfBuffer = await generateReceiptPDF({
      invoiceNo,
      date: paymentDate,
      studentName: reg.full_name,
      phone: reg.phone,
      email: reg.email,
      courseName: reg.course_title,
      totalCourseFee,
      couponCode: couponCode || "N/A",
      scholarshipDiscount: discountPercent > 0 ? `${discountPercent}% Scholarship` : "Standard Enrollment",
      discountApplied,
      finalAmount: paidAmount,
      amountPaid: paidAmount,
      paymentMode,
      transactionId,
      paymentDate,
    });

    // Save/update Supabase Storage & update DB so storage cache always holds new template
    try {
      await supabase.storage.from("invoices").upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });
      await supabase
        .from("registrations")
        .update({ receipt_url: fileName })
        .eq("id", reg.id);
    } catch (uploadErr) {
      console.warn("Storage upload caching notice:", uploadErr);
    }

    // 4. Return PDF directly with inline view / download headers
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="JBM_Invoice_${cleanRef}.pdf"`,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error: any) {
    console.error("Invoice download/generation route error:", error);
    return NextResponse.json(
      { error: "Failed to generate receipt: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
