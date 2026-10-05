import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { CheckCircle2, Clock, ArrowRight, Home, Mail, MessageCircle, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Registration & Admission Status",
};

interface SuccessPageProps {
  searchParams: Promise<{
    ref?: string;
    pay?: string;
    status?: string;
    payment_id?: string;
    vip?: string;
  }>;
}

export default async function RegisterSuccessPage({ searchParams }: SuccessPageProps) {
  const { ref, pay, status, payment_id, vip } = await searchParams;

  const isVipFree = status === "vip_free" || vip === "true";
  const isConfirmedPaid = pay === "confirmed" || isVipFree;

  const phoneClean = siteConfig.contact.phone.replace(/[^0-9]/g, "");
  const whatsappMsg = encodeURIComponent(
    `Hello JBM, my registration reference is ${ref || "N/A"}. I would like to verify my admission.`
  );
  const whatsappUrl = `https://wa.me/91${phoneClean}?text=${whatsappMsg}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/60 text-slate-900 selection:bg-rose-500 selection:text-white">
      <Header />

      <main className="flex-grow py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-100/40 blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="rounded-3xl p-8 sm:p-12 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 text-center space-y-6">
            {/* JBM Logo Header */}
            <div className="relative w-16 h-16 mx-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <Image
                src="/images/jbm-logo.png"
                alt={siteConfig.name}
                width={52}
                height={52}
                className="object-contain"
                priority
              />
            </div>

            {/* Status Icon */}
            {isConfirmedPaid ? (
              <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 rounded-3xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-amber-50 border border-amber-200 rounded-3xl flex items-center justify-center mx-auto text-amber-600 shadow-sm">
                <Clock className="w-10 h-10" />
              </div>
            )}

            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {isVipFree
                ? "VIP Scholarship Admission Confirmed!"
                : isConfirmedPaid
                ? "Enrollment Confirmed & Verified!"
                : "Application Recorded"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              {isVipFree
                ? "Your 100% scholarship pass has been verified! Welcome to Johanna Bright Mentors. Your official admission pass and batch schedule have been dispatched."
                : isConfirmedPaid
                ? "Your payment has been successfully verified. Welcome to Johanna Bright Mentors! An admission receipt and cohort invite has been dispatched to your email."
                : "We have safely recorded your registration details. Your admission seat will be finalized upon payment verification."}
            </p>

            {/* Reference Box */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left max-w-md mx-auto space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Registration Reference:</span>
                <span className="font-mono font-bold text-xs text-rose-700 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
                  {ref || "JBM-PENDING"}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Admission Status:</span>
                <div>
                  {isVipFree ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      100% VIP Scholarship
                    </span>
                  ) : isConfirmedPaid ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ✔ Confirmed Paid
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      ⏳ Pending Verification
                    </span>
                  )}
                </div>
              </div>

              {payment_id && (
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Payment Gateway ID:</span>
                  <span className="font-mono text-slate-900 font-semibold">{payment_id}</span>
                </div>
              )}
            </div>

            {/* Next Steps Box */}
            <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-200 text-left max-w-md mx-auto space-y-2">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-600" />
                <span>Next Onboarding Steps</span>
              </h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Check your inbox for the official JBM registration receipt.</li>
                <li>Live classroom link & orientation guide will arrive before cohort kickoff.</li>
                <li>Quote reference <strong className="text-slate-900">{ref}</strong> for any queries with our admissions desk.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Verify on WhatsApp ({siteConfig.contact.phone})</span>
              </a>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
