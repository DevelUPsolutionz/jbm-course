import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { COURSES, getCourseBySlug } from "@/config/courses";
import { getDynamicCourseBySlug } from "@/lib/course-pricing";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { formatCurrency } from "@/lib/utils";
import {
  Clock,
  CheckCircle2,
  BookOpen,
  Users,
  Award,
  ArrowUpRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Tag,
  MessageCircle,
  CreditCard,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";

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

  const courseUrl = `${siteConfig.url}/courses/${course.slug}`;
  const courseKeywords = [
    course.title,
    `${course.title} Course`,
    `${course.title} Certification`,
    `${course.title} Training Coimbatore`,
    "Johanna Bright Mentors",
    "Live Mentorship Program",
    "Hands-on Lab Training",
  ];

  return {
    title: `${course.title} — Practical Hands-On Training`,
    description: course.shortDescription,
    keywords: courseKeywords,
    alternates: {
      canonical: courseUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: courseUrl,
      title: `${course.title} — ${siteConfig.name}`,
      description: course.shortDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: course.headerImageUrl || course.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: `${course.title} Program Banner - ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | ${siteConfig.name}`,
      description: course.shortDescription,
      images: [course.headerImageUrl || course.thumbnailUrl],
    },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const dynamicCourse = await getDynamicCourseBySlug(slug);
  const course = dynamicCourse || getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const phoneClean = siteConfig.contact.phone.replace(/[^0-9]/g, "");
  const whatsappLink = siteConfig.social.whatsapp;

  const courseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: {
          "@type": "EducationalOrganization",
          name: siteConfig.name,
          sameAs: siteConfig.url,
        },
        educationalLevel: course.level,
        courseCode: course.slug,
        offers: {
          "@type": "Offer",
          price: course.fee,
          priceCurrency: course.currency,
          category: "Tuition",
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}/courses/${course.slug}/enroll`,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: course.duration,
          instructor: {
            "@type": "Organization",
            name: "Johanna Bright Mentors Faculty",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Programs",
            item: `${siteConfig.url}/#courses`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: course.title,
            item: `${siteConfig.url}/courses/${course.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FFFDFB] to-white text-slate-900 selection:bg-maroon-800 selection:text-white">
      <JsonLd data={courseSchema} />
      <Header />

      <main className="flex-grow">
        {/* ==================================================================== */}
        {/* COURSE HERO SECTION (With Official Header Banner)                    */}
        {/* ==================================================================== */}
        <section className="relative pt-4 pb-12 sm:pt-6 sm:pb-16 border-b border-slate-200/80 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-maroon-100/40 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Back Navigation Button */}
            <div className="mb-4 sm:mb-5">
              <Link
                href="/#courses"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-700 bg-white/95 hover:bg-white border border-slate-200/90 shadow-xs hover:shadow-sm hover:text-maroon-800 hover:border-maroon-300 transition-all group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-maroon-800 group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Courses</span>
              </Link>
            </div>

            {/* 1. Official Course Page Header Banner (Wide, Ultra-Crisp, Instant Loading & Centered) */}
            {course.headerImageUrl && (
              <div className="mb-8 sm:mb-10 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group relative">
                <Image
                  src={course.headerImageUrl}
                  alt={`${course.title} Official Course Header Banner`}
                  width={2560}
                  height={960}
                  unoptimized={true}
                  priority
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            )}

            {/* Course Hero Details (Centered Layout on Desktop & Mobile) */}
            <div className="w-full max-w-4xl mx-auto space-y-5 sm:space-y-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-maroon-50 text-maroon-800 border border-maroon-200 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
                  {course.discountPercent || (course.actualFee > course.fee ? Math.round(((course.actualFee - course.fee) / course.actualFee) * 100) : 50)}% INAUGURAL OFFER
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-maroon-800" />
                  {course.duration}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                {course.title}
              </h1>

              {course.tagline && (
                <p className="text-sm sm:text-base lg:text-lg font-serif italic font-semibold text-maroon-800 tracking-wide">
                  {course.tagline}
                </p>
              )}

              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {course.description}
              </p>

              {/* Price & CTA Action Bar (Centered) */}
              <div className="pt-6 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      Inaugural Offer Fee
                    </span>
                    {course.actualFee && (
                      <span className="text-xs text-slate-400 line-through font-semibold">
                        {formatCurrency(course.actualFee, course.currency)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black text-maroon-800">
                      {formatCurrency(course.fee, course.currency)}
                    </span>
                    {course.actualFee && course.actualFee > course.fee && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {course.discountPercent || Math.round(((course.actualFee - course.fee) / course.actualFee) * 100)}% OFF
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/courses/${course.slug}/enroll`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-2xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-lg shadow-maroon-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Enroll Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-2xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Mentor</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>



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
                      <h2 className="text-xl font-bold text-slate-900">
                        Target Competencies & <span className="font-serif italic font-semibold text-maroon-800">Outcomes</span>
                      </h2>
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
                      <h2 className="text-xl font-bold text-slate-900">
                        Curriculum & <span className="font-serif italic font-semibold text-maroon-800">Weekly Roadmap</span>
                      </h2>
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
                  {/* Fully Visible Course Banner Image */}
                  <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 border border-slate-200 shadow-sm p-1 flex items-center justify-center">
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      width={600}
                      height={340}
                      className="w-full h-auto object-contain rounded-xl"
                      priority
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

                  {/* Referral Notice in Card */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Have a Referral Code? Apply it during enrollment.</span>
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
                      <span>Helpline:</span>
                      <a href={`tel:${phoneClean}`} className="font-bold text-maroon-800 hover:underline">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>
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
