"use client";

import React, { useState, useMemo } from "react";
import { RegistrationRecord } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  AlertTriangle,
  Loader2,
  X,
} from "lucide-react";

interface RegistrationsTableProps {
  initialRegistrations: RegistrationRecord[];
}

export function RegistrationsTable({ initialRegistrations }: RegistrationsTableProps) {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(initialRegistrations);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [referralFilter, setReferralFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<RegistrationRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExportCSV = () => {
    if (filteredData.length === 0) return;
    const headers = [
      "Reference ID",
      "Student Name",
      "Email",
      "Phone",
      "Course",
      "Amount",
      "Currency",
      "Referral Code",
      "Counselor",
      "Status",
      "Registered Date",
    ];

    const defang = (val: any) => {
      const str = String(val ?? "").trim();
      const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
      return `"${safe.replace(/"/g, '""')}"`;
    };

    const rows = filteredData.map((r) => [
      defang(r.registrationReference),
      defang(r.fullName),
      defang(r.email),
      defang(r.phone),
      defang(r.courseTitle),
      r.amount,
      defang(r.currency),
      defang(r.referralCode || "DIRECT"),
      defang(r.counselorName || "None"),
      defang(r.paymentStatus),
      defang(new Date(r.createdAt).toISOString()),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `jbm_registrations_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    if (!deletingRecord) return;
    setIsDeleting(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: deletingRecord.id,
          registrationReference: deletingRecord.registrationReference,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations((prev) => prev.filter((r) => r.id !== deletingRecord.id));
        if (selectedRecord?.id === deletingRecord.id) {
          setSelectedRecord(null);
        }
        setDeletingRecord(null);
      } else {
        alert(data.error || "Failed to delete registration record.");
      }
    } catch (err: any) {
      alert(err.message || "Network error deleting record.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredData = useMemo(() => {
    return registrations.filter((item) => {
      const matchesSearch =
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.referralCode && item.referralCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.registrationReference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse =
        courseFilter === "all" || item.courseSlug === courseFilter;

      const matchesStatus =
        statusFilter === "all" || item.paymentStatus === statusFilter;

      const matchesReferral =
        referralFilter === "all" ||
        (referralFilter === "direct" && !item.referralCode) ||
        item.referralCode === referralFilter;

      return matchesSearch && matchesCourse && matchesStatus && matchesReferral;
    });
  }, [registrations, searchTerm, courseFilter, statusFilter, referralFilter]);

  const renderStatusBadge = (status: RegistrationRecord["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle className="w-3 h-3" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="w-3 h-3" />
            Payment Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="danger" className="gap-1">
            <XCircle className="w-3 h-3" />
            Payment Failed
          </Badge>
        );
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, email, phone, or reference ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-maroon-800 bg-slate-50/50 text-slate-800"
          />
        </div>

        {/* Dropdown Filters & Export */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Course filter */}
          <div className="relative">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="text-xs bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-maroon-800 pr-8"
            >
              <option value="all">All Courses</option>
              <option value="artificial-intelligence">AI Foundation & Productivity</option>
              <option value="english">JBM Professional English</option>
              <option value="cyber-security">Networking in Cyber Security</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-maroon-800 pr-8"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Payment Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Referral filter */}
          <div className="relative">
            <select
              value={referralFilter}
              onChange={(e) => setReferralFilter(e.target.value)}
              className="text-xs bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-maroon-800 pr-8"
            >
              <option value="all">All Referrals</option>
              <option value="direct">Direct (No Code)</option>
              <option value="JBM10">JBM10</option>
              <option value="PROMO20">PROMO20</option>
              <option value="SPECIAL50">SPECIAL50</option>
              <option value="MENTOR100">MENTOR100</option>
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Registrations Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Referral</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    No registration records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-800">
                      {reg.registrationReference}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{reg.fullName}</div>
                      <div className="text-xs text-slate-500">{reg.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {reg.courseTitle}
                    </td>
                    <td className="px-6 py-4">
                      {reg.referralCode ? (
                        <div>
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                            {reg.referralCode}
                          </span>
                          <span className="block text-[11px] text-slate-500 font-medium mt-0.5">
                            {reg.counselorName || "Counselor"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Direct</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {formatCurrency(reg.amount, reg.currency)}
                    </td>
                    <td className="px-6 py-4">{renderStatusBadge(reg.paymentStatus)}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedRecord(reg)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-maroon-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={() => setDeletingRecord(reg)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50/60 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                          title="Delete Registration Record"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. Modal for Details View */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">
                  Registration Details
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedRecord.fullName}
                </h3>
                <span className="font-mono text-xs font-semibold text-maroon-800">
                  {selectedRecord.registrationReference}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Payment Status</span>
                  <div className="mt-1">{renderStatusBadge(selectedRecord.paymentStatus)}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Course Fee</span>
                  <span className="text-base font-bold text-slate-900">
                    {formatCurrency(selectedRecord.amount, selectedRecord.currency)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${selectedRecord.email}`} className="text-maroon-800 font-medium hover:underline">
                    {selectedRecord.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <a href={`tel:${selectedRecord.phone}`} className="hover:underline">
                    {selectedRecord.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    Registered on:{" "}
                    {new Date(selectedRecord.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-semibold text-slate-500 block">
                  Counselor / Lead Attribution:
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-900">
                    {selectedRecord.referralCode ? (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        {selectedRecord.referralCode}
                      </span>
                    ) : (
                      "Direct Admission (No Referral Code)"
                    )}
                  </span>
                  <span className="text-slate-600 font-medium">
                    {selectedRecord.counselorName ? `Assigned to: ${selectedRecord.counselorName}` : "Unassigned"}
                  </span>
                </div>
              </div>

              {selectedRecord.message && (
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">
                    Student Background / Notes:
                  </span>
                  <p className="text-xs text-slate-700 whitespace-pre-wrap">
                    {selectedRecord.message}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center gap-3">
              {selectedRecord.paymentStatus === "paid" ? (
                <a
                  href={`/api/invoice/download?ref=${selectedRecord.registrationReference}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 border border-maroon-950 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Receipt</span>
                </a>
              ) : (
                <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  <span>⏳ Official Invoice unlocks after payment is received</span>
                </div>
              )}

              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal for Delete Confirmation */}
      {deletingRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Delete Registration?</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <p><span className="text-slate-500">Student:</span> <strong className="text-slate-900">{deletingRecord.fullName}</strong></p>
              <p><span className="text-slate-500">Reference ID:</span> <strong className="font-mono text-maroon-800">{deletingRecord.registrationReference}</strong></p>
              <p><span className="text-slate-500">Course:</span> <strong className="text-slate-900">{deletingRecord.courseTitle}</strong></p>
              <p><span className="text-slate-500">Status:</span> <strong className="text-slate-900">{deletingRecord.paymentStatus.toUpperCase()}</strong></p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently remove this registration and its payment history from the database?
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingRecord(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
