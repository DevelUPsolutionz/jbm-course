import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { COURSES, getCourseBySlug } from "@/config/courses";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseEnrollmentForm } from "@/components/payment/CourseEnrollmentForm";
import { ArrowLeft, ShieldCheck, Sparkles, Lock } from "lucide-react";

interface CourseEnrollPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CourseEnrollPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `Enroll in ${course.title} — ${siteConfig.name}`,
    description: `Complete your official admission and payment for ${course.title}.`,
  };
}

export default async function CourseEnrollPage({ params }: CourseEnrollPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-maroon-800 selection:text-white">
      <Header />

      <main className="flex-grow py-12 sm:py-16 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-maroon-100/40 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Navigation Bar */}
          <div className="mb-8">
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-maroon-800 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {course.title} Details</span>
            </Link>
          </div>

          {/* Section Header */}
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-maroon-50 text-maroon-800 border border-maroon-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
              <span>OFFICIAL ADMISSION PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Enroll in {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Complete your registration below to reserve your seat in the upcoming cohort. Instant confirmation and onboarding credentials will be issued upon payment.
            </p>
          </div>

          {/* Dedicated Enrollment & Razorpay Payment Form */}
          <CourseEnrollmentForm course={course} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
