import React from "react";
import type { Metadata } from "next";
import { getAdminClient } from "@/lib/supabase/admin";
import { RegistrationsTable } from "@/components/admin/RegistrationsTable";
import { RegistrationRecord } from "@/types";
import { validateReferralCode } from "@/config/coupons";

export const metadata: Metadata = {
  title: "Registrations Management | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const supabase = getAdminClient();
  let records: RegistrationRecord[] = [];

  try {
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      records = data.map((r: any) => {
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
    }
  } catch (err) {
    console.warn("Registrations fetch error in admin table:", err);
  }

  return (
    <div className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Student Registrations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Search, filter, and inspect student applications and payment statuses.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          Total: {records.length} Records
        </div>
      </div>

      <RegistrationsTable initialRegistrations={records} />
    </div>
  );
}
