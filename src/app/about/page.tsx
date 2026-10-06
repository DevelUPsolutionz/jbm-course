import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  Target,
  Compass,
  Laptop,
  Briefcase,
  Users2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Practical Tech Mentorship & Mission",
  description:
    "Learn about Johanna Bright Mentors (JBM) — empowering learners with industry-aligned skills in Artificial Intelligence, Cyber Security, and Communication through structured learning and live mentorship.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `About Johanna Bright Mentors (JBM) | ${siteConfig.slogan}`,
    description: "Empowering learners with real-world skills through mentorship and practical lab training.",
    url: `${siteConfig.url}/about`,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-maroon-700 selection:text-white font-sans">
      <Header />

      <main className="flex-grow py-14 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#F5EEFB]/40 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Institutional Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 mb-14 flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-maroon-100 p-2 bg-gradient-to-tr from-maroon-50 to-white shadow-md flex-shrink-0">
              <Image
                src="/images/jbm-logo-with-bg.png"
                alt={`${siteConfig.name} Emblem`}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-maroon-700 bg-maroon-50 border border-maroon-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{siteConfig.slogan}</span>
                <span className="text-slate-300">•</span>
                <span>{siteConfig.tagline}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                About Johanna Bright Mentors
              </h1>
              <p className="text-sm sm:text-base font-semibold text-maroon-800">
                Empowering Learners With Skills for the Real World
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <MapPin className="w-4 h-4 text-maroon-700" />
                  {siteConfig.contact.address}
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <Phone className="w-4 h-4 text-maroon-700" />
                  +91 {siteConfig.contact.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Full Narrative Section from PDF */}
          <div className="space-y-12">
            {/* Story / About Description */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold">Johanna Bright Mentors (JBM)</strong> is a skill development, mentorship and career-focused learning organization dedicated to helping students, graduates and aspiring professionals build the skills they need to move forward in a rapidly changing world.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We believe that education should go beyond textbooks and theoretical knowledge. Real growth happens when learners understand concepts, practice them, build with them and apply them confidently.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                At JBM, we focus on creating practical and structured learning experiences that connect learning with real-world application and career opportunities.
              </p>
            </div>

            {/* Mission & Vision Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Our Mission */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FDF8FE] to-[#F6ECFB] border border-purple-100 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-maroon-700 text-white flex items-center justify-center font-bold shadow-md shadow-maroon-700/20">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-maroon-700">
                    OUR MISSION
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                    Making Practical Learning Accessible and Career-Focused
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Our mission is to help learners develop relevant skills, practical experience and professional confidence through structured programs, mentorship, workshops and hands-on learning.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  We aim to bridge the gap between academic education and industry expectations by helping learners understand not only what to learn, but also how to apply what they learn.
                </p>
              </div>

              {/* Our Vision */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border border-indigo-100 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-700 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-700/20">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                    OUR VISION
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                    Building Confident, Skilled and Future-Ready Professionals
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Our vision is to create a learning ecosystem where students and aspiring professionals can continuously develop their skills, explore career opportunities and confidently adapt to changing industry requirements.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  We want to empower learners to become self-driven, skilled and career-ready individuals who can create opportunities rather than simply wait for them.
                </p>
              </div>
            </div>

            {/* Our Impact Statistics from PDF */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                  OUR IMPACT
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-3">
                  Empowering Learners Through Practical Education
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-maroon-800">1500+</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">Students Impacted</div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Through cohorts, workshops, internships, and mentoring.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base font-bold text-slate-900 mt-1">Industry-Focused</div>
                  <div className="text-xs font-medium text-slate-600">Training Programs</div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Aligned with current technology benchmarks.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base font-bold text-slate-900 mt-1">Practical</div>
                  <div className="text-xs font-medium text-slate-600">Learning Experience</div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Hands-on activities, projects, and lab sandboxes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base font-bold text-slate-900 mt-1">Career-Focused</div>
                  <div className="text-xs font-medium text-slate-600">Guidance & Mentorship</div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Personalized resume, portfolio, and interview support.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-maroon-700 hover:bg-maroon-800 shadow-xl shadow-maroon-800/25 transition-all hover:scale-105"
              >
                <span>Explore Programs & Enroll</span>
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
