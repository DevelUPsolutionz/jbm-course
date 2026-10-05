import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-16 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Legal</span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Terms & Conditions</h1>
              <p className="text-xs text-slate-500 mt-2">Last updated: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">1. Enrollment and Course Access</h2>
                <p>
                  By registering and completing payment for any course offered by {siteConfig.name}, you agree to adhere to these terms. Enrollment confirms admission into the specified batch and grants access to live sessions, lab environments, and course materials.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">2. Course Content and Intellectual Property</h2>
                <p>
                  All curriculum materials, lab configurations, video presentations, and study guides are proprietary intellectual property. Enrolled students are granted a personal, non-exclusive, non-transferable license for educational purposes only. Sharing, re-selling, or redistributing course content is strictly prohibited.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">3. Fee Payment & Cancellation</h2>
                <p>
                  Course fees must be remitted in full prior to batch commencement. Fees are stated in Indian Rupees (INR) and are inclusive of relevant taxes unless stated otherwise.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">4. Ethical Conduct & Lab Usage</h2>
                <p>
                  In cybersecurity courses, offensive tooling and techniques are taught exclusively for authorized penetration testing and educational defense. Any unauthorized scanning or attacks against third-party networks will result in immediate termination of enrollment without refund.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">5. Modifications to Services</h2>
                <p>
                  {siteConfig.name} reserves the right to make minor adjustments to schedules, instructors, or syllabus modules to ensure alignment with latest technology industry standards.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
