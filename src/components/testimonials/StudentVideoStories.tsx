"use client";

import React, { useState } from "react";
import { Sparkles, Video } from "lucide-react";
import { StudentVideoCard, StudentVideoData } from "@/components/ui/StudentVideoCard";
import { DoodleSparkleStar } from "@/components/ui/DoodleArt";

export const STUDENT_VIDEOS: StudentVideoData[] = [
  {
    id: "feedback-1",
    studentName: "Rani",
    videoSrc: "/videos/student-feedback-1.mp4",
    duration: "1:18 min",
    category: "Spoken English Journey",
    highlight: "Overcame Stage Fear & Built English Fluency",
    feedbackQuote: "The practical speaking practice helped me speak English without hesitation in everyday situations.",
  },
  {
    id: "feedback-2",
    studentName: "Jeya",
    videoSrc: "/videos/student-feedback-2.mp4",
    duration: "1:24 min",
    category: "Spoken English Journey",
    highlight: "Professional Communication & Workplace Confidence",
    feedbackQuote: "Live mentor guidance gave me the right vocabulary and confidence to express my thoughts clearly.",
  },
];

interface StudentVideoStoriesProps {
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  showBg?: boolean;
}

export function StudentVideoStories({
  badge = "REAL STUDENT EXPERIENCES",
  titlePrefix = "Watch Real Journeys,",
  titleHighlight = "Real Confidence",
  subtitle = "Unfiltered video reviews from learners who developed fluency, overcame hesitation, and built speaking confidence with JBM.",
  showBg = true,
}: StudentVideoStoriesProps) {
  // Single active playing video state:
  // When one video plays, any previously playing video is automatically paused!
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section className={`w-full py-14 sm:py-18 relative overflow-hidden ${showBg ? "bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with JBM Unique Signature Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 relative">
          {/* Subtle Decorative Doodle Sparkle on Top-Right */}
          <div className="absolute -top-6 right-2 sm:right-10 pointer-events-none opacity-90 hidden sm:block">
            <DoodleSparkleStar className="w-8 h-8 text-emerald-400" />
          </div>

          {/* Section Pill Badge */}
          <span className="text-xs font-extrabold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3.5 py-1.5 rounded-full border border-maroon-200">
            {badge}
          </span>

          {/* Main Heading with Serif Italic Accent */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {titlePrefix}{" "}
            <span className="text-rose-600 font-serif italic font-semibold">
              {titleHighlight}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* 2 Landscape 16:9 Video Cards in Wide Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto items-stretch">
          {STUDENT_VIDEOS.map((video) => (
            <StudentVideoCard
              key={video.id}
              video={video}
              activeVideoId={activeVideoId}
              onPlay={(id) => setActiveVideoId(id)}
            />
          ))}
        </div>

        {/* Bottom Assurance Note */}
        <div className="text-center mt-10">
          <p className="text-xs text-slate-500 font-medium inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>100% Genuine, Unedited Student Testimonials</span>
          </p>
        </div>
      </div>
    </section>
  );
}
