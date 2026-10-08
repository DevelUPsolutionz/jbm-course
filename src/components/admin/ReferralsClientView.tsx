"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  CheckCircle,
  IndianRupee,
  Copy,
  Check,
  Eye,
  Search,
  Award,
  TrendingUp,
  Mail,
  Phone,
  BookOpen,
} from "lucide-react";

interface ReferralItem {
  code: string;
  staffName: string;
  staffRole: string;
  description: string;
  totalEnrolled: number;
  paidStudents: number;
  revenue: number;
  conversionRate: number;
  students: Array<{
    id: string;
    registrationReference: string;
    fullName: string;
    email: string;
    phone: string;
    courseTitle: string;
    amount: number;
    currency: string;
    paymentStatus: string;
    createdAt: string;
  }>;
}

interface ReferralsClientViewProps {
  referralList: ReferralItem[];
  summary: {
    totalReferredStudents: number;
    directStudents: number;
    referredPaidCount: number;
    totalReferredRevenue: number;
  };
}

export function ReferralsClientView({
  referralList,
  summary,
}: ReferralsClientViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedReferral, setSelectedReferral] = useState<ReferralItem | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredReferrals = referralList.filter((ref) => {
    return (
      ref.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.staffRole.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Referred Leads
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">
              {summary.totalReferredStudents}
            </span>
            <span className="text-xs text-slate-400 block">via Counselor Codes</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Direct Admissions
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">
              {summary.directStudents}
            </span>
            <span className="text-xs text-slate-400 block">No code used</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Referred Paid Seats
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">
              {summary.referredPaidCount}
            </span>
            <span className="text-xs text-slate-400 block">Verified enrollments</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Referred Revenue
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">
              {formatCurrency(summary.totalReferredRevenue)}
            </span>
            <span className="text-xs text-slate-400 block">Counselor contribution</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Referral Codes Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 tracking-tight">
              10 Official Referral Codes Directory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Unique 8-character codes assigned to each admissions counselor and mentor.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search code or counselor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Referral Code</th>
                <th className="px-6 py-4">Assigned Counselor</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Total Leads</th>
                <th className="px-6 py-4 text-center">Paid Seats</th>
                <th className="px-6 py-4">Revenue (₹)</th>
                <th className="px-6 py-4 text-center">Conversion</th>
                <th className="px-6 py-4 text-right">Students</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReferrals.map((ref) => (
                <tr key={ref.code} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 shadow-xs">
                        {ref.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(ref.code)}
                        title="Copy Code"
                        className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {copiedCode === ref.code ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {ref.staffName}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {ref.staffRole}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-800">
                    {ref.totalEnrolled}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-emerald-600">
                    {ref.paidStudents}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {formatCurrency(ref.revenue)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {ref.conversionRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedReferral(ref)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{ref.totalEnrolled} View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: View Referred Students */}
      {selectedReferral && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">
                  Counselor Referral Details
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedReferral.staffName} ({selectedReferral.code})
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedReferral.staffRole} • {selectedReferral.totalEnrolled} Total Leads • {selectedReferral.paidStudents} Paid Enrollments
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReferral(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-4 flex-1 overflow-y-auto space-y-3">
              {selectedReferral.students.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No student enrollments recorded yet under this referral code.
                </div>
              ) : (
                selectedReferral.students.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {student.registrationReference}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {student.fullName}
                        </h4>
                      </div>
                      <Badge
                        variant={student.paymentStatus === "paid" ? "success" : "warning"}
                      >
                        {student.paymentStatus === "paid" ? "Confirmed Paid" : "Pending Payment"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-800">
                          {student.courseTitle} — {formatCurrency(student.amount, student.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReferral(null)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
