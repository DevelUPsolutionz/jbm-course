"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/ui/CourseCard";
import { InteractiveGlowCard } from "@/components/ui/InteractiveGlowCard";
import { MouseBlobImage } from "@/components/ui/MouseBlobImage";
import { getAllCourses } from "@/config/courses";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code,
  Rocket,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Compass,
  CheckCircle2,
  Award,
  Users2,
  Check,
  Target,
  Globe,
  Mail,
  MapPin,
  Laptop,
} from "lucide-react";

export default function HomePage() {
  const courses = getAllCourses();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] text-slate-900 font-sora">
      <Header />

      <main className="flex-grow">
        {/* ================================================================ */}
        {/* 1. HERO SECTION (PDF Page 1) — Screen Auto-Adjust & Logo Palette  */}
        {/* ================================================================ */}
        <section className="relative pt-6 pb-12 lg:pt-8 lg:pb-16 overflow-hidden">
          {/* Responsive screen auto-adjusting container */}
          <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="relative bg-gradient-to-br from-[#FFF9F8] via-[#FFFDFB] to-[#FFF5F0] rounded-[2.5rem] lg:rounded-[3.2rem] border border-rose-200/80 p-8 sm:p-14 lg:p-20 xl:p-24 min-h-[640px] flex items-center justify-center overflow-hidden shadow-[0_20px_55px_rgba(128,0,32,0.06)]">
              {/* Decorative Brand Ambient Glows matching Logo (Maroon & Amber) */}
              <div className="absolute top-0 left-0 w-[480px] h-[480px] bg-rose-200/40 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none animate-pulse-slow" />
              <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-amber-200/35 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

              {/* Floating Arched Cutout Photo of Student with Live Badge (Left Bottom) */}
              <div className="absolute bottom-10 left-8 hidden xl:block z-20 animate-float">
                <div className="relative w-48 h-56 bg-gradient-to-b from-maroon-800 to-maroon-950 rounded-t-full rounded-bl-full overflow-hidden border-4 border-white shadow-2xl transition-transform hover:scale-105 duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=400&q=80"
                    alt="Johanna Bright Mentors Student"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-2 right-2 text-white text-[11px] font-bold text-center">
                    Practical Sprints
                  </div>
                </div>

                {/* Floating Alumni Live Badge */}
                <div className="absolute -top-3 -right-6 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-amber-200 flex items-center gap-1.5 animate-bounce-slow">
                  <span className="text-amber-500 font-extrabold text-xs">⭐ 4.9/5</span>
                  <span className="text-[10px] font-bold text-slate-700">1500+ Alumni</span>
                </div>
              </div>

              {/* Floating Right Achievement Card with Live Pulse (Right Bottom) */}
              <div className="absolute bottom-12 right-10 hidden xl:block z-20 animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-rose-200/90 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black">
                    <Sparkles className="w-5 h-5 text-amber-500 animate-spin-slow" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-maroon-800 block">JBM Practical Lab</span>
                    <span className="text-[10px] text-slate-500 font-medium">100% Verified Outcomes</span>
                  </div>
                </div>
              </div>

              {/* Central Text Content */}
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Brand Tag Pill with Live Pulse Dot */}
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 border border-maroon-200 text-maroon-800 shadow-sm mb-6 hover:scale-105 transition-all">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-black tracking-widest uppercase">
                    {siteConfig.name} • {siteConfig.slogan}
                  </span>
                </div>

                {/* Big Artistic Headline */}
                <h1 className="text-5xl sm:text-7xl lg:text-[5.4rem] font-extrabold leading-[1.08] tracking-tight text-slate-900">
                  <div className="relative inline-block">
                    Learn.
                    {/* Decorative Star */}
                    <svg className="absolute -right-8 -top-6 w-9 h-9 text-amber-400 pointer-events-none animate-pulse-slow" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0l3.5 8.5L24 12l-8.5 3.5L12 24l-3.5-8.5L0 12l8.5-3.5z" />
                    </svg>
                  </div>{" "}
                  Practice.
                  <br />
                  <span className="relative inline-flex items-center justify-center px-4 py-1 mt-2">
                    <span className="relative z-10 text-maroon-800">Build. Grow.</span>
                    {/* Sunburst background shape */}
                    <svg className="absolute inset-0 w-full h-full text-amber-200 scale-125 -z-10 opacity-70 pointer-events-none animate-spin-slow" style={{ animationDuration: "35s" }} viewBox="0 0 200 100" fill="currentColor">
                      <path d="M100 0l15 30 35-5-10 35 30 15-30 15 10 35-35-5-15 30-15-30-35 5 10-35-30-15 30-15-10-35 35 5z" />
                    </svg>
                  </span>
                </h1>

                {/* Subtitle from PDF */}
                <p className="mt-6 text-base sm:text-xl font-bold text-slate-800 max-w-2xl mx-auto leading-snug">
                  Industry-focused learning for students, graduates and aspiring professionals.
                </p>

                {/* Descriptive Copy from PDF */}
                <p className="mt-4 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  At <strong className="text-slate-900 font-bold">Johanna Bright Mentors (JBM)</strong>, we help learners develop practical, career-focused skills through structured learning, live mentorship, hands-on practice and real-world projects.
                </p>

                <p className="mt-2 text-xs sm:text-sm font-medium text-maroon-900 max-w-xl mx-auto">
                  Explore our programs in Artificial Intelligence, Professional Communication and Cyber Security and take the next step toward building a stronger career.
                </p>

                {/* CTAs from PDF with Shimmer Effect */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
                  <Link
                    href="#courses"
                    className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-xl shadow-maroon-900/25 transition-all hover:scale-105 overflow-hidden group"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    <span>Explore Our Programs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.contact.rawWhatsapp}?text=Hi%20JBM%20Mentor,%20I%20would%20like%20to%20talk%20to%20a%20mentor%20about%20your%20learning%20programs.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-md transition-all hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Talk to a Mentor / {siteConfig.contact.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Live Continuous Infinite Marquee Ticker Strip below Hero */}
            <div className="mt-6 w-full overflow-hidden py-3 rounded-2xl bg-white border border-rose-100 shadow-sm flex items-center relative group">
              {/* Left & Right Subtle Fade Edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

              <div className="flex w-max group-hover:[animation-play-state:paused]">
                {/* Track 1 */}
                <div className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap animate-marquee select-none text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>1500+ Students Impacted</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Practical Hands-on Labs</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-maroon-700" />
                    <span>50% Inaugural Cohort Offer</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Verified JBM Certification</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Direct Faculty WhatsApp Guidance</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Real-World Portfolio Projects</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-700" />
                    <span>Career Capstone Placement Support</span>
                  </span>
                  <span className="text-rose-300">•</span>
                </div>

                {/* Track 2 (Identical clone for gap-free continuous loop) */}
                <div className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap animate-marquee select-none text-xs font-bold text-slate-700" aria-hidden="true">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>1500+ Students Impacted</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Practical Hands-on Labs</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-maroon-700" />
                    <span>50% Inaugural Cohort Offer</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Verified JBM Certification</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Direct Faculty WhatsApp Guidance</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Real-World Portfolio Projects</span>
                  </span>
                  <span className="text-rose-300">•</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-700" />
                    <span>Career Capstone Placement Support</span>
                  </span>
                  <span className="text-rose-300">•</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 2. ABOUT US — JOHANNA BRIGHT MENTORS (PDF Page 1 & 2)            */}
        {/* ================================================================ */}
        <section id="about" className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-[#FAF6FD]/60 to-white border-b border-slate-100 overflow-hidden">
          {/* Animated Ambient Backdrops */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header with Live Ping Accent */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-50 border border-maroon-200 text-maroon-800 shadow-sm mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon-700"></span>
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest">
                  ABOUT US — JOHANNA BRIGHT MENTORS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering Learners With Skills for the{" "}
                <span className="relative inline-block text-maroon-800">
                  Real World
                  <svg className="absolute -bottom-2 left-0 w-full text-amber-300 pointer-events-none opacity-80" height="10" viewBox="0 0 200 10" fill="none">
                    <path d="M2 7C60 2.5 140 2.5 198 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Creative Narrative Hero Card (Bento Split with Real Imagery & Interactive Loop) */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-slate-200/90 shadow-xl shadow-purple-950/5 max-w-6xl mx-auto mb-16 relative overflow-hidden group hover:border-maroon-300 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Narrative Text & Live Loop */}
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-base sm:text-lg text-slate-800 font-bold leading-relaxed">
                    <strong className="text-maroon-800 font-extrabold">Johanna Bright Mentors (JBM)</strong> is a skill development, mentorship and career-focused learning organization dedicated to helping students, graduates and aspiring professionals build the skills they need to move forward in a rapidly changing world.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We believe that education should go beyond textbooks and theoretical knowledge. Real growth happens when learners understand concepts, practice them, build with them and apply them confidently.
                  </p>

                  {/* Interactive 4-Stage Learning Loop */}
                  <div className="pt-2 pb-1">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>The JBM Real-World Growth Loop:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-200/70 text-center hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default group/step">
                        <span className="text-[10px] font-black text-sky-600 block uppercase">Step 01</span>
                        <strong className="text-xs font-bold text-slate-900 group-hover/step:text-sky-700">Understand</strong>
                      </div>
                      <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200/70 text-center hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default group/step">
                        <span className="text-[10px] font-black text-rose-600 block uppercase">Step 02</span>
                        <strong className="text-xs font-bold text-slate-900 group-hover/step:text-rose-700">Practice</strong>
                      </div>
                      <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-center hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default group/step">
                        <span className="text-[10px] font-black text-amber-600 block uppercase">Step 03</span>
                        <strong className="text-xs font-bold text-slate-900 group-hover/step:text-amber-700">Build</strong>
                      </div>
                      <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 text-center hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default group/step">
                        <span className="text-[10px] font-black text-emerald-600 block uppercase">Step 04</span>
                        <strong className="text-xs font-bold text-slate-900 group-hover/step:text-emerald-700">Apply</strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    At JBM, we focus on creating practical and structured learning experiences that connect learning with real-world application and career opportunities.
                  </p>
                </div>

                {/* Right Visual Image with Live Floating Badges */}
                <div className="lg:col-span-5 relative">
                  {/* Backdrop Shape */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-maroon-700 to-indigo-600 rounded-3xl transform rotate-3 scale-95 opacity-80" />

                  {/* Main Mentor Image */}
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                      alt="JBM Mentor Guidance"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-bold">
                      Direct Faculty Feedback & Code Reviews
                    </div>
                  </div>

                  {/* Floating Live Badge 1 (Top Left) */}
                  <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2 animate-float">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-900">Live Mentorship</span>
                  </div>

                  {/* Floating Live Badge 2 (Bottom Right) */}
                  <div className="absolute -bottom-4 -right-4 bg-maroon-800 text-white px-4 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5 animate-float" style={{ animationDelay: "2s" }}>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-[11px] font-bold">100% Practical</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Mission & Our Vision Luminous Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Mission Card with Interactive Mouse Spotlight */}
              <InteractiveGlowCard
                glowColor="rgba(128, 0, 32, 0.22)"
                spotlightRadius={600}
                className="p-8 sm:p-11 rounded-[2.5rem] bg-gradient-to-br from-[#FFF5F8] via-white to-[#FCE7EA]/60 border border-rose-200/90 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative flex flex-col justify-between"
              >
                {/* Watermark Target Background */}
                <div className="absolute -right-8 -bottom-8 w-44 h-44 text-rose-100 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-full h-full stroke-[1] opacity-60" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-maroon-700 to-rose-600 text-white p-3.5 shadow-md shadow-maroon-700/25 group-hover:rotate-6 transition-transform duration-300">
                      <Target className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-maroon-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      OUR MISSION
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-maroon-800 transition-colors">
                    Making Practical Learning Accessible and Career-Focused
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Our mission is to help learners develop relevant skills, practical experience and professional confidence through structured programs, mentorship, workshops and hands-on learning.
                  </p>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    We aim to bridge the gap between academic education and industry expectations by helping learners understand not only what to learn, but also how to apply what they learn.
                  </p>
                </div>

                {/* Mission Highlights Pills */}
                <div className="relative z-10 pt-6 mt-6 border-t border-rose-100 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-rose-200/80 font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-maroon-700 stroke-[3]" />
                    <span>Relevant Skills & Experience</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-rose-200/80 font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-maroon-700 stroke-[3]" />
                    <span>Mentorship & Workshops</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-rose-200/80 font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-maroon-700 stroke-[3]" />
                    <span>Industry Gap Bridged</span>
                  </span>
                </div>
              </InteractiveGlowCard>

              {/* Vision Card with Interactive Mouse Spotlight */}
              <InteractiveGlowCard
                glowColor="rgba(99, 102, 241, 0.25)"
                spotlightRadius={600}
                className="p-8 sm:p-11 rounded-[2.5rem] bg-gradient-to-br from-[#F4EFF9] via-white to-[#E9DEFA]/60 border border-purple-200/90 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative flex flex-col justify-between"
              >
                {/* Watermark Compass Background */}
                <div className="absolute -right-8 -bottom-8 w-44 h-44 text-purple-100 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Compass className="w-full h-full stroke-[1] opacity-60" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-700 to-purple-600 text-white p-3.5 shadow-md shadow-indigo-700/25 group-hover:rotate-6 transition-transform duration-300">
                      <Compass className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                      OUR VISION
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-900 transition-colors">
                    Building Confident, Skilled and Future-Ready Professionals
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Our vision is to create a learning ecosystem where students and aspiring professionals can continuously develop their skills, explore career opportunities and confidently adapt to changing industry requirements.
                  </p>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    We want to empower learners to become self-driven, skilled and career-ready individuals who can create opportunities rather than simply wait for them.
                  </p>
                </div>

                {/* Vision Highlights Pills */}
                <div className="relative z-10 pt-6 mt-6 border-t border-purple-100 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-purple-200/80 font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-indigo-700 stroke-[3]" />
                    <span>Continuous Learning Ecosystem</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-purple-200/80 font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-indigo-700 stroke-[3]" />
                    <span>Adaptive to Industry Shifts</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-purple-200/80 font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-indigo-700 stroke-[3]" />
                    <span>Opportunity Creators</span>
                  </span>
                </div>
              </InteractiveGlowCard>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. OUR IMPACT (PDF Page 2) — With Real Content Pill Marquee      */}
        {/* ================================================================ */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
              OUR IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Empowering Learners Through <span className="text-maroon-600 italic">Practical Education</span>
            </h2>
          </div>

          {/* Genuine Pill Marquee using 100% real PDF offerings */}
          <div className="w-full flex flex-col gap-4 overflow-hidden py-4 px-4 select-none">
            {/* Row 1 */}
            <div className="flex items-center justify-center gap-4 flex-nowrap min-w-max mx-auto translate-x-6">
              <div className="flex items-center gap-2.5 px-8 py-4 bg-[#F8BBD0] rounded-full shadow-sm hover:scale-105 transition-transform font-bold text-sm text-slate-900">
                <Sparkles className="w-4 h-4 text-maroon-700" />
                <span>Industry-Focused Training Programs</span>
              </div>

              <div className="flex items-center justify-center px-10 py-4 bg-[#E1F5FE] rounded-full shadow-sm hover:scale-105 transition-transform border border-sky-200">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">1500+</span>
                <span className="text-xs font-bold text-sky-900 ml-2">Students Impacted</span>
              </div>

              <div className="flex items-center gap-2.5 px-8 py-4 bg-[#FFE082] rounded-full shadow-sm hover:scale-105 transition-transform font-bold text-sm text-slate-900">
                <Laptop className="w-4 h-4 text-amber-800" />
                <span>Practical Learning Experience</span>
              </div>

              <div className="flex items-center gap-2.5 px-8 py-4 bg-[#D1C4E9] rounded-full shadow-sm hover:scale-105 transition-transform font-bold text-sm text-slate-900">
                <Briefcase className="w-4 h-4 text-purple-800" />
                <span>Career-Focused Guidance & Mentorship</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-center gap-4 flex-nowrap min-w-max mx-auto -translate-x-6">
              <div className="flex items-center gap-2.5 px-8 py-4 bg-[#E0E0E0] rounded-full shadow-sm hover:scale-105 transition-transform font-bold text-sm text-slate-900">
                <Code className="w-4 h-4 text-slate-700" />
                <span>AI & Productivity Program</span>
              </div>

              <div className="flex items-center justify-center px-10 py-4 bg-[#C8E6C9] rounded-full shadow-sm hover:scale-105 transition-transform border border-emerald-200 font-black text-slate-900 text-lg sm:text-xl">
                <span>Networking in Cyber Security</span>
              </div>

              <div className="flex items-center gap-2.5 px-8 py-4 bg-[#B3E5FC] rounded-full shadow-sm hover:scale-105 transition-transform font-bold text-sm text-slate-900">
                <Users2 className="w-4 h-4 text-sky-800" />
                <span>Professional English & Communication</span>
              </div>

              <div className="flex items-center justify-center px-8 py-4 bg-[#FFCC80] rounded-full shadow-sm hover:scale-105 transition-transform border border-amber-200 font-bold text-sm text-slate-900">
                <span>Learn • Practice • Build • Grow</span>
              </div>
            </div>
          </div>

          {/* 4 Impact Cards from PDF with Live Micro-Elements */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200/90 text-left hover:border-maroon-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden bg-gradient-to-b from-white to-rose-50/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-black text-maroon-800">1500+</span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-maroon-700"></span>
                </span>
              </div>
              <strong className="text-sm font-bold text-slate-900 block mb-1">Students Impacted</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learners reached through our training programs, workshops, internships and career-focused initiatives.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200/90 text-left hover:border-blue-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-blue-700">Industry-Focused</span>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              </div>
              <strong className="text-sm font-bold text-slate-900 block mb-1">Training Programs</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Programs designed around practical skills and current industry expectations.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200/90 text-left hover:border-emerald-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-emerald-700">Practical</span>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <strong className="text-sm font-bold text-slate-900 block mb-1">Learning Experience</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hands-on activities, projects, tools and real-world applications to move beyond theoretical learning.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200/90 text-left hover:border-amber-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden bg-gradient-to-b from-white to-amber-50/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-amber-700">Career-Focused</span>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              </div>
              <strong className="text-sm font-bold text-slate-900 block mb-1">Guidance & Mentorship</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Support to help learners identify skills, build confidence and prepare for professional opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. WHAT JBM OFFERS (PDF Page 2 & 3)                             */}
        {/* ================================================================ */}
        <section id="courses" className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                WHAT JBM OFFERS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
                Learn Skills That Move Your Career Forward
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Our programs are designed to help you develop relevant skills, gain practical experience and become more confident in your career journey.
              </p>
            </div>

            {/* 3 Core Programs Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>

            {/* Showcases with real photography for Workshops & Internships */}
            <div className="mt-20 space-y-16">
              {/* Showcase 1: Internships & Practical Learning */}
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Tilted Image Frame */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#81C784] transform -rotate-3 rounded-3xl scale-95 origin-bottom-left" />
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                      <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                        alt="Internships & Practical Learning"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Right Content from PDF */}
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      PRACTICAL LEARNING
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
                      Internships & Practical Learning
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      We provide practical learning experiences that encourage learners to move beyond theory. Our internship and project-based programs focus on:
                    </p>
                    <div className="space-y-3 mb-8">
                      {[
                        "Hands-on learning with guided drills",
                        "Real-world applications and deployment",
                        "Practical projects for your portfolio",
                        "Industry-relevant tools and environments",
                        "Problem-solving and technical debugging",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={`https://wa.me/${siteConfig.contact.rawWhatsapp}?text=Hi%20JBM,%20I%20am%20interested%20in%20Internship%20and%20practical%20learning%20opportunities.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all hover:scale-105"
                    >
                      <span>Inquire About Internships</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Showcase 2: Workshops & Training */}
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content from PDF */}
                  <div className="order-2 lg:order-1">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                      CAMPUS & INSTITUTIONAL
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
                      Workshops & Training
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      JBM conducts workshops and training sessions for students and institutions covering areas such as:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {[
                        "Artificial Intelligence & Emerging Technologies",
                        "Career Guidance & Roadmaps",
                        "Entrepreneurship & Innovation",
                        "Skill Awareness",
                        "Technology Awareness",
                      ].map((item, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span className="text-xs font-bold text-slate-800">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 italic mb-8">
                      These sessions are designed to introduce learners to emerging opportunities and help them understand the skills required for the future.
                    </p>

                    <Link
                      href="#institutions"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-maroon-800 bg-maroon-50 hover:bg-maroon-100 border border-maroon-200 transition-all hover:scale-105"
                    >
                      <span>Explore Institutional Programs</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right Circular Arched Image Frame — violet blob tracks mouse */}
                  <div className="relative order-1 lg:order-2">
                    <MouseBlobImage
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                      alt="Workshops & Training"
                      blobColor="#D1C4E9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. OUR LEARNING PHILOSOPHY (PDF Page 3)                          */}
        {/* ================================================================ */}
        <section id="philosophy" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                OUR LEARNING PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Learn. Practice. Build. Grow.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                We follow a simple four-step approach:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 01 LEARN */}
              <InteractiveGlowCard
                glowColor="rgba(14, 165, 233, 0.22)"
                spotlightRadius={450}
                className="p-8 rounded-3xl bg-[#E1F5FE]/40 border border-[#90CAF9] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <span className="text-3xl font-black text-sky-600 block mb-2 group-hover:scale-105 transition-transform">01</span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200 inline-block mb-3">
                  LEARN
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  Build a strong foundation and understand the concepts.
                </p>
              </InteractiveGlowCard>

              {/* 02 PRACTICE */}
              <InteractiveGlowCard
                glowColor="rgba(244, 63, 94, 0.22)"
                spotlightRadius={450}
                className="p-8 rounded-3xl bg-[#FCE4EC]/40 border border-[#F48FB1] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <span className="text-3xl font-black text-rose-600 block mb-2 group-hover:scale-105 transition-transform">02</span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md border border-rose-200 inline-block mb-3">
                  PRACTICE
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  Apply knowledge through exercises, activities and guided practice.
                </p>
              </InteractiveGlowCard>

              {/* 03 BUILD */}
              <InteractiveGlowCard
                glowColor="rgba(245, 158, 11, 0.22)"
                spotlightRadius={450}
                className="p-8 rounded-3xl bg-[#FFF8E1]/40 border border-[#FFE082] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <span className="text-3xl font-black text-amber-600 block mb-2 group-hover:scale-105 transition-transform">03</span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 inline-block mb-3">
                  BUILD
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  Create projects and work on practical, real-world scenarios.
                </p>
              </InteractiveGlowCard>

              {/* 04 GROW */}
              <InteractiveGlowCard
                glowColor="rgba(16, 185, 129, 0.22)"
                spotlightRadius={450}
                className="p-8 rounded-3xl bg-[#E8F5E9]/40 border border-[#A5D6A7] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <span className="text-3xl font-black text-emerald-600 block mb-2 group-hover:scale-105 transition-transform">04</span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200 inline-block mb-3">
                  GROW
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  Use your skills to improve your confidence, professional profile and career opportunities.
                </p>
              </InteractiveGlowCard>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. WHY JBM? & WHO CAN LEARN WITH JBM? (PDF Page 4)               */}
        {/* ================================================================ */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Why JBM? */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                WHY JBM?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                More Than Learning. A Path Toward Growth.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                At JBM, we believe that learning becomes valuable when you can understand it, practice it, apply it and use it confidently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {[
                { title: "Live & Interactive Learning", desc: "Learn through structured sessions designed to encourage participation and practical understanding." },
                { title: "Hands-On Practice", desc: "Apply concepts through exercises, tools, activities and practical learning." },
                { title: "Real-World Projects", desc: "Build projects that help you turn theoretical knowledge into practical experience." },
                { title: "Structured Learning Paths", desc: "Follow a clear learning journey from fundamentals to practical application." },
                { title: "Career Guidance", desc: "Get guidance on skills, career direction, portfolios, resumes and interview preparation." },
                { title: "Mentorship & Support", desc: "Learn with guidance and support throughout your learning journey." },
              ].map((item, i) => (
                <div key={i} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-maroon-300 transition-colors">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Who Can Learn With JBM? */}
            <div className="bg-[#F4EFF9] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border border-purple-200">
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-800">
                  WHO CAN LEARN WITH JBM?
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  Built for Learners at Different Stages of Their Career
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { role: "College Students", desc: "Develop industry-relevant skills alongside your academic education." },
                  { role: "Fresh Graduates", desc: "Gain practical knowledge and improve your career readiness." },
                  { role: "Job Seekers", desc: "Strengthen your skills, confidence and interview preparation." },
                  { role: "Aspiring Professionals", desc: "Upgrade your existing skills and stay prepared for changing industry requirements." },
                  { role: "Career Explorers", desc: "Discover new career paths and understand what skills you need to move forward." },
                ].map((segment, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm text-center">
                    <strong className="block text-xs font-bold text-slate-900 mb-2">{segment.role}</strong>
                    <span className="text-[11px] text-slate-600 leading-relaxed block">{segment.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 7. JBM FOR INSTITUTIONS (Section 1 of 3: Main Partnership Hero)  */}
        {/* ================================================================ */}
        <section id="institutions" className="py-24 bg-gradient-to-br from-[#080E1C] via-[#0F172A] to-[#0A101D] text-white relative overflow-hidden">
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest">
                    JBM FOR INSTITUTIONS
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
                  Industry-Focused Workshops & Training for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                    Colleges, Universities & Institutions
                  </span>
                </h2>

                <p className="text-base sm:text-lg font-semibold text-amber-300/90 leading-snug">
                  Bring Practical, Career-Focused Learning to Your Students
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  JBM partners with colleges, universities and educational institutions to deliver practical workshops, training programs, career guidance, internships and skill-development initiatives designed around current industry requirements.
                </p>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href={`https://wa.me/${siteConfig.contact.rawWhatsapp}?text=Hi%20JBM,%20We%20would%20like%20to%20request%20an%20institutional%20session%20for%20our%20college.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:opacity-95 shadow-xl shadow-amber-400/20 transition-all hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-950" />
                    <span>Request a Session</span>
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 shadow-md backdrop-blur-sm transition-all hover:scale-105"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Talk to JBM (+91 {siteConfig.contact.phone})</span>
                  </a>
                </div>

                {/* Quick Trust Highlights */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Customized to Department Level</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Hands-On Practical Lab Sandboxes</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Official Certification Support</span>
                  </span>
                </div>
              </div>

              {/* Right Campus Photo with Floating Elements */}
              <div className="lg:col-span-5 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 rounded-[2.5rem] transform rotate-3 scale-95 blur-sm" />

                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-700/80 bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                    alt="University training workshop"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-sm font-extrabold block">Campus & Auditorium Workshops</span>
                    <span className="text-xs text-amber-300 font-medium">Tailored for Engineering, Arts & Tech Campuses</span>
                  </div>
                </div>

                {/* Floating Live Badge */}
                <div className="absolute -top-4 -right-4 bg-slate-800/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-float">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">1500+ Campus Learners</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. WHAT WE OFFER TO INSTITUTIONS (Section 2 of 3: Bento Grid)    */}
        {/* ================================================================ */}
        <section id="institutional-offerings" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F5EFFB]/40 to-[#F8FAFC] border-y border-slate-200/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                WHAT WE OFFER
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
                Programs Engineered for Colleges & Universities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Choose from our structured modules or request customized engagement models for your department:
              </p>
            </div>

            {/* 6 Rich Bento Cards with Color Coding */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Workshops */}
              <div className="p-8 rounded-[2rem] bg-white border border-purple-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                    <span>— Workshops</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Interactive sessions covering AI, Cyber Security, Entrepreneurship, Career Guidance and Professional Skills.
                  </p>
                </div>
                <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                    Live Interactive Sprints
                  </span>
                  <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Training Programs */}
              <div className="p-8 rounded-[2rem] bg-white border border-sky-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                    <span>— Training Programs</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Structured technical and professional skill-development programs designed for students and institutions.
                  </p>
                </div>
                <div className="pt-4 border-t border-sky-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                    Semester & Vacation Cohorts
                  </span>
                  <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Career Guidance */}
              <div className="p-8 rounded-[2rem] bg-white border border-rose-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                    <span>— Career Guidance</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Career awareness, career roadmaps, placement preparation, resume guidance and interview preparation.
                  </p>
                </div>
                <div className="pt-4 border-t border-rose-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    Placement & Resume Readiness
                  </span>
                  <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 4: Internships */}
              <div className="p-8 rounded-[2rem] bg-white border border-emerald-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                    <span>— Internships</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Practical internship programs that help students gain hands-on experience and develop relevant skills.
                  </p>
                </div>
                <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Project-Based Portfolios
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 5: Faculty Development */}
              <div className="p-8 rounded-[2rem] bg-white border border-amber-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                    <span>— Faculty Development</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Professional development programs covering emerging technologies, digital tools and modern skills.
                  </p>
                </div>
                <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Modern AI & Digital Tools
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 6: Customized Programs */}
              <div className="p-8 rounded-[2rem] bg-white border border-indigo-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                    <span>— Customized Programs</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Programs tailored to your institution's department, student level, objectives and requirements.
                  </p>
                </div>
                <div className="pt-4 border-t border-indigo-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    Tailored Objectives & Duration
                  </span>
                  <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 9. OUR KEY DOMAINS & HOW IT WORKS (Section 3 of 3: Roadmap)       */}
        {/* ================================================================ */}
        <section id="institutional-process" className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Left Column: Our Key Domains */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                    OUR KEY DOMAINS
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
                    Specialized Focus Areas
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Designed to equip students with emerging high-demand career competencies:
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  {[
                    { domain: "AI & Emerging Technologies", desc: "Generative AI, Large Language Models, Prompting & Automation", color: "from-purple-500/10 to-indigo-500/10", border: "border-purple-200" },
                    { domain: "Cyber Security & Networking", desc: "Network Defense, Packet Analysis, Ethical Defense & Protocols", color: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-200" },
                    { domain: "Entrepreneurship & Innovation", desc: "Ideation to MVP, Product Mindset, Market Discovery & Execution", color: "from-amber-500/10 to-yellow-500/10", border: "border-amber-200" },
                    { domain: "Career Guidance & Professional Development", desc: "Placement Roadmaps, Mock Interviews, Portfolio & Resumes", color: "from-rose-500/10 to-pink-500/10", border: "border-rose-200" },
                    { domain: "Communication & Professional Skills", desc: "Spoken English, Vocal Clarity, Presentation & Workplace Confidence", color: "from-sky-500/10 to-blue-500/10", border: "border-sky-200" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border ${item.border} bg-gradient-to-r ${item.color} hover:scale-[1.02] hover:shadow-md transition-all duration-300`}
                    >
                      <strong className="text-sm font-bold text-slate-900 block mb-1">
                        {item.domain}
                      </strong>
                      <span className="text-xs text-slate-600 leading-relaxed block">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: How It Works (Connected 5-Step Process) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                    HOW IT WORKS
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
                    Seamless 5-Step Execution
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    From initial requirement to live campus workshop delivery:
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    { step: "01", title: "Share Your Requirement", desc: "Tell us about your institution and what your students need." },
                    { step: "02", title: "Discuss Your Requirements", desc: "Our team understands your objectives, audience and preferred format." },
                    { step: "03", title: "Receive a Customized Proposal", desc: "We prepare a proposal based on your requirements." },
                    { step: "04", title: "Confirm the Program", desc: "Finalize the topic, date, duration, format and other requirements." },
                    { step: "05", title: "Conduct the Program", desc: "JBM delivers the agreed workshop, training or program." },
                  ].map((s, idx) => (
                    <div
                      key={s.step}
                      className="p-5 rounded-2xl bg-[#FAF8FE] border border-slate-200 hover:border-maroon-300 hover:shadow-md hover:bg-white transition-all duration-300 flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-maroon-800 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-md shadow-maroon-800/20 group-hover:scale-110 transition-transform">
                        {s.step}
                      </div>
                      <div>
                        <strong className="text-sm font-bold text-slate-900 block group-hover:text-maroon-800 transition-colors">
                          {s.title}
                        </strong>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Instant Action Bar */}
                <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                  <div>
                    <span className="text-xs text-amber-300 font-bold block">Ready to discuss your college requirement?</span>
                    <strong className="text-sm text-white">Direct helpline: +91 {siteConfig.contact.phone}</strong>
                  </div>
                  <a
                    href={`https://wa.me/${siteConfig.contact.rawWhatsapp}?text=Hi%20JBM,%20We%20would%20like%20to%20discuss%20an%20institutional%20program%20for%20our%20students.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md flex-shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. JOIN THE JBM COMMUNITY (PDF Page 6)                           */}
        {/* ================================================================ */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="p-10 sm:p-16 rounded-[2.5rem] bg-gradient-to-r from-maroon-900 via-maroon-800 to-indigo-950 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                  JOIN THE JBM COMMUNITY
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold mt-5 tracking-tight">
                  Ready to Learn, Build and Grow?
                </h2>
                <p className="mt-4 text-sm sm:text-base text-maroon-100 leading-relaxed">
                  Whether you're a student, graduate, job seeker or aspiring professional, JBM is here to help you take the next step in your learning and career journey.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="#courses"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg transition-transform hover:scale-105"
                  >
                    <span>Explore Our Programs</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.contact.rawWhatsapp}?text=Hi%20JBM,%20I%20am%20ready%20to%20learn%20and%20grow%20with%20you!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg transition-transform hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Unified Brand Footer */}
      <Footer />
    </div>
  );
}
