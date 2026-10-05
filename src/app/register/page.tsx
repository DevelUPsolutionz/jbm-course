import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { siteConfig } from "@/config/site";
import { ShieldCheck, CheckCircle2, Lock, Headphones, Sparkles, Smartphone, CreditCard, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Course Registration & Admission",
  description: `Register online for ${siteConfig.name} live training cohorts.`,
};

interface RegisterPageProps {
  searchParams: Promise<{
    course?: string;
  }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { course } = await searchParams;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/60 text-slate-900 selection:bg-maroon-800 selection:text-white">
      <Header />

      <main className="flex-grow py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-maroon-100/40 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-maroon-800 bg-maroon-50 border border-maroon-200">
              <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
              <span>Admissions Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Course Registration & Admission
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Reserve your seat in our upcoming live cohorts. Real-time coupon discounts, secure UPI/card checkout, and automated receipts dispatched immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
            {/* Left Col: Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading form...</div>}>
                <RegistrationForm initialCourseSlug={course} />
              </Suspense>
            </div>

            {/* Right Col: Benefits & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-maroon-800" />
                  <span>Admissions Protocol</span>
                </h3>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Instant unique registration reference generated upon submission</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Razorpay gateway with UPI (GPay/PhonePe), Cards & Net Banking</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Onboarding packet & virtual sandbox credentials sent within 24 hours</span>
                  </li>
                </ul>
              </div>

              {/* Supported Payment Strip */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Accepted Payment Methods
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-700">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Smartphone className="w-4 h-4 text-maroon-800 mx-auto mb-1" />
                    <span>UPI & QR</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <CreditCard className="w-4 h-4 text-maroon-800 mx-auto mb-1" />
                    <span>Cards</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Building2 className="w-4 h-4 text-maroon-800 mx-auto mb-1" />
                    <span>NetBanking</span>
                  </div>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-maroon-50/60 border border-maroon-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-maroon-800">
                  <Headphones className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Admissions Desk</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Questions about syllabus eligibility, batch timings, or corporate team enrollments?
                </p>
                <div className="text-xs text-slate-700 pt-3 border-t border-maroon-200 space-y-1">
                  <p>Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-maroon-800 font-semibold underline">{siteConfig.contact.email}</a></p>
                  <p>Helpline: <a href={`tel:${siteConfig.contact.phone}`} className="text-slate-900 font-semibold hover:underline">+91 {siteConfig.contact.phone}</a></p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5" />
                <span>PCI-DSS Level 1 Compliant • 256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
