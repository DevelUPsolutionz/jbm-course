"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Course } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { InteractiveGlowCard } from "@/components/ui/InteractiveGlowCard";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link 
      href={`/courses/${course.slug}`} 
      className="group block"
    >
      <InteractiveGlowCard
        glowColor="rgba(128, 0, 32, 0.14)"
        className="flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-maroon-300 transition-all duration-300 hover:-translate-y-2"
      >
        {/* Course Banner Container — Aspect 1024/384 fits official JBM banners with zero cropping */}
        <div className="relative w-full aspect-[1024/384] bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 overflow-hidden border-b border-slate-100">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            className="object-contain sm:object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-grow p-5 sm:p-6">
          {/* Duration, Lessons & Level Badge */}
          <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-maroon-800 mb-3 uppercase tracking-wider">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span>{course.duration}</span>
              <span className="w-1 h-1 rounded-full bg-maroon-300" />
              <span>15+ Lessons</span>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold tracking-wide rounded-full border border-slate-200">
              {course.level}
            </span>
          </div>

          {/* Course Title */}
          <h3 className="text-lg font-bold text-slate-900 leading-snug mb-1 group-hover:text-maroon-800 transition-colors line-clamp-2">
            {course.title}
          </h3>
          {course.tagline && (
            <p className="text-xs font-serif italic text-maroon-800 mb-2.5 font-semibold line-clamp-1">
              {course.tagline}
            </p>
          )}
          
          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {course.shortDescription}
          </p>

          <div className="mt-auto">
            {/* Reviews */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">(150+ Learners)</span>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex flex-col">
                {course.actualFee && course.actualFee > course.fee && (
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[11px] font-semibold text-slate-400 line-through">
                      {formatCurrency(course.actualFee, course.currency)}
                    </span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {course.discountPercent || Math.round(((course.actualFee - course.fee) / course.actualFee) * 100)}% OFF
                    </span>
                  </div>
                )}
                <span className="text-lg font-black text-slate-900">
                  {formatCurrency(course.fee, course.currency)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-maroon-800 group-hover:text-maroon-900">
                  Enroll
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-maroon-800 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </InteractiveGlowCard>
    </Link>
  );
}
