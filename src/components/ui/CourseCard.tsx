import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Course } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link 
      href={`/courses/${course.slug}`} 
      className="group flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-maroon-300 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Category/Level Tag (Top Right) */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 bg-white/95 backdrop-blur-sm text-slate-800 shadow-sm text-[10px] font-bold tracking-wide rounded-full">
            {course.level}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Duration & Lessons */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-maroon-800 mb-3 uppercase tracking-wider">
          <span>{course.duration} Cohort</span>
          <span className="w-1 h-1 rounded-full bg-maroon-300" />
          <span>15+ Lessons</span>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-maroon-800 transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4">
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
            <span className="text-xs text-slate-500 font-medium">(152 Reviews)</span>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex flex-col">
              {course.actualFee && (
                <span className="text-[11px] font-semibold text-slate-400 line-through">
                  {formatCurrency(course.actualFee, course.currency)}
                </span>
              )}
              <span className="text-lg font-black text-slate-900">
                {formatCurrency(course.fee, course.currency)}
              </span>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-maroon-800 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
