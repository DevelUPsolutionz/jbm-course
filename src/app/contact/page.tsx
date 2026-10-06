import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, Clock, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Admissions & Helpline (Coimbatore)",
  description: `Get in touch with ${siteConfig.name} admissions counselors in Coimbatore, Tamil Nadu. Connect via WhatsApp (+91 87785 78437) or email for course queries and batch dates.`,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact Admissions | ${siteConfig.name}`,
    description: `Speak directly with a JBM mentor or counselor regarding course admissions and prerequisites.`,
    url: `${siteConfig.url}/contact`,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-maroon-800 selection:text-white">
      <Header />

      <main className="flex-grow py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-maroon-50/40 via-white to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-maroon-100/40 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-maroon-800 bg-maroon-50 border border-maroon-200">
              <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
              <span>Direct Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Admissions & Student Support
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Have questions regarding course prerequisites, batch timetables, or corporate discounts? Reach our dedicated counselors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-base font-bold text-slate-900">Campus Information</h3>

                <div className="space-y-5 text-xs text-slate-600">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-maroon-50 border border-maroon-200 text-maroon-800 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm font-bold">Main Campus</strong>
                      <span>{siteConfig.contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-maroon-50 border border-maroon-200 text-maroon-800 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm font-bold">Admissions Desk</strong>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-maroon-800 font-semibold hover:underline">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-maroon-50 border border-maroon-200 text-maroon-800 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm font-bold">Helpline & WhatsApp</strong>
                      <a href={`https://wa.me/91${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`} className="text-maroon-800 font-semibold hover:underline">
                        +91 {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-maroon-50 border border-maroon-200 text-maroon-800 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm font-bold">Counseling Hours</strong>
                      <span>{siteConfig.contact.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Send an Inquiry</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
