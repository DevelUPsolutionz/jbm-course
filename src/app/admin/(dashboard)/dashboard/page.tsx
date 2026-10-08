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
export const revalidate = 0;

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
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Admissions Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time enrollment metrics, revenue tracking, and cohort performance.
        </p>
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
            <h2 className="text-lg font-display font-extrabold text-slate-900 tracking-tight">Course Breakdown</h2>
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
    </div>
  );
}
