"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  CreditCard,
  User,
  Phone,
  BookOpen,
  Calendar,
  Hash,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { COURSES } from "@/config/courses";
import { formatCurrency } from "@/lib/utils";

interface GeneratedInvoiceRecord {
  invoiceNo: string;
  studentName: string;
  email: string;
  courseName: string;
  amountPaid: number;
  paymentMode: string;
  transactionId: string;
  date: string;
  fileName: string;
  pdfBase64?: string;
  emailSent?: boolean;
}

export function ManualInvoiceClientView() {
  // Course selection & presets
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("artificial-intelligence");
  const [studentName, setStudentName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [totalCourseFee, setTotalCourseFee] = useState<number>(23000);
  const [amountPaid, setAmountPaid] = useState<number>(11500);
  const [paymentMode, setPaymentMode] = useState<string>("UPI / Google Pay");
  const [transactionId, setTransactionId] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("DIRECT_UPI");

  // Options
  const [sendEmail, setSendEmail] = useState<boolean>(true);
  const [recordInDb, setRecordInDb] = useState<boolean>(true);

  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recentInvoices, setRecentInvoices] = useState<GeneratedInvoiceRecord[]>([]);

  // Generate initial random invoice number
  useEffect(() => {
    generateNewInvoiceNumber();
    // Load local history if available
    try {
      const stored = localStorage.getItem("jbm_manual_invoices_history");
      if (stored) {
        setRecentInvoices(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const generateNewInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    setInvoiceNo(`JBM-${year}-OFF${randomHex}`);
  };

  // When course changes, prefill fee defaults
  const handleCourseChange = (slug: string) => {
    setSelectedCourseSlug(slug);
    const course = COURSES.find((c) => c.slug === slug);
    if (course) {
      setTotalCourseFee(course.actualFee || 20000);
      setAmountPaid(course.fee || 10000);
    }
  };

  // Helper to trigger browser file download from Base64
  const downloadBase64PDF = (base64Data: string, filename: string) => {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64Data}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit Handler
  const handleGenerateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!studentName.trim() || !email.trim() || !phone.trim() || !amountPaid) {
      setErrorMessage("Please fill in Student Name, Email, Phone, and Amount Paid.");
      setLoading(false);
      return;
    }

    const selectedCourse = COURSES.find((c) => c.slug === selectedCourseSlug);
    const courseName = selectedCourse ? selectedCourse.title : "Professional Tech Course";

    try {
      const response = await fetch("/api/admin/invoices/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: studentName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          courseSlug: selectedCourseSlug,
          courseName,
          totalCourseFee: Number(totalCourseFee),
          amountPaid: Number(amountPaid),
          paymentMode,
          transactionId: transactionId.trim() || `UPI-${Date.now().toString().slice(-8)}`,
          paymentDate: invoiceDate,
          invoiceNo: invoiceNo.trim(),
          couponCode: couponCode.trim(),
          sendEmail,
          recordInDb,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate invoice");
      }

      // Auto-trigger browser download
      if (data.pdfBase64) {
        downloadBase64PDF(data.pdfBase64, data.fileName || `Invoice_${invoiceNo}.pdf`);
      }

      let msg = `Invoice ${data.invoiceNo} generated & downloaded successfully!`;
      if (data.dbRecorded) {
        msg += " Recorded in registrations & analytics.";
      } else if (data.dbError) {
        msg += ` (DB Notice: ${data.dbError})`;
      }
      if (data.emailSent) {
        msg += " Email with PDF attached sent to student.";
      } else if (sendEmail && data.emailError) {
        msg += ` (Email Notice: ${data.emailError})`;
      }
      setSuccessMessage(msg);

      // Save to recent history
      const newRecord: GeneratedInvoiceRecord = {
        invoiceNo: data.invoiceNo,
        studentName: studentName.trim(),
        email: email.trim(),
        courseName,
        amountPaid: Number(amountPaid),
        paymentMode,
        transactionId: transactionId.trim() || `UPI-${Date.now().toString().slice(-8)}`,
        date: invoiceDate,
        fileName: data.fileName,
        pdfBase64: data.pdfBase64,
        emailSent: data.emailSent,
      };

      const updatedHistory = [newRecord, ...recentInvoices.slice(0, 9)];
      setRecentInvoices(updatedHistory);
      try {
        localStorage.setItem("jbm_manual_invoices_history", JSON.stringify(updatedHistory));
      } catch {
        // ignore
      }

      // Reset invoice number for next creation
      generateNewInvoiceNumber();
    } catch (err: any) {
      console.error("Invoice generation error:", err);
      setErrorMessage(err.message || "An unexpected error occurred while generating the invoice.");
    } finally {
      setLoading(false);
    }
  };

  const discountAmount = Math.max(0, Number(totalCourseFee) - Number(amountPaid));
  const discountPercent =
    Number(totalCourseFee) > 0 ? Math.round((discountAmount / Number(totalCourseFee)) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-50 border border-maroon-200 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Tools</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manual Invoice Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Generate and dispatch official branded PDF receipts for students who paid via direct UPI, Google Pay, or offline bank transfer.
          </p>
        </div>

        <button
          type="button"
          onClick={generateNewInvoiceNumber}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>New Invoice Number</span>
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3 shadow-sm animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Success!</p>
            <p className="text-xs text-emerald-800 mt-0.5">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-start gap-3 shadow-sm animate-in fade-in duration-300">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Error</p>
            <p className="text-xs text-rose-800 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Grid: Form + Live Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (8 Columns) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
          <form onSubmit={handleGenerateInvoice} className="space-y-6">
            {/* Section 1: Student Information */}
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <User className="w-4 h-4 text-maroon-800" />
                <span>1. Student Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anandha Kumar"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Course & Pricing Details */}
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-maroon-800" />
                <span>2. Course & Enrollment Fee</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Enrolled Course *
                  </label>
                  <select
                    value={selectedCourseSlug}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all font-medium"
                  >
                    {COURSES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title} — {formatCurrency(c.fee, c.currency)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Total Regular Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={totalCourseFee}
                    onChange={(e) => setTotalCourseFee(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all font-semibold"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Full course brochure fee</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Actual Amount Paid (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-emerald-50/40 focus:bg-white text-emerald-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold"
                  />
                  <span className="text-[11px] text-emerald-600 mt-1 block font-medium">
                    {discountPercent > 0 ? `${discountPercent}% Discount applied (${formatCurrency(discountAmount)})` : "Full payment"}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Payment Verification & Transaction ID */}
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <CreditCard className="w-4 h-4 text-maroon-800" />
                <span>3. Offline Payment Verification</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Payment Mode
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all"
                  >
                    <option value="UPI / Google Pay">UPI / Google Pay</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Paytm UPI">Paytm UPI</option>
                    <option value="Direct Bank Transfer (NEFT/IMPS)">Direct Bank Transfer (NEFT/IMPS)</option>
                    <option value="Cash Payment">Cash Payment</option>
                    <option value="Other Offline Transfer">Other Offline Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Transaction ID / UPI Reference No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 429184918291 or GPay-Ref"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">UPI Reference or Bank UTR</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Payment & Invoice Date
                  </label>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Official Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800 transition-all font-mono font-bold text-maroon-900"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Options Checkboxes */}
            <div className="pt-2 space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="w-4 h-4 rounded text-maroon-800 focus:ring-maroon-800 border-slate-300"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Send official invoice PDF to student's email
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Dispatches official admission confirmation via Resend with PDF attached
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={recordInDb}
                  onChange={(e) => setRecordInDb(e.target.checked)}
                  className="w-4 h-4 rounded text-maroon-800 focus:ring-maroon-800 border-slate-300"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Record in Database Registrations & Revenue Analytics
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Adds student to registrations table and counts payment in dashboard stats
                  </span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-900 hover:to-maroon-950 text-white font-bold text-sm shadow-xl shadow-maroon-900/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Generating Invoice...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Generate & Download Official Invoice PDF</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Summary Preview Card (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card Preview */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-maroon-600/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                  Form Summary Check
                </span>
                <span className="text-[10px] text-slate-400">
                  Screen preview only
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                Official Receipt
              </span>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Invoice No:</span>
                <span className="font-mono text-white font-bold">{invoiceNo || "JBM-2026-XXXX"}</span>
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span>Date:</span>
                <span className="text-white">{invoiceDate}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Billed To:</span>
                <p className="font-bold text-sm text-white">{studentName || "Student Full Name"}</p>
                <p className="text-slate-400 text-[11px] truncate">{email || "student@email.com"}</p>
                <p className="text-slate-400 text-[11px]">{phone || "+91 XXXXX XXXXX"}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Course:</span>
                <p className="font-semibold text-white leading-tight">
                  {COURSES.find((c) => c.slug === selectedCourseSlug)?.title || "Selected Course"}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Regular Fee:</span>
                  <span>{formatCurrency(totalCourseFee)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Scholarship Grant:</span>
                    <span>- {formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-white pt-1 border-t border-slate-800">
                  <span>Total Paid:</span>
                  <span className="text-amber-300">{formatCurrency(amountPaid)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Mode: {paymentMode}</span>
                <span className="font-mono text-[10px] text-slate-300">
                  {transactionId ? `Ref: ${transactionId.slice(-8)}` : "Direct Offline"}
                </span>
              </div>

            </div>
          </div>

          {/* Recently Generated Invoices List */}
          {recentInvoices.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Recently Generated</span>
                <span className="text-[11px] font-normal text-slate-400">
                  {recentInvoices.length} Invoices
                </span>
              </h3>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {recentInvoices.map((inv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{inv.studentName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{inv.invoiceNo}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">
                        {formatCurrency(inv.amountPaid)} • {inv.paymentMode}
                      </p>
                    </div>

                    {inv.pdfBase64 && (
                      <button
                        type="button"
                        onClick={() => downloadBase64PDF(inv.pdfBase64!, inv.fileName)}
                        title="Re-download PDF"
                        className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-maroon-800 hover:text-maroon-900 shadow-xs transition-all hover:scale-105 active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
