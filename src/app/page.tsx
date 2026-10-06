"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/ui/CourseCard";
import { InteractiveGlowCard } from "@/components/ui/InteractiveGlowCard";
import { MouseBlobImage } from "@/components/ui/MouseBlobImage";
import { ContactForm } from "@/components/ui/ContactForm";
import { AnimatedProcess } from "@/components/ui/AnimatedProcess";
import { getAllCourses } from "@/config/courses";
import { siteConfig } from "@/config/site";
import { FaqSection } from "@/components/ui/FaqSection";
import {
  DoodleMintLoop,
  DoodleStarburst8,
  DoodleSquiggleUnderline,
  DoodleSparkleStar,
  DoodleArrowDown,
  DoodleArrowCurved,
  DoodleBurstLines,
  DoodleHatchLines,
  DoodleRibbonTape,
  OrganicArchYellow,
  OrganicCoralBlob,
  OrganicMintPolygon,
} from "@/components/ui/DoodleArt";
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
  ShieldCheck,
  Bot,
  Languages,
  Terminal,
  Brain,
} from "lucide-react";

export default function HomePage() {
  const [courses, setCourses] = React.useState(getAllCourses());

  React.useEffect(() => {
    fetch("/api/courses", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] text-slate-900 font-sans">
      <Header />

      <main className="flex-grow">
        {/* ================================================================ */}
        {/* 1. HERO SECTION (PDF Page 1) — Screen Auto-Adjust & Logo Palette  */}
        {/* ================================================================ */}
        <section className="relative pt-6 pb-12 lg:pt-8 lg:pb-16 overflow-hidden">
          {/* Responsive screen auto-adjusting container */}
          <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="relative bg-gradient-to-br from-[#FFFDFB] via-[#FFF9F6] to-[#FAF5FF] rounded-[2.5rem] lg:rounded-[3.2rem] border border-slate-200/90 p-8 sm:p-14 lg:p-16 xl:p-20 min-h-[660px] flex items-center justify-center overflow-hidden shadow-[0_20px_55px_rgba(128,0,32,0.05)]">
              {/* Soft Pastel Backdrop Glows matching Dribbble Reference */}
              <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-purple-200/35 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/25 rounded-full blur-[100px] pointer-events-none" />

              {/* 1. TOP-LEFT SPEECH BUBBLE (Dribbble Reference Style) */}
              <div className="absolute top-8 left-8 hidden xl:flex items-center gap-2.5 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md max-w-[270px] text-left z-20 animate-float">
                {/* 12-Lobed Cyan Flower Badge */}
                <div className="absolute -top-3.5 -left-3.5 w-8 h-8 text-sky-400 drop-shadow-sm">
                  <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
                    <circle cx="20" cy="8" r="5" /><circle cx="20" cy="32" r="5" />
                    <circle cx="8" cy="20" r="5" /><circle cx="32" cy="20" r="5" />
                    <circle cx="11" cy="11" r="5" /><circle cx="29" cy="29" r="5" />
                    <circle cx="11" cy="29" r="5" /><circle cx="29" cy="11" r="5" />
                    <circle cx="20" cy="20" r="7" className="text-white fill-current" />
                  </svg>
                </div>
                <p className="text-[11px] font-medium text-slate-600 leading-snug">
                  Welcome to our practical skill portal, where innovation thrives and career growth has no limits.
                </p>
              </div>

              {/* 2. CHARACTER 1: TOP-RIGHT STUDENT WITH MINT-CYAN POLYGON BACKDROP */}
              <div className="absolute top-12 right-6 xl:right-16 hidden lg:block z-10 animate-float" style={{ animationDelay: '1s' }}>
                <div className="relative w-52 xl:w-60 h-64 xl:h-72">
                  {/* Floating 3D Cyan Diamond Plates above student */}
                  <div className="absolute -top-8 left-8 flex flex-col items-center gap-0.5 opacity-90 animate-pulse-slow">
                    <div className="w-10 h-4 bg-sky-200/90 rounded transform -skew-x-12 shadow-sm" />
                    <div className="w-10 h-4 bg-sky-300/90 rounded transform -skew-x-12 shadow-sm -mt-2" />
                  </div>

                  {/* Mint-Cyan Geometric Polygon Backdrop Shape */}
                  <div className="absolute inset-0 bg-[#BAE6FD] rounded-[2.5rem] transform rotate-6 scale-95 transition-transform hover:rotate-12 duration-500 shadow-md shadow-sky-200/50" />

                  {/* Portrait Card */}
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                    <Image
                      src="/images/hero/hero-student-1.webp"
                      alt="JBM Student"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Hand-drawn Doodle Arrow pointing towards text */}
                  <div className="absolute -bottom-6 -left-8 pointer-events-none opacity-80">
                    <svg width="45" height="45" viewBox="0 0 60 60" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M45 15 C30 25, 20 40, 10 45 M15 35 L8 46 L22 47" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 3. CHARACTER 2: BOTTOM-LEFT STUDENT WITH PASTEL LILAC SCALLOPED FLOWER BACKDROP */}
              <div className="absolute bottom-10 left-6 xl:left-14 hidden lg:block z-10 animate-float" style={{ animationDelay: '2s' }}>
                <div className="relative w-48 xl:w-56 h-60 xl:h-68">
                  {/* Pastel Lilac/Violet Scalloped Flower Silhouette Shape */}
                  <div className="absolute -inset-4 opacity-90 transform -rotate-6 transition-transform hover:rotate-0 duration-500">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-[#DDD6FE] fill-current">
                      <circle cx="100" cy="35" r="35" /><circle cx="100" cy="165" r="35" />
                      <circle cx="35" cy="100" r="35" /><circle cx="165" cy="100" r="35" />
                      <circle cx="50" cy="50" r="35" /><circle cx="150" cy="150" r="35" />
                      <circle cx="50" cy="150" r="35" /><circle cx="150" cy="50" r="35" />
                      <circle cx="100" cy="100" r="45" />
                    </svg>
                  </div>

                  {/* Portrait Card */}
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100 z-10">
                    <Image
                      src="/images/hero/hero-student-2.webp"
                      alt="JBM Learner"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Squiggly doodle arrow */}
                  <div className="absolute -top-6 -right-6 pointer-events-none opacity-80 z-20">
                    <svg width="40" height="40" viewBox="0 0 60 60" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 40 C20 20, 35 15, 50 15 M40 8 L52 15 L42 24" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 4. DECORATIVE PASTEL FLOWERS AT BOTTOM-RIGHT */}
              <div className="absolute bottom-8 right-12 hidden xl:flex items-center gap-3 z-10 pointer-events-none">
                <div className="w-9 h-9 text-rose-300 animate-pulse-slow">
                  <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
                    <circle cx="20" cy="10" r="5" /><circle cx="20" cy="30" r="5" />
                    <circle cx="10" cy="20" r="5" /><circle cx="30" cy="20" r="5" />
                    <circle cx="13" cy="13" r="5" /><circle cx="27" cy="27" r="5" />
                    <circle cx="13" cy="27" r="5" /><circle cx="27" cy="13" r="5" />
                    <circle cx="20" cy="20" r="4" className="text-amber-300 fill-current" />
                  </svg>
                </div>
                <div className="w-7 h-7 text-amber-300 animate-spin-slow">
                  <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
                    <path d="M20 0 L23 14 L37 10 L27 20 L37 30 L23 26 L20 40 L17 26 L3 30 L13 20 L3 10 L17 14 Z" />
                  </svg>
                </div>
              </div>

              {/* 5. CENTRAL EDITORIAL HEADLINE & CONTENT (ZenEd Reference Style) */}
              <div className="relative z-10 text-center max-w-4xl mx-auto py-6">
                {/* Brand Tag Pill with Live Ping Dot */}
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 border border-maroon-200 text-maroon-800 shadow-sm mb-6 hover:scale-105 transition-all">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-black tracking-widest uppercase">
                    {siteConfig.name} • <span className="font-serif italic capitalize tracking-normal font-semibold text-maroon-800">{siteConfig.slogan}</span>
                  </span>
                </div>

                {/* Big Artistic Editorial Headline Matching Reference Shot */}
                <h1 className="text-5xl sm:text-7xl lg:text-[5.4rem] xl:text-[5.8rem] font-serif tracking-tight text-slate-900 leading-[1.08] select-none text-center">
                  <span className="block font-normal">Learn</span>
                  <span className="block italic font-normal text-slate-900 sm:-mt-2">
                    Anytime,
                  </span>
                  <span className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap sm:-mt-2">
                    {/* Golden Starburst Sticker with "at" inside */}
                    <span className="relative inline-flex items-center justify-center align-middle mx-1">
                      <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-20 sm:h-20 text-amber-300 drop-shadow-md animate-spin-slow">
                        <path
                          fill="currentColor"
                          d="M50 0 L58 22 L80 11 L74 34 L98 39 L82 56 L98 73 L74 77 L80 100 L58 89 L50 111 L42 89 L20 100 L26 77 L2 73 L18 56 L2 39 L26 34 L20 11 L42 22 Z"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-serif italic text-base sm:text-2xl font-black text-slate-950">
                        at
                      </span>
                    </span>
                    <span className="font-normal">Your</span>
                  </span>
                  <span className="block font-normal text-maroon-800 sm:-mt-2">
                    Pace
                  </span>
                </h1>

                {/* Motto Pill */}
                <div className="mt-5 flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-maroon-800 bg-maroon-50 border border-maroon-200/80 px-4 py-1.5 rounded-full shadow-sm">
                    Learn • Practice • Build • Grow
                  </span>
                </div>

                {/* Subtitle from PDF */}
                <p className="mt-4 text-base sm:text-lg font-bold text-slate-800 max-w-xl mx-auto leading-snug">
                  Industry-focused learning for students, graduates and aspiring professionals.
                </p>

                {/* Descriptive Copy */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                  At <strong className="text-slate-900 font-bold">Johanna Bright Mentors (JBM)</strong>, we help learners develop practical, career-focused skills through structured learning, live mentorship, hands-on practice and real-world projects.
                </p>

                {/* CTAs Styled after "Lets Start" in Reference Shot */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
                  <Link
                    href="#courses"
                    className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] shadow-xl shadow-orange-500/25 transition-all hover:scale-105 overflow-hidden group"
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
                    <span>100+ Students Impacted</span>
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
                    <span>100+ Students Impacted</span>
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
        <section id="about" className="relative py-12 sm:py-16 bg-gradient-to-b from-white via-[#FAF6FD]/60 to-white border-b border-slate-100 overflow-hidden">
          {/* Animated Ambient Backdrops */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header with Live Ping Accent */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-50 border border-maroon-200 text-maroon-800 shadow-sm mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon-700"></span>
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest">
                  ABOUT US — JOHANNA BRIGHT MENTORS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Our{" "}
                <span className="relative inline-block text-rose-600 font-serif italic font-semibold">
                  Mission
                  <div className="absolute -bottom-2.5 left-0 w-full">
                    <DoodleSquiggleUnderline className="text-rose-400" />
                  </div>
                </span>{" "}
                & Real-World Learning
              </h2>
            </div>

            {/* Creative Narrative Hero Card (Bento Split with Real Imagery & Interactive Loop) */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xl shadow-purple-950/5 max-w-6xl mx-auto mb-10 relative overflow-hidden group hover:border-maroon-300 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Narrative Text & Live Loop */}
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-base sm:text-lg text-slate-800 font-bold leading-relaxed">
                    <strong className="text-maroon-800 font-extrabold">Johanna Bright Mentors (JBM)</strong> is a skill development, mentorship and career-focused learning organization dedicated to helping students, graduates and aspiring professionals build the skills they need to move forward in a rapidly changing world.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We believe that education should go beyond textbooks and theoretical knowledge. Real growth happens when learners understand concepts, practice them, build with them and apply them confidently.
                  </p>

                  {/* Interactive 4-Stage Learning Loop with doodle arrow */}
                  <div className="pt-2 pb-1 relative">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>The JBM Real-World Growth Loop:</span>
                      </span>
                      {/* Floating doodle curved arrow */}
                      <div className="hidden sm:block pointer-events-none text-slate-400 opacity-70">
                        <DoodleArrowCurved className="w-8 h-6 text-slate-400" />
                      </div>
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

                {/* Right Visual Image with ZenEd Organic Backdrops & Doodles */}
                <div className="lg:col-span-5 relative">
                  {/* Floating Doodle Hatch Lines (From ZenEd Screenshot 3) */}
                  <div className="absolute -top-10 -right-8 pointer-events-none opacity-80 z-20">
                    <DoodleHatchLines className="w-24 h-16 text-sky-300" />
                  </div>

                  {/* Floating Emerald Sparkle Star (From ZenEd Screenshots 2 & 4) */}
                  <div className="absolute -top-5 left-6 pointer-events-none z-20 animate-pulse-slow">
                    <DoodleSparkleStar className="w-8 h-8 text-emerald-400" />
                  </div>

                  {/* Dual Organic Backdrops behind image (From ZenEd Screenshots 2, 3 & 4) */}
                  <OrganicArchYellow className="bg-amber-300/80 -rotate-3" />
                  <OrganicMintPolygon className="bg-sky-200/70 rotate-6" />

                  {/* Main Mentor Image */}
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 z-10">
                    <Image
                      src="/images/sections/mentor-guidance.webp"
                      alt="JBM Mentor Guidance and Code Review"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-bold">
                      Direct Faculty Feedback & Code Reviews
                    </div>
                  </div>

                  {/* Floating Live Badge 1 (Top Left) */}
                  <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2 animate-float z-20">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-900">Live Mentorship</span>
                  </div>

                  {/* Floating Live Badge 2 (Bottom Right) */}
                  <div className="absolute -bottom-4 -right-4 bg-maroon-800 text-white px-4 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5 animate-float z-20" style={{ animationDelay: "2s" }}>
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
                <div className="absolute -right-4 -bottom-4 w-44 h-44 text-rose-100 pointer-events-none scale-75 opacity-30 group-hover:scale-[1.35] group-hover:opacity-80 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-all duration-700 ease-out origin-bottom-right">
                  <Target className="w-full h-full stroke-[1]" />
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
                <div className="absolute -right-4 -bottom-4 w-44 h-44 text-purple-100 pointer-events-none scale-75 opacity-30 group-hover:scale-[1.35] group-hover:opacity-80 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-all duration-700 ease-out origin-bottom-right">
                  <Compass className="w-full h-full stroke-[1]" />
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
        <section className="py-12 sm:py-16 bg-white overflow-hidden border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
              OUR IMPACT & REACH
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
              Empowering Learners Through{" "}
              <span className="relative inline-block text-rose-600 font-serif italic font-semibold">
                Practical Education
              </span>
            </h2>
          </div>

          {/* ZenEd Reference Style Stats Strip (From Screenshot 3 & 2) */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
            <div className="relative bg-[#FEFCE8]/80 border border-amber-200/90 rounded-[2.5rem] p-6 sm:p-10 shadow-sm overflow-hidden">
              {/* Subtle background doodle accents */}
              <div className="absolute top-2 right-6 pointer-events-none opacity-40">
                <DoodleHatchLines className="w-20 h-14 text-amber-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 pointer-events-none opacity-50">
                <DoodleMintLoop className="w-16 h-16 text-emerald-400" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center text-center relative z-10">
                {/* Stat 1 with Radiating Burst Doodle (From Screenshot 3) */}
                <div className="flex flex-col items-center">
                  <DoodleBurstLines className="w-8 h-5 text-amber-500 mb-1" />
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    100+
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                    Students
                  </span>
                </div>

                {/* Stat 2 with Radiating Burst Doodle */}
                <div className="flex flex-col items-center">
                  <DoodleBurstLines className="w-8 h-5 text-emerald-500 mb-1" />
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    100%
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                    Practical Hands-on Labs
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center">
                  <div className="h-6 flex items-center justify-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-100/80 px-2.5 py-0.5 rounded-full">
                      LIMITED OFFER
                    </span>
                  </div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-600 tracking-tight">
                    50%
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                    Inaugural Cohort Scholarship
                  </span>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center">
                  <div className="h-6 flex items-center justify-center">
                    <DoodleSparkleStar className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    10+
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                    Campus Workshops & Sessions
                  </span>
                </div>
              </div>

              {/* Student Trust Avatar Bar (From Screenshot 2) */}
              <div className="mt-8 pt-6 border-t border-amber-200/60 flex flex-wrap items-center justify-center gap-3 relative z-10 text-center">
                <div className="flex items-center -space-x-2.5">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="/images/avatars/avatar-1.webp"
                    alt="Learner"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="/images/avatars/avatar-2.webp"
                    alt="Learner"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="/images/avatars/avatar-3.webp"
                    alt="Learner"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="/images/avatars/avatar-4.webp"
                    alt="Learner"
                  />
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  <strong className="text-slate-900 font-extrabold">Trusted by 100+ learners</strong> across universities and tech institutions.
                </p>
              </div>
            </div>
          </div>

          {/* Genuine Pill Marquee using 100% real PDF offerings */}
          <div className="w-full flex flex-col gap-4 overflow-hidden py-3 px-4 select-none">
            {/* Row 1 */}
            <div className="flex items-center justify-center gap-4 flex-nowrap min-w-max mx-auto translate-x-6">
              <div className="flex items-center gap-2.5 px-8 py-4 bg-[#F8BBD0] rounded-full shadow-sm hover:scale-105 transition-transform font-bold text-sm text-slate-900">
                <Sparkles className="w-4 h-4 text-maroon-700" />
                <span>Industry-Focused Training Programs</span>
              </div>

              <div className="flex items-center justify-center px-10 py-4 bg-[#E1F5FE] rounded-full shadow-sm hover:scale-105 transition-transform border border-sky-200">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">100+</span>
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

        </section>

        {/* ================================================================ */}
        {/* 4. WHAT JBM OFFERS (PDF Page 2 & 3)                             */}
        {/* ================================================================ */}
        <section id="courses" className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 relative">
              {/* Floating Pink Folded Ribbon Sticker on Top Left (From Screenshot 2) */}
              <div className="absolute -top-6 left-2 sm:left-10 pointer-events-none opacity-85 hidden sm:block animate-pulse-slow">
                <DoodleRibbonTape className="w-12 h-10 text-rose-300" />
              </div>

              {/* Floating Emerald Sparkle Star on Top Right (From Screenshot 2 & 4) */}
              <div className="absolute -top-6 right-2 sm:right-10 pointer-events-none opacity-90 hidden sm:block">
                <DoodleSparkleStar className="w-8 h-8 text-emerald-400" />
              </div>

              <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                WHAT JBM OFFERS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Learn Skills That{" "}
                <span className="text-rose-600 font-serif italic font-semibold">
                  Move Your Career Forward
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Our programs are designed to help you develop relevant skills, gain practical experience and become more confident in your career journey.
              </p>

              {/* Hand-drawn Doodle Arrow pointing down to Courses (From Screenshot 2) */}
              <div className="flex justify-center mt-3 pointer-events-none opacity-80">
                <DoodleArrowDown className="w-8 h-8 text-slate-500 animate-bounce" />
              </div>
            </div>

            {/* 3 Core Programs Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>

            {/* Showcases with real photography for Workshops & Internships */}
            <div className="mt-12 space-y-8 sm:space-y-10">
              {/* Showcase 1: Internships & Practical Learning */}
              <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Tilted Image Frame with ZenEd Organic Backdrops (From Screenshot 2 & 4) */}
                  <div className="relative">
                    {/* Dual Organic Backdrops */}
                    <OrganicCoralBlob className="bg-[#FDA4AF]/80" />
                    <OrganicMintPolygon className="bg-[#A7F3D0]/80" />

                    {/* Floating doodle accent */}
                    <div className="absolute -top-6 -left-6 z-20 pointer-events-none opacity-80">
                      <DoodleArrowCurved className="w-9 h-7 text-slate-600" />
                    </div>

                    <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 z-10">
                      <Image
                        src="/images/sections/practical-learning.webp"
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

                  {/* Right Circular Arched Image Frame with ZenEd Doodles (From Screenshot 3) */}
                  <div className="relative order-1 lg:order-2">
                    {/* Floating Diagonal Hatch Lines Doodle (From Screenshot 3) */}
                    <div className="absolute -top-8 -right-6 pointer-events-none opacity-80 z-20">
                      <DoodleHatchLines className="w-24 h-16 text-sky-400" />
                    </div>

                    {/* Floating Mint Loop Doodle */}
                    <div className="absolute -bottom-6 -left-6 pointer-events-none opacity-80 z-20">
                      <DoodleMintLoop className="w-16 h-16 text-emerald-400" />
                    </div>

                    <MouseBlobImage
                      src="/images/sections/workshops-blob.webp"
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
        {/* 5. OUR LEARNING PHILOSOPHY (PDF Page 3) - Growth Trajectory UI   */}
        {/* ================================================================ */}
        <section id="philosophy" className="py-14 sm:py-18 bg-[#FAFBFC] relative overflow-hidden">
          {/* Subtle Ambient Radial Highlights without any square grids */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-100/35 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-rose-100/25 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2" />
            
            {/* Top & Bottom Fade Overlays */}
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#FAFBFC] to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#FAFBFC] to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 relative">
              {/* Floating Doodle Accents */}
              <div className="absolute -top-6 right-4 hidden sm:block pointer-events-none opacity-85">
                <DoodleSparkleStar className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="absolute -top-6 left-4 hidden sm:block pointer-events-none opacity-80">
                <DoodleStarburst8 className="w-9 h-9 text-sky-300" />
              </div>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-maroon-50 via-rose-50 to-amber-50 px-4 py-1.5 rounded-full border border-maroon-200/80 shadow-sm mb-3">
                <span className="flex h-2 w-2 rounded-full bg-maroon-600 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-800 font-display">
                  OUR LEARNING PHILOSOPHY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
                Learn. Practice.{" "}
                <span className="relative inline-block text-rose-600 font-serif italic font-semibold">
                  Build. Grow.
                  <div className="absolute -bottom-2.5 left-0 w-full">
                    <DoodleSquiggleUnderline className="text-rose-400" />
                  </div>
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed max-w-2xl mx-auto">
                A proven, continuous upward trajectory from foundational knowledge to professional industry mastery.
              </p>
            </div>

            {/* Growth Graph Container with 4 Trajectory Cards */}
            <div className="relative max-w-6xl mx-auto lg:pt-28 lg:pb-28">
              
              {/* Dynamic SVG Upward Trajectory Graph Line (Behind the Cards on Desktop/Tablet) */}
              <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
                <svg
                  viewBox="0 0 1000 514"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Multi-stop Stroke Gradient representing continuous growth */}
                    <linearGradient id="growthStroke" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284c7" />     {/* Sky Blue */}
                      <stop offset="35%" stopColor="#e11d48" />    {/* Rose Red */}
                      <stop offset="68%" stopColor="#f59e0b" />    {/* Amber Gold */}
                      <stop offset="95%" stopColor="#10b981" />    {/* Emerald Green */}
                    </linearGradient>

                    {/* Gradient Area Fill under the graph */}
                    <linearGradient id="growthArea" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.10" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.01" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Arrowhead Marker */}
                    <marker
                      id="graphArrow"
                      viewBox="0 0 12 12"
                      refX="9"
                      refY="6"
                      markerWidth="8"
                      markerHeight="8"
                      orient="auto-start-reverse"
                    >
                      <path d="M 1 1 L 11 6 L 1 11 Z" fill="#10b981" />
                    </marker>
                  </defs>

                  {/* Shaded Area under the growth curve – ups and downs trajectory */}
                  <path
                    d="M 15 514 L 15 510 L 125 502 L 250 510 L 375 437 L 500 445 L 625 367 L 750 375 L 875 302 L 985 25 L 985 514 Z"
                    fill="url(#growthArea)"
                  />

                  {/* Main Glowing Upward Trajectory (Ups and Downs / Etha Irakkam) */}
                  <path
                    d="M 15 510 L 125 502 L 250 510 L 375 437 L 500 445 L 625 367 L 750 375 L 875 302 L 985 25"
                    stroke="url(#growthStroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#neonGlow)"
                    markerEnd="url(#graphArrow)"
                  />
                </svg>
              </div>

              {/* Trajectory Milestone Badge at the Arrow Tip (Desktop) */}
              <div className="hidden lg:flex absolute top-2 right-0 z-30 items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-600/30 border border-emerald-400/40">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Career Peak</span>
              </div>

              {/* The 4 Staggered Cards Sitting In Front of the Graph (z-10) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                
                {/* 01 LEARN (Peak 1) */}
                <div className="relative group lg:translate-y-[100px] transition-transform duration-500">
                  <InteractiveGlowCard
                    glowColor="rgba(14, 165, 233, 0.3)"
                    spotlightRadius={400}
                    className="p-7 lg:py-8 lg:h-[290px] rounded-[2rem] bg-white/95 backdrop-blur-xl border border-sky-200/80 shadow-[0_10px_28px_rgba(2,132,199,0.08)] hover:shadow-2xl hover:shadow-sky-500/30 relative overflow-hidden flex flex-col justify-center transition-all duration-500"
                  >
                    {/* Fill Background Effect */}
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-sky-500 opacity-0 group-hover:scale-[25] group-hover:opacity-100 transition-all duration-700 ease-out z-0"></div>

                    {/* Watermark Number */}
                    <span className="absolute -bottom-8 -right-4 text-[8.5rem] leading-none font-black font-display text-sky-100/70 pointer-events-none group-hover:scale-110 transition-transform duration-700 group-hover:text-white/20 z-0">
                      1
                    </span>
                    
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-black text-xl mb-5 shadow-md shadow-sky-100 group-hover:scale-110 group-hover:bg-white group-hover:text-sky-600 group-hover:border-white transition-all duration-300">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <span className="relative z-10 text-[11px] font-black uppercase tracking-widest font-display text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200 inline-flex items-center gap-2 mb-3 w-fit group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:bg-white"></span>
                      01 • LEARN
                    </span>
                    <p className="text-sm text-slate-700 font-bold leading-relaxed relative z-10 mt-1 group-hover:text-white transition-colors duration-300">
                      Build a strong foundation and understand the core concepts.
                    </p>
                  </InteractiveGlowCard>

                  {/* Bottom Center Node Anchor */}
                  <div className="hidden lg:flex absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-sky-600 border-2 border-white shadow-md" />
                    </div>
                  </div>
                </div>

                {/* 02 PRACTICE (Peak 2) */}
                <div className="relative group lg:translate-y-[35px] transition-transform duration-500">
                  <InteractiveGlowCard
                    glowColor="rgba(244, 63, 94, 0.3)"
                    spotlightRadius={400}
                    className="p-7 lg:py-8 lg:h-[290px] rounded-[2rem] bg-white/95 backdrop-blur-xl border border-rose-200/80 shadow-[0_10px_28px_rgba(244,63,94,0.08)] hover:shadow-2xl hover:shadow-rose-500/30 relative overflow-hidden flex flex-col justify-center transition-all duration-500"
                  >
                    {/* Fill Background Effect */}
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-rose-500 opacity-0 group-hover:scale-[25] group-hover:opacity-100 transition-all duration-700 ease-out z-0"></div>

                    {/* Watermark Number */}
                    <span className="absolute -bottom-8 -right-4 text-[8.5rem] leading-none font-black font-display text-rose-100/70 pointer-events-none group-hover:scale-110 transition-transform duration-700 group-hover:text-white/20 z-0">
                      2
                    </span>
                    
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black text-xl mb-5 shadow-md shadow-rose-100 group-hover:scale-110 group-hover:bg-white group-hover:text-rose-600 group-hover:border-white transition-all duration-300">
                      <Laptop className="w-7 h-7" />
                    </div>
                    <span className="relative z-10 text-[11px] font-black uppercase tracking-widest font-display text-rose-700 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200 inline-flex items-center gap-2 mb-3 w-fit group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 group-hover:bg-white"></span>
                      02 • PRACTICE
                    </span>
                    <p className="text-sm text-slate-700 font-bold leading-relaxed relative z-10 mt-1 group-hover:text-white transition-colors duration-300">
                      Apply knowledge through exercises, activities and guided practice.
                    </p>
                  </InteractiveGlowCard>

                  {/* Bottom Center Node Anchor */}
                  <div className="hidden lg:flex absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border-2 border-white shadow-md" />
                    </div>
                  </div>
                </div>

                {/* 03 BUILD (Peak 3) */}
                <div className="relative group lg:-translate-y-[35px] transition-transform duration-500">
                  <InteractiveGlowCard
                    glowColor="rgba(245, 158, 11, 0.3)"
                    spotlightRadius={400}
                    className="p-7 lg:py-8 lg:h-[290px] rounded-[2rem] bg-white/95 backdrop-blur-xl border border-amber-200/80 shadow-[0_10px_28px_rgba(245,158,11,0.08)] hover:shadow-2xl hover:shadow-amber-500/30 relative overflow-hidden flex flex-col justify-center transition-all duration-500"
                  >
                    {/* Fill Background Effect */}
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-amber-500 opacity-0 group-hover:scale-[25] group-hover:opacity-100 transition-all duration-700 ease-out z-0"></div>

                    {/* Watermark Number */}
                    <span className="absolute -bottom-8 -right-4 text-[8.5rem] leading-none font-black font-display text-amber-100/70 pointer-events-none group-hover:scale-110 transition-transform duration-700 group-hover:text-white/20 z-0">
                      3
                    </span>
                    
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-black text-xl mb-5 shadow-md shadow-amber-100 group-hover:scale-110 group-hover:bg-white group-hover:text-amber-600 group-hover:border-white transition-all duration-300">
                      <Rocket className="w-7 h-7" />
                    </div>
                    <span className="relative z-10 text-[11px] font-black uppercase tracking-widest font-display text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 inline-flex items-center gap-2 mb-3 w-fit group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:bg-white"></span>
                      03 • BUILD
                    </span>
                    <p className="text-sm text-slate-700 font-bold leading-relaxed relative z-10 mt-1 group-hover:text-white transition-colors duration-300">
                      Create projects and work on practical, real-world scenarios.
                    </p>
                  </InteractiveGlowCard>

                  {/* Bottom Center Node Anchor */}
                  <div className="hidden lg:flex absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-600 border-2 border-white shadow-md" />
                    </div>
                  </div>
                </div>

                {/* 04 GROW (Peak 4) */}
                <div className="relative group lg:-translate-y-[100px] transition-transform duration-500">
                  <InteractiveGlowCard
                    glowColor="rgba(16, 185, 129, 0.35)"
                    spotlightRadius={400}
                    className="p-7 lg:py-8 lg:h-[290px] rounded-[2rem] bg-white/95 backdrop-blur-xl border border-emerald-200/80 shadow-[0_12px_32px_rgba(16,185,129,0.12)] hover:shadow-2xl hover:shadow-emerald-500/30 relative overflow-hidden flex flex-col justify-center transition-all duration-500"
                  >
                    {/* Fill Background Effect */}
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-emerald-500 opacity-0 group-hover:scale-[25] group-hover:opacity-100 transition-all duration-700 ease-out z-0"></div>

                    {/* Watermark Number */}
                    <span className="absolute -bottom-8 -right-4 text-[8.5rem] leading-none font-black font-display text-emerald-100/70 pointer-events-none group-hover:scale-110 transition-transform duration-700 group-hover:text-white/20 z-0">
                      4
                    </span>
                    
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-black text-xl mb-5 shadow-md shadow-emerald-100 group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-600 group-hover:border-white transition-all duration-300">
                      <TrendingUp className="w-7 h-7" />
                    </div>
                    <span className="relative z-10 text-[11px] font-black uppercase tracking-widest font-display text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-2 mb-3 w-fit group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-white"></span>
                      04 • GROW
                    </span>
                    <p className="text-sm text-slate-700 font-bold leading-relaxed relative z-10 mt-1 group-hover:text-white transition-colors duration-300">
                      Use your skills to improve your confidence, professional profile and career opportunities.
                    </p>
                  </InteractiveGlowCard>

                  {/* Bottom Center Node Anchor */}
                  <div className="hidden lg:flex absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-md" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. WHY JBM? & WHO CAN LEARN WITH JBM? (PDF Page 4)               */}
        {/* ================================================================ */}
        <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Why JBM? */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                WHY JBM?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                More Than Learning. A Path Toward Growth.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                At JBM, we believe that learning becomes valuable when you can understand it, practice it, apply it and use it confidently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 sm:mb-12">
              {[
                { title: "Live & Interactive Learning", desc: "Learn through structured sessions designed to encourage participation and practical understanding." },
                { title: "Hands-On Practice", desc: "Apply concepts through exercises, tools, activities and practical learning." },
                { title: "Real-World Projects", desc: "Build projects that help you turn theoretical knowledge into practical experience." },
                { title: "Structured Learning Paths", desc: "Follow a clear learning journey from fundamentals to practical application." },
                { title: "Career Guidance", desc: "Get guidance on skills, career direction, portfolios, resumes and interview preparation." },
                { title: "Mentorship & Support", desc: "Learn with guidance and support throughout your learning journey." },
              ].map((item, i) => (
                <div key={i} className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-maroon-300 transition-colors">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Who Can Learn With JBM? */}
            <div className="bg-[#F4EFF9] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-purple-200">
              <div className="text-center max-w-xl mx-auto mb-8">
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
                  <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-purple-100 shadow-sm text-center">
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
        <section id="institutions" className="py-14 sm:py-18 text-white relative overflow-hidden">
          {/* Image Background with Rich Maroon Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/institution/campus-hero-bg.webp" 
              alt="University Campus" 
              fill 
              className="object-cover"
            />
            {/* Unified Maroon overlay without dark/blue edges */}
            <div className="absolute inset-0 bg-maroon-900/95"></div>
            <div className="absolute inset-0 bg-maroon-800/40 mix-blend-multiply"></div>
            {/* Subtle ambient glows */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-400/20 blur-[120px] pointer-events-none"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest">
                    JBM FOR INSTITUTIONS
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
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
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:opacity-95 shadow-xl shadow-amber-400/20 transition-all hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-950" />
                    <span>Request a Session</span>
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 shadow-md backdrop-blur-sm transition-all hover:scale-105"
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
                    src="/images/institution/campus-workshop.webp"
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
                  <span className="text-xs font-bold text-white">100+ Students</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. WHAT WE OFFER TO INSTITUTIONS (Section 2 of 3: Bento Grid)    */}
        {/* ================================================================ */}
        <section id="institutional-offerings" className="py-14 sm:py-18 bg-gradient-to-b from-[#F8FAFC] via-[#F5EFFB]/40 to-[#F8FAFC] border-y border-slate-200/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                WHAT WE OFFER
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Programs Engineered for <span className="font-serif italic font-semibold text-maroon-800">Colleges & Universities</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Choose from our structured modules or request customized engagement models for your department:
              </p>
            </div>

            {/* 6 Rich Bento Cards with Color Coding */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Workshops */}
              <div className="p-6 rounded-[2rem] bg-white border border-purple-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-start">
                <div className="relative w-full h-40 mb-5 rounded-[1.5rem] overflow-hidden bg-purple-50">
                  <Image src="/images/institution/program-workshops.webp" alt="Workshops" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>— Workshops</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Interactive sessions covering AI, Cyber Security, Entrepreneurship, Career Guidance and Professional Skills.
                </p>
              </div>

              {/* Card 2: Training Programs */}
              <div className="p-6 rounded-[2rem] bg-white border border-sky-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-start">
                <div className="relative w-full h-40 mb-5 rounded-[1.5rem] overflow-hidden bg-sky-50">
                  <Image src="/images/institution/program-training.webp" alt="Training Programs" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>— Training Programs</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Structured technical and professional skill-development programs designed for students and institutions.
                </p>
              </div>

              {/* Card 3: Career Guidance */}
              <div className="p-6 rounded-[2rem] bg-white border border-rose-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-start">
                <div className="relative w-full h-40 mb-5 rounded-[1.5rem] overflow-hidden bg-rose-50">
                  <Image src="/images/institution/program-career.webp" alt="Career Guidance" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>— Career Guidance</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Career awareness, career roadmaps, placement preparation, resume guidance and interview preparation.
                </p>
              </div>

              {/* Card 4: Internships */}
              <div className="p-6 rounded-[2rem] bg-white border border-emerald-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-start">
                <div className="relative w-full h-40 mb-5 rounded-[1.5rem] overflow-hidden bg-emerald-50">
                  <Image src="/images/institution/program-internships.webp" alt="Internships" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>— Internships</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Practical internship programs that help students gain hands-on experience and develop relevant skills.
                </p>
              </div>

              {/* Card 5: Faculty Development */}
              <div className="p-6 rounded-[2rem] bg-white border border-amber-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-start">
                <div className="relative w-full h-40 mb-5 rounded-[1.5rem] overflow-hidden bg-amber-50">
                  <Image src="/images/institution/program-faculty.webp" alt="Faculty Development" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>— Faculty Development</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Professional development programs covering emerging technologies, digital tools and modern skills.
                </p>
              </div>

              {/* Card 6: Customized Programs */}
              <div className="p-6 rounded-[2rem] bg-white border border-indigo-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-start">
                <div className="relative w-full h-40 mb-5 rounded-[1.5rem] overflow-hidden bg-indigo-50">
                  <Image src="/images/institution/program-customized.webp" alt="Customized Programs" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>— Customized Programs</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Programs tailored to your institution's department, student level, objectives and requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 9. OUR KEY DOMAINS & HOW IT WORKS (Section 3 of 3: Roadmap)       */}
        {/* ================================================================ */}
        <section id="institutional-process" className="py-14 sm:py-18 bg-white border-b border-slate-100 relative overflow-hidden">
          {/* Unique Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-maroon-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse-slow"></div>
            <div className="absolute bottom-1/2 left-0 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            
            {/* Dot Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16 relative z-10">
            
            {/* Top Section: Our Key Domains */}
            <div>
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
                  OUR KEY DOMAINS
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
                  Specialized Focus Areas
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Designed to equip students with emerging high-demand career competencies:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 justify-center">
                {[
                  { domain: "AI & Emerging Technologies", desc: "Generative AI, Large Language Models, Prompting & Automation", color: "from-purple-500/10 to-indigo-500/10", border: "border-purple-200" },
                  { domain: "Cyber Security & Networking", desc: "Network Defense, Packet Analysis, Ethical Defense & Protocols", color: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-200" },
                  { domain: "Entrepreneurship & Innovation", desc: "Ideation to MVP, Product Mindset, Market Discovery & Execution", color: "from-amber-500/10 to-yellow-500/10", border: "border-amber-200" },
                  { domain: "Career Guidance & Professional Development", desc: "Placement Roadmaps, Mock Interviews, Portfolio & Resumes", color: "from-rose-500/10 to-pink-500/10", border: "border-rose-200" },
                  { domain: "Communication & Professional Skills", desc: "Spoken English, Vocal Clarity, Presentation & Workplace Confidence", color: "from-sky-500/10 to-blue-500/10", border: "border-sky-200" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 sm:p-6 rounded-3xl border ${item.border} bg-gradient-to-br ${item.color} hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                  >
                    <strong className="text-base sm:text-lg font-bold text-slate-900 block mb-1.5">
                      {item.domain}
                    </strong>
                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed block">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section: How It Works */}
            <div className="border-t border-slate-100 pt-12 sm:pt-14">
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                  HOW IT WORKS
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                  Seamless 5-Step Execution
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
                  From initial requirement to live campus workshop delivery:
                </p>
              </div>

              <AnimatedProcess />

              {/* Instant Action Bar */}
              <div className="max-w-4xl mx-auto mt-12 sm:mt-14 p-6 sm:p-8 rounded-[2rem] bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                <div>
                  <span className="text-sm text-amber-300 font-bold block mb-1">Ready to discuss your college requirement?</span>
                  <strong className="text-base sm:text-lg text-white">Direct helpline: +91 {siteConfig.contact.phone}</strong>
                </div>
                <a
                  href={`https://wa.me/${siteConfig.contact.rawWhatsapp}?text=Hi%20JBM,%20We%20would%20like%20to%20discuss%20an%20institutional%20program%20for%20our%20students.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-md flex-shrink-0 hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* 10. FREQUENTLY ASKED QUESTIONS (From ZenEd Dribbble Screenshot 1) */}
        {/* ================================================================ */}
        <FaqSection />

        <section id="contact" className="relative py-14 sm:py-18 bg-slate-50 border-t border-slate-200 overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            {/* The Unified Contact Box with Unique Edges */}
            <div className="relative bg-white rounded-[3rem] p-3 sm:p-5 shadow-2xl shadow-slate-200/50">
              {/* Outer decorative dashed border */}
              <div className="absolute inset-0 border-[3px] border-dashed border-slate-200/80 rounded-[3rem] pointer-events-none -m-4"></div>
              {/* Inner decorative solid border */}
              <div className="absolute inset-0 rounded-[3rem] border-[6px] border-slate-50 pointer-events-none"></div>

              {/* Decorative Opening Double Quote — Overlapping the top-left outer dashed border curve */}
              <div className="absolute -top-7 -left-5 sm:-top-8 sm:-left-7 z-30 pointer-events-none text-[#F87171] drop-shadow-sm select-none">
                <svg width="56" height="44" viewBox="0 0 64 50" fill="currentColor">
                  {/* Bulb at top, tail sweeps down and curves LEFT (Open quote 66) */}
                  <path d="M16 4 C24 4 29 9.5 29 17 C29 23.5 24 28 17 28 C16.5 28 16 27.9 15.5 27.8 C17 33.5 21 38 27 41 C25 43.5 22 45 18 45 C9 41 3 31.5 3 20 C3 10.5 9 4 16 4 Z" />
                  <path d="M48 4 C56 4 61 9.5 61 17 C61 23.5 56 28 49 28 C48.5 28 48 27.9 47.5 27.8 C49 33.5 53 38 59 41 C57 43.5 54 45 50 45 C41 41 35 31.5 35 20 C35 10.5 41 4 48 4 Z" />
                </svg>
              </div>

              {/* Decorative Closing Double Quote — Overlapping the bottom-right outer dashed border curve */}
              <div className="absolute -bottom-7 -right-5 sm:-bottom-8 sm:-right-7 z-30 pointer-events-none text-[#F87171] drop-shadow-sm select-none">
                <svg width="56" height="44" viewBox="0 0 64 50" fill="currentColor" className="transform scale-x-[-1]">
                  {/* Flipped so bulb at top, tail sweeps down and curves RIGHT (Close quote 99) */}
                  <path d="M16 4 C24 4 29 9.5 29 17 C29 23.5 24 28 17 28 C16.5 28 16 27.9 15.5 27.8 C17 33.5 21 38 27 41 C25 43.5 22 45 18 45 C9 41 3 31.5 3 20 C3 10.5 9 4 16 4 Z" />
                  <path d="M48 4 C56 4 61 9.5 61 17 C61 23.5 56 28 49 28 C48.5 28 48 27.9 47.5 27.8 C49 33.5 53 38 59 41 C57 43.5 54 45 50 45 C41 41 35 31.5 35 20 C35 10.5 41 4 48 4 Z" />
                </svg>
              </div>
              
              <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 xl:p-16 overflow-hidden relative">
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-maroon-50/30 pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                  
                  {/* Left Side: Colorful Image Mosaic Layout */}
                  <div className="relative h-[600px] w-full hidden lg:block">
                    {/* Decorative Background Shapes */}
                    <div className="absolute top-[10%] left-[5%] w-[50%] h-[60%] bg-amber-400 rounded-[3rem] transform -rotate-6"></div>
                    <div className="absolute bottom-[10%] right-[10%] w-[35%] h-[35%] bg-sky-400 rounded-full"></div>
                    
                    {/* Central Vertical Pill Image */}
                    <div className="absolute top-[5%] left-[30%] w-[40%] h-[90%] rounded-[4rem] overflow-hidden border-8 border-white shadow-xl z-20">
                      <Image
                        src="/images/mosaic/students-collab.webp"
                        alt="Students collaborating"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Left Floating Pill Image */}
                    <div className="absolute top-[30%] left-0 w-[35%] h-[40%] rounded-[3rem] overflow-hidden border-[6px] border-white shadow-lg z-10">
                      <Image
                        src="/images/mosaic/student-floating-left.webp"
                        alt="Student"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Right Floating Pill Image */}
                    <div className="absolute top-[20%] right-[5%] w-[35%] h-[45%] rounded-[3rem] overflow-hidden border-[6px] border-white shadow-lg z-10">
                      <Image
                        src="/images/mosaic/developer-floating-right.webp"
                        alt="Developer"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Floating Avatars / Accents */}
                    <div className="absolute bottom-[20%] left-[10%] w-20 h-20 rounded-full overflow-hidden border-[5px] border-emerald-400 z-30 shadow-md animate-float">
                      <Image
                        src="/images/avatars/avatar-3.webp"
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-[15%] right-[15%] w-16 h-16 rounded-full overflow-hidden border-[5px] border-amber-400 z-30 shadow-md animate-float" style={{ animationDelay: '1.5s' }}>
                      <Image
                        src="/images/avatars/avatar-5.webp"
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Side: Contact Form */}
                  <div className="relative z-10">
                    <ContactForm />
                  </div>
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
