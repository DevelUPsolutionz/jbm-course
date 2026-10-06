import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getAdminClient } from "@/lib/supabase/admin";
import { getCourseBySlug } from "@/config/courses";
import { getDynamicCourseBySlug } from "@/lib/course-pricing";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, ShieldCheck, Download } from "lucide-react";
import { InvoicePrintButton } from "@/components/invoice/InvoicePrintButton";

interface InvoicePageProps {
  params: Promise<{
    ref: string;
  }>;
  searchParams: Promise<{
    pay?: string;
    payment_id?: string;
  }>;
}

export const dynamic = "force-dynamic";

function numberToWordsINR(amount: number): string {
  const num = Math.round(amount);
  if (num === 0) return "Zero Rupees Only";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function inWords(n: number): string {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
  }

  return inWords(num).trim() + " Rupees Only";
}

export default async function InvoiceReceiptPage({ params, searchParams }: InvoicePageProps) {
  const { ref } = await params;
  const { pay, payment_id } = await searchParams;

  const cleanRef = ref.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  const supabase = getAdminClient();

  let registrationData: any = null;
  try {
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .eq("registration_reference", cleanRef)
      .single();
    registrationData = data;
  } catch (err) {
    console.warn("Invoice fetch registration fallback:", err);
  }

  // Derive course info
  const courseSlug = registrationData?.course_slug || (cleanRef.includes("AI") ? "artificial-intelligence" : cleanRef.includes("ENG") ? "english" : "cyber-security");
  const dynamicCourse = await getDynamicCourseBySlug(courseSlug);
  const fallbackCourse = dynamicCourse || getCourseBySlug(courseSlug);

  const studentName = registrationData?.full_name || "Learner (Admissions)";
  const studentEmail = registrationData?.email || "student@johannabrightmentors.com";
  const studentPhone = registrationData?.phone || siteConfig.contact.phone;
  const courseTitle = registrationData?.course_title || fallbackCourse?.title || "Professional Career Certification";
  const courseFee = registrationData?.amount || fallbackCourse?.fee || 4999;
  const actualFee = fallbackCourse?.actualFee || (courseFee * 2);
  const discountAmount = actualFee > courseFee ? actualFee - courseFee : 0;
  const isPaid = registrationData?.payment_status === "paid" || pay === "confirmed";
  const paymentId = payment_id || registrationData?.payment_id || (isPaid ? "ONLINE_VERIFIED" : "PENDING");
  const invoiceDate = new Date(registrationData?.created_at || Date.now()).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const invoiceNumber = `INV-${cleanRef.replace(/[^A-Za-z0-9]/g, "")}`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 py-6 sm:py-10 print:py-0 print:bg-white">
      {/* Top Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex items-center justify-between print:hidden">
        <Link
          href={`/register/success?ref=${cleanRef}&pay=${isPaid ? "confirmed" : "pending"}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admission Status</span>
        </Link>

        <div className="flex items-center gap-3">
          <InvoicePrintButton />
        </div>
      </div>

      {/* Main Single-Page A4 Invoice Sheet */}
      <main className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden print:border-0 print:shadow-none print:rounded-none print:max-w-none print:w-full">
        <div className="p-8 sm:p-12 print:p-6 space-y-8">
          
          {/* 1. INVOICE TOP HEADER: Brand Logo & Institution Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-slate-900 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Image
                  src="/images/jbm-logo.png"
                  alt={siteConfig.name}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  {siteConfig.name}
                </h1>
                <p className="text-[11px] font-bold text-maroon-800 tracking-wider uppercase mt-0.5">
                  ✨ {siteConfig.slogan} • {siteConfig.tagline}
                </p>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Pudukkottai / Coimbatore, Tamil Nadu, India<br />
                  Phone: {siteConfig.contact.formattedPhone} • Email: {siteConfig.contact.email}<br />
                  Web: {siteConfig.contact.website}
                </p>
              </div>
            </div>

            {/* Right: Invoice Meta Box */}
            <div className="text-left sm:text-right flex flex-col justify-between sm:items-end">
              <span className="inline-block bg-maroon-800 text-white font-extrabold text-xs px-3.5 py-1 rounded tracking-wider uppercase mb-2">
                OFFICIAL TAX INVOICE
              </span>
              <div className="text-xs space-y-1 text-slate-700">
                <p><span className="font-semibold text-slate-500">Invoice No:</span> <strong className="font-mono text-slate-900">{invoiceNumber}</strong></p>
                <p><span className="font-semibold text-slate-500">Date:</span> <strong>{invoiceDate}</strong></p>
                <p><span className="font-semibold text-slate-500">Ref ID:</span> <strong className="font-mono text-maroon-800">{cleanRef}</strong></p>
                <p><span className="font-semibold text-slate-500">Place of Supply:</span> <strong>Tamil Nadu (33)</strong></p>
              </div>
            </div>
          </div>

          {/* 2. BILLED TO & PROGRAM DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/80 p-5 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Billed To (Student / Learner):
              </span>
              <h2 className="text-base font-extrabold text-slate-900">{studentName}</h2>
              <p className="text-xs text-slate-600 mt-0.5">Email: {studentEmail}</p>
              <p className="text-xs text-slate-600">Phone: {studentPhone}</p>
              <p className="text-xs text-slate-600">Student Ref: <span className="font-mono font-bold text-slate-800">{cleanRef}</span></p>
            </div>

            <div className="sm:text-right flex flex-col sm:items-end justify-center">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Payment Status:
              </span>
              <div className="inline-flex items-center gap-1.5">
                {isPaid ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PAID & VERIFIED</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                    <span>PAYMENT PENDING</span>
                  </span>
                )}
              </div>
              {paymentId && (
                <p className="text-[11px] text-slate-500 mt-1 font-mono">
                  Gateway Txn ID: <strong>{paymentId}</strong>
                </p>
              )}
            </div>
          </div>

          {/* 3. ITEMIZED CHARGES TABLE */}
          <div>
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold w-12 text-center">#</th>
                  <th className="py-3 px-4 font-bold">Course / Service Description</th>
                  <th className="py-3 px-4 font-bold text-center">SAC Code</th>
                  <th className="py-3 px-4 font-bold text-right">Standard Fee</th>
                  <th className="py-3 px-4 font-bold text-right">Discount</th>
                  <th className="py-3 px-4 font-bold text-right">Net Amount</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="py-4 px-4 text-center font-bold text-slate-500">01</td>
                  <td className="py-4 px-4">
                    <strong className="text-slate-900 font-bold block text-sm mb-0.5">{courseTitle}</strong>
                    <span className="text-slate-500 text-[11px] block">
                      Live Cohort Mentorship • 30 Days Hands-on Labs & Capstone Projects • Verified JBM Certificate
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-slate-600">999293</td>
                  <td className="py-4 px-4 text-right font-medium text-slate-500">
                    {formatCurrency(actualFee)}
                  </td>
                  <td className="py-4 px-4 text-right font-medium text-emerald-700">
                    - {formatCurrency(discountAmount)}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-slate-900 text-sm">
                    {formatCurrency(courseFee)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4. TOTALS & AMOUNT IN WORDS */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-7 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Amount Chargeable in Words:
              </span>
              <p className="text-xs font-bold text-slate-900 italic">
                {numberToWordsINR(courseFee)}
              </p>
              <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
                <strong>Declaration:</strong> This is a computer-generated official tax invoice and admission fee receipt issued by Johanna Bright Mentors. All training programs include mentorship, laboratory infrastructure, and study material.
              </div>
            </div>

            {/* Calculations Box */}
            <div className="sm:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Tuition:</span>
                  <span className="font-semibold">{formatCurrency(actualFee)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Inaugural Scholarship (50%):</span>
                  <span>- {formatCurrency(discountAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (GST Inclusive):</span>
                  <span className="font-semibold">₹0.00</span>
                </div>
              </div>
              <div className="bg-slate-900 text-white p-3.5 flex justify-between items-center text-sm font-black">
                <span>TOTAL AMOUNT:</span>
                <span className="text-base text-amber-300 font-extrabold">{formatCurrency(courseFee)}</span>
              </div>
            </div>
          </div>

          {/* 5. OFFICIAL COMPANY SEAL & AUTHORIZED SIGNATURE */}
          <div className="pt-6 border-t border-slate-200 flex flex-row items-end justify-between gap-6">
            
            {/* Left: Security & Terms */}
            <div className="space-y-1.5 text-[10.5px] text-slate-500 max-w-sm">
              <p className="font-bold text-slate-700 uppercase">Terms & Verification:</p>
              <p>1. Admission fees once verified are valid for the allocated live batch schedule.</p>
              <p>2. For any invoice queries, quote <strong>{invoiceNumber}</strong> to <a href="mailto:hello.johannabrightmentors@gmail.com" className="text-maroon-800 font-semibold underline">hello.johannabrightmentors@gmail.com</a>.</p>
            </div>

            {/* Right: Company Seal & Signature */}
            <div className="flex items-center gap-6 text-right">
              {/* Official Seal */}
              <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/images/jbm-seal.png"
                  alt="Johanna Bright Mentors Pudukkottai Official Seal"
                  width={110}
                  height={110}
                  className="object-contain w-full h-full drop-shadow-sm opacity-95"
                />
              </div>

              {/* Signature Box */}
              <div className="flex flex-col items-center justify-end text-center min-w-[140px]">
                <div className="h-10 border-b border-slate-400 w-full mb-1 flex items-end justify-center">
                  <span className="font-serif italic font-bold text-slate-800 text-xs tracking-wider">
                    Johanna Bright
                  </span>
                </div>
                <span className="text-[11px] font-extrabold text-slate-900 block leading-tight">
                  Authorized Signatory
                </span>
                <span className="text-[9.5px] text-slate-500 font-semibold uppercase tracking-wider block">
                  Johanna Bright Mentors
                </span>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Global CSS for Print Optimization */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              size: A4 portrait;
              margin: 8mm;
            }
            body {
              background: #ffffff !important;
              color: #000000 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            header, footer, nav, .print\\:hidden {
              display: none !important;
            }
            main {
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
            }
          }
        `
      }} />
    </div>
  );
}
