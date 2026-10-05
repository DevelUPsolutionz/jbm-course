import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { StatsCard } from "@/components/admin/StatsCard";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { COURSES } from "@/config/courses";
import { getAdminClient } from "@/lib/supabase/admin";
import {
  Users,
  CheckCircle,
  Clock,
  IndianRupee,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = getAdminClient();
  let registrations: any[] = [];

  try {
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    registrations = data || [];
  } catch (err) {
    console.warn("Registrations fetch in dashboard:", err);
  }

  const totalRegs = registrations.length;
  const paidRegs = registrations.filter((r) => r.payment_status === "paid").length;
  const pendingRegs = registrations.filter((r) => r.payment_status === "pending").length;
  const totalRevenue = registrations
    .filter((r) => r.payment_status === "paid")
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  const courseStats = COURSES.map((c) => {
    const matched = registrations.filter((r) => r.course_slug === c.slug);
    const paid = matched.filter((r) => r.payment_status === "paid").length;
    const revenue = matched
      .filter((r) => r.payment_status === "paid")
      .reduce((sum, r) => sum + (r.amount || 0), 0);

    return {
      title: c.title,
      slug: c.slug,
      fee: c.fee,
      total: matched.length,
      paid,
      revenue,
    };
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Admissions Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time enrollment metrics, revenue tracking, and cohort performance.
          </p>
        </div>

        <Link
          href="/admin/registrations"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
        >
          <span>View All Registrations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Registrations"
          value={totalRegs}
          subtitle="All recorded applications"
          icon={Users}
          color="brand"
        />
        <StatsCard
          title="Confirmed Paid"
          value={paidRegs}
          subtitle="Verified active enrollments"
          icon={CheckCircle}
          color="emerald"
        />
        <StatsCard
          title="Pending Payments"
          value={pendingRegs}
          subtitle="Awaiting checkout completion"
          icon={Clock}
          color="amber"
        />
        <StatsCard
          title="Gross Revenue"
          value={formatCurrency(totalRevenue)}
          subtitle="Collected via Razorpay"
          icon={IndianRupee}
          color="indigo"
        />
      </div>

      {/* Course-wise Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900">Course Breakdown</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">3 Active Courses</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {courseStats.map((item) => (
            <div
              key={item.slug}
              className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
            >
              <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Registrations:</span>
                  <span className="font-bold text-slate-800 text-base">{item.total}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Paid Seats:</span>
                  <span className="font-bold text-emerald-600 text-base">{item.paid}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center text-xs">
                <span className="text-slate-500">Collected:</span>
                <span className="font-bold text-slate-900">{formatCurrency(item.revenue)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Registrations Table Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Registrations</h2>
          <Link
            href="/admin/registrations"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            View Full Table →
          </Link>
        </div>

        {registrations.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            No student registrations recorded yet. New registrations will appear here in real-time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3">Ref ID</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.slice(0, 5).map((r: any) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-800">
                      {r.registration_reference}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{r.full_name}</td>
                    <td className="px-4 py-3">{r.course_title}</td>
                    <td className="px-4 py-3 font-medium">
                      {formatCurrency(r.amount, r.currency)}
                    </td>
                    <td className="px-4 py-3">
                      {r.payment_status === "paid" ? (
                        <Badge variant="success">Paid</Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {new Date(r.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
