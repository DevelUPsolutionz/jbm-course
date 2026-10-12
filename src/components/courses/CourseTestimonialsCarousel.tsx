"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { CourseTestimonial } from "@/config/testimonials";

interface CourseTestimonialsCarouselProps {
  testimonials: CourseTestimonial[];
  courseTitle: string;
}

export function CourseTestimonialsCarousel({
  testimonials,
  courseTitle,
}: CourseTestimonialsCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Chunk testimonials into sets of 3 for desktop
  const chunkSize = 3;
  const pages: CourseTestimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += chunkSize) {
    pages.push(testimonials.slice(i, i + chunkSize));
  }
  const totalPages = pages.length;

  // Auto-play timer (slides smoothly every 3.5 seconds continuously)
  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3500);

    return () => clearInterval(interval);
  }, [totalPages]);

  if (!testimonials || testimonials.length === 0) return null;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-t border-slate-200/80 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-maroon-50/50 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-50 text-maroon-800 border border-maroon-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
            <span>Student Feedback & Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Learners Say About{" "}
            <span className="text-maroon-800 font-serif italic">{courseTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Real feedback from participants who completed this program
          </p>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Carousel Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {pages.map((group, pageIdx) => (
                <div
                  key={pageIdx}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 px-1 py-1"
                >
                  {group.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                    >
                      <div>
                        {/* Rating & Quote Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{item.rating.toFixed(1)}/5</span>
                          </div>
                          <Quote className="w-6 h-6 text-maroon-200 group-hover:text-maroon-400 transition-colors" />
                        </div>

                        {/* Review Quote Content */}
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                          &ldquo;{item.content}&rdquo;
                        </p>
                      </div>

                      {/* Author Details */}
                      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maroon-800 to-maroon-950 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                          {item.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                            {item.affiliation}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls: Arrows (Desktop) & Clickable Dots */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4">
            {/* Prev Arrow */}
            {totalPages > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonials"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-maroon-300 text-slate-700 hover:text-maroon-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                {pages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setCurrentPage(dotIdx)}
                    aria-label={`Go to testimonial page ${dotIdx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      currentPage === dotIdx
                        ? "w-8 h-2.5 bg-maroon-800 shadow-sm"
                        : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Next Arrow */}
            {totalPages > 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonials"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-maroon-300 text-slate-700 hover:text-maroon-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
