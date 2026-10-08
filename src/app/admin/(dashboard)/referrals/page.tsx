import React from "react";
import type { Metadata } from "next";
import { getAdminClient } from "@/lib/supabase/admin";
import { JBM_REFERRAL_CODES, validateReferralCode } from "@/config/coupons";
import { formatCurrency } from "@/lib/utils";
import { ReferralsClientView } from "@/components/admin/ReferralsClientView";

export const metadata: Metadata = {
  title: "Staff Referral Tracking | Admin",
};

export const revalidate = 10; // Fast ISR cache revalidation for instant tab switching

export default async function AdminReferralsPage() {
  const supabase = getAdminClient();
  let registrations: any[] = [];

  try {
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    registrations = data || [];
  } catch (err) {
    console.warn("Registrations fetch in referrals page:", err);
  }

  // Parse records to determine referral attribution
  const studentRecords = registrations.map((r) => {
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
      courseTitle: r.course_title,
      amount: r.amount,
      currency: r.currency,
      referralCode: refCode,
      counselorName: refInfo?.staffName || null,
      paymentStatus: r.payment_status,
      createdAt: r.created_at,
    };
  });

  // Calculate statistics per referral code
  const referralList = Object.values(JBM_REFERRAL_CODES).map((ref) => {
    const matchingStudents = studentRecords.filter((s) => s.referralCode === ref.code);
    const totalEnrolled = matchingStudents.length;
    const paidStudents = matchingStudents.filter((s) => s.paymentStatus === "paid").length;
    const revenue = matchingStudents
      .filter((s) => s.paymentStatus === "paid")
      .reduce((sum, s) => sum + (s.amount || 0), 0);
    const conversionRate = totalEnrolled > 0 ? Math.round((paidStudents / totalEnrolled) * 100) : 0;

    return {
      code: ref.code,
      staffName: ref.staffName,
      staffRole: ref.staffRole,
      description: ref.description,
      totalEnrolled,
      paidStudents,
      revenue,
      conversionRate,
      students: matchingStudents,
    };
  });

  // Summary Metrics
  const totalReferredStudents = studentRecords.filter((s) => s.referralCode).length;
  const directStudents = studentRecords.filter((s) => !s.referralCode).length;
  const referredPaidCount = studentRecords.filter((s) => s.referralCode && s.paymentStatus === "paid").length;
  const totalReferredRevenue = studentRecords
    .filter((s) => s.referralCode && s.paymentStatus === "paid")
    .reduce((sum, s) => sum + (s.amount || 0), 0);

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Staff Referral & Counselor Attribution
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor performance, student conversions, and fee collections across all 10 counselor referral codes.
        </p>
      </div>

      {/* Client View with Filter, Cards & Student Modal */}
      <ReferralsClientView
        referralList={referralList}
        summary={{
          totalReferredStudents,
          directStudents,
          referredPaidCount,
          totalReferredRevenue,
        }}
      />
    </div>
  );
}
