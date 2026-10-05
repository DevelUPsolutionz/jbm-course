import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { Sparkles, ShieldCheck, Target, Users2, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Johanna Bright Mentors",
  description: `Learn about ${siteConfig.name}'s mission, slogan "${siteConfig.slogan}", and practical mentorship model.`,
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-rose-500 selection:text-white">
      <Header />

      <main className="flex-grow py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-rose-50/30 via-white to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-rose-100/40 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Institutional Banner with Official Logo */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 mb-16 flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-rose-200 p-2 bg-gradient-to-tr from-rose-50 to-white shadow-md flex-shrink-0">
              <Image
                src="/images/jbm-logo-with-bg.png"
                alt={`${siteConfig.name} Emblem`}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>{siteConfig.slogan}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {siteConfig.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                {siteConfig.description}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  {siteConfig.contact.address}
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <Phone className="w-4 h-4 text-rose-600" />
                  +91 {siteConfig.contact.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Core Values Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-3 hover:border-rose-300 transition-colors">
                <div className="w-12 h-12 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-center mx-auto text-rose-600 mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Outcome-Driven Sprints</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every curriculum module in AI, English, and Cyber Security directly corresponds to verifiable job market benchmarks.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-3 hover:border-cyan-300 transition-colors">
                <div className="w-12 h-12 bg-cyan-50 border border-cyan-200 rounded-2xl flex items-center justify-center mx-auto text-cyan-600 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Transparent & Affordable</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  50% inaugural discounts, transparent coupon scholarships, and zero hidden platform charges.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-3 hover:border-indigo-300 transition-colors">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 mb-4">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Direct Mentor Feedback</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Learn directly from industry faculty with weekly 1-on-1 code reviews, vocal clarity critiques, and live doubt solving.
                </p>
              </div>
            </div>

            {/* Academic Standards Box */}
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Our Mentorship Standard</h2>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                At Johanna Bright Mentors, we bridge the gap between textbook theory and industry deployment through intensive 30-day and 40-day structured roadmaps.
              </p>
              <div className="border-t border-slate-100 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-rose-700">3</span>
                  <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider">Flagship Cohorts</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-rose-700">10</span>
                  <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider">Active Coupons</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-rose-700">100%</span>
                  <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider">Verified Badges</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-rose-700">24/7</span>
                  <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider">WhatsApp Support</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-6">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:opacity-95 shadow-md shadow-rose-600/25 transition-all hover:scale-105"
              >
                <span>Enroll in a Course</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
