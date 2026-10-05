import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-16 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Legal</span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Privacy Policy</h1>
              <p className="text-xs text-slate-500 mt-2">Last updated: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
                <p>
                  When you register for a course with {siteConfig.name}, we collect personal information including your full name, email address, phone number, selected course program, and optional messages you provide during enrollment.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
                <p>
                  Your information is utilized solely to process your admission, communicate batch timetables, deliver transactional emails (registration acknowledgments and payment receipts), provide lab credentials, and provide student support.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">3. Payment Information Security</h2>
                <p>
                  We do not store credit card numbers, CVVs, or sensitive banking credentials on our servers. All financial transactions are securely processed via Razorpay using industry-standard 256-bit SSL encryption adhering to PCI-DSS Level 1 compliance.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">4. Third-Party Services</h2>
                <p>
                  We do not sell, trade, or rent student personal data to third parties. We share data only with verified operational service providers (such as transactional email delivery and payment processing) essential to executing the educational service.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">5. Contact Us</h2>
                <p>
                  For any questions regarding our privacy practices or to request data modification, please contact our data privacy officer at <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-600 underline">{siteConfig.contact.email}</a>.
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
