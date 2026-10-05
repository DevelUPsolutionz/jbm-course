import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "@/config/courses";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Clock, Layers, CheckCircle2, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Course Catalog | Admin",
};

export default function AdminCoursesPage() {
  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Course Catalog Configuration
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review active programs, syllabus modules, pricing, and video configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {COURSES.map((course) => (
          <div
            key={course.slug}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="p-6 space-y-4 flex-grow">
              <div className="flex justify-between items-start">
                <Badge variant="success">Active</Badge>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {course.slug}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{course.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {course.shortDescription}
              </p>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Fee:</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {formatCurrency(course.fee, course.currency)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Duration:</span>
                  <span className="font-semibold text-slate-800">{course.duration}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Syllabus Highlights ({course.syllabus.length} Modules):
                </span>
                {course.syllabus.slice(0, 3).map((s, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                    <span className="truncate">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <Link
                href={`/courses/${course.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <span>Preview Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400">src/config/courses.ts</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-sm text-blue-900 space-y-2">
        <h3 className="font-bold text-blue-950 flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          Centralized Course Content Architecture
        </h3>
        <p className="text-xs text-blue-800 leading-relaxed">
          Course data is maintained in a centralized, type-safe schema (`src/config/courses.ts`) and seeded into the Supabase database. You can edit course fees, syllabus topics, durations, and video URLs directly to trigger instant static revalidation across the site.
        </p>
      </div>
    </div>
  );
}
