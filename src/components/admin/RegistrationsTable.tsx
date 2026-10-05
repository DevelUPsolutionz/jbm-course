"use client";

import React, { useState, useMemo } from "react";
import { RegistrationRecord } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Search, Filter, Eye, Phone, Mail, Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

interface RegistrationsTableProps {
  initialRegistrations: RegistrationRecord[];
}

export function RegistrationsTable({ initialRegistrations }: RegistrationsTableProps) {
  const [registrations] = useState<RegistrationRecord[]>(initialRegistrations);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);

  const filteredData = useMemo(() => {
    return registrations.filter((item) => {
      const matchesSearch =
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.registrationReference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse =
        courseFilter === "all" || item.courseSlug === courseFilter;

      const matchesStatus =
        statusFilter === "all" || item.paymentStatus === statusFilter;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [registrations, searchTerm, courseFilter, statusFilter]);

  const renderStatusBadge = (status: RegistrationRecord["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle className="w-3 h-3" />
            Confirmed Paid
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
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, email, phone, or reference ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filter by Course */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="text-xs sm:text-sm border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="all">All Courses</option>
            <option value="cyber-security">Cyber Security</option>
            <option value="english">English Communication</option>
            <option value="artificial-intelligence">Artificial Intelligence</option>
          </select>

          {/* Filter by Payment Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs sm:text-sm border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Confirmed Paid</option>
            <option value="pending">Pending Payment</option>
            <option value="failed">Failed</option>
          </select>
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
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
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
                      <button
                        onClick={() => setSelectedRecord(reg)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Details View */}
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
                <span className="font-mono text-xs font-semibold text-brand-600">
                  {selectedRecord.registrationReference}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
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
                  <a href={`mailto:${selectedRecord.email}`} className="text-brand-600 hover:underline">
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

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
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
    </div>
  );
}
