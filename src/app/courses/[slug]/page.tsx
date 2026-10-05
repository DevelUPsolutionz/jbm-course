import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { COURSES, getCourseBySlug } from "@/config/courses";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { formatCurrency } from "@/lib/utils";
import {
  Clock,
  CheckCircle2,
  BookOpen,
  Users,
  Award,
  ArrowUpRight,
  Sparkles,
  Layers,
  Tag,
  MessageCircle,
  FileText,
  CreditCard,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} — ${siteConfig.name}`,
    description: course.shortDescription,
    openGraph: {
      title: `${course.title} | ${siteConfig.name}`,
      description: course.shortDescription,
      images: [{ url: course.thumbnailUrl }],
    },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const phoneClean = siteConfig.contact.phone.replace(/[^0-9]/g, "");
  const whatsappLink = `https://wa.me/91${phoneClean}?text=Hello%20JBM,%20I%20am%20interested%20in%20enrolling%20in%20${encodeURIComponent(
    course.title
  )}`;

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-maroon-800 selection:text-white">
      <Header />

      <main className="flex-grow">
        {/* ==================================================================== */}
        {/* COURSE HERO SECTION (With Official Header Banner)                    */}
        {/* ==================================================================== */}
        <section className="relative pt-6 pb-16 sm:pt-8 sm:pb-20 border-b border-slate-200 bg-gradient-to-b from-maroon-50/40 via-white to-white overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-maroon-100/40 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* 1. Official Course Page Header Banner */}
            {course.headerImageUrl && (
              <div className="mb-10 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group relative">
                <Image
                  src={course.headerImageUrl}
                  alt={`${course.title} Official Course Header Banner`}
                  width={1600}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  priority
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-maroon-50 text-maroon-800 border border-maroon-200 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
                    50% INAUGURAL OFFER
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-maroon-800" />
                    {course.duration}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  {course.title}
                </h1>

                {course.tagline && (
                  <p className="text-base sm:text-lg font-bold text-maroon-800">
                    {course.tagline}
                  </p>
                )}

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  {course.description}
                </p>

                {/* Price & CTA Action Bar */}
                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Inaugural Offer Fee
                      </span>
                      {course.actualFee && (
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          {formatCurrency(course.actualFee, course.currency)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-maroon-800">
                        {formatCurrency(course.fee, course.currency)}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        50% OFF
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/courses/${course.slug}/enroll`}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-lg shadow-maroon-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Enroll</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Mentor</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Dedicated Video Preview Dock */}
              <div className="lg:col-span-5">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Interactive Video Briefing
                  </span>
                  <VideoEmbed
                    videoUrl={course.introVideoUrl}
                    title={course.title}
                    thumbnailUrl={course.thumbnailUrl}
                    aspectRatio="16/9"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* OFFICIAL FLYER POSTER SHOWCASE — Full View Without Any Cropping     */}
        {/* ==================================================================== */}
        {course.posterUrl && (
          <section className="py-14 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-6 sm:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 flex flex-col lg:flex-row items-center gap-10">
                {/* Full Uncropped High-Res Poster Frame */}
                <div className="w-full lg:w-5/12 max-w-md bg-white p-3 rounded-3xl border-2 border-slate-200 shadow-xl group">
                  <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950/5 flex items-center justify-center">
                    <Image
                      src={course.posterUrl}
                      alt={`${course.title} Official Brochure Poster`}
                      width={800}
                      height={1200}
                      className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                      priority
                    />
                  </div>
                  <div className="pt-3 text-center">
                    <a
                      href={course.posterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:text-maroon-900 hover:underline"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Click to Open Full High-Res Flyer in New Tab</span>
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-7/12 space-y-5">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-maroon-800 bg-maroon-50 border border-maroon-200 shadow-sm">
                    <FileText className="w-3.5 h-3.5 text-maroon-800" />
                    <span>Official JBM Program Brochure</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    Structured Curriculum from Johanna Bright Mentors
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This certification follows the verified curriculum structured by JBM faculty, featuring practical labs, portfolio projects, and direct doubt clearing on WhatsApp and live webinars.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs shadow-sm">
                      <span className="text-slate-400 block font-semibold">Standard Tuition:</span>
                      <span className="font-bold text-slate-800 line-through text-sm">
                        {course.actualFee ? formatCurrency(course.actualFee, course.currency) : "—"}
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-maroon-50 border border-maroon-200 text-xs shadow-sm">
                      <span className="text-maroon-800 block font-bold">Limited Inaugural Offer:</span>
                      <span className="font-black text-maroon-900 text-base">
                        {formatCurrency(course.fee, course.currency)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/courses/${course.slug}/enroll`}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-md transition-all hover:scale-105"
                    >
                      <span>Enroll</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================================================================== */}
        {/* SYLLABUS & CURRICULUM BENTO GRID (Maroon & White) */}
        {/* ==================================================================== */}
        <section className="py-16 sm:py-24 relative bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left 2 Cols: Learning Outcomes & Weekly Syllabus */}
              <div className="lg:col-span-2 space-y-10">
                {/* Learning Outcomes */}
                <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-maroon-50 border border-maroon-200 text-maroon-800 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Target Competencies & Outcomes</h2>
                      <p className="text-xs text-slate-500">What you will master during this {course.duration} training</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comprehensive Syllabus */}
                <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-maroon-50 border border-maroon-200 text-maroon-800 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Curriculum & Weekly Roadmap</h2>
                      <p className="text-xs text-slate-500">Modular syllabus designed with practical lab projects</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {course.syllabus.map((mod, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-maroon-300 transition-colors space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-maroon-800 uppercase tracking-wider bg-maroon-50 px-2.5 py-0.5 rounded-lg border border-maroon-200">
                            {mod.week}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex-grow sm:flex-grow-0">
                            {mod.title}
                          </h3>
                        </div>
                        <ul className="space-y-2 pl-2 text-xs text-slate-600">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="text-maroon-800 font-bold">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites & Audience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-maroon-800" />
                      Target Audience
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {course.targetAudience.map((aud, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-maroon-800 font-bold">•</span>
                          <span>{aud}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-maroon-800" />
                      Prerequisites
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {course.prerequisites.map((pre, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{pre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Col: Sticky Enrollment Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 p-6 sm:p-7 space-y-6">
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      Inaugural Discount Fee
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold text-slate-900">
                        {formatCurrency(course.fee, course.currency)}
                      </span>
                      {course.actualFee && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatCurrency(course.actualFee, course.currency)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Coupon Notice in Card */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Apply coupon codes like <strong>JBM50K2L</strong> for extra savings on checkout!</span>
                  </div>

                  <Link
                    href={`/courses/${course.slug}/enroll`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-md shadow-maroon-900/25 transition-all text-center hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Enroll</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center justify-between">
                      <span>Duration:</span>
                      <span className="font-bold text-slate-900">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Format:</span>
                      <span className="font-bold text-slate-900">Live Online + Practical Labs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Certification:</span>
                      <span className="font-bold text-slate-900">JBM Verified Certificate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Methods:</span>
                      <span className="font-bold text-slate-900">UPI, Cards, NetBanking</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Helpline:</span>
                      <a href={`tel:${phoneClean}`} className="font-bold text-maroon-800 hover:underline">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Instructor Bio Card */}
                  {course.instructor && (
                    <div className="border-t border-slate-100 pt-4">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                        Lead Mentor
                      </span>
                      <div className="flex items-center gap-3">
                        {course.instructor.avatarUrl && (
                          <div className="relative w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm">
                            <Image
                              src={course.instructor.avatarUrl}
                              alt={course.instructor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-slate-900">{course.instructor.name}</p>
                          <p className="text-xs text-maroon-800 font-semibold">{course.instructor.role}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        {course.instructor.bio}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
