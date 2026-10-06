"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  Tag,
  Save,
  CheckCircle2,
  AlertCircle,
  Percent,
  RefreshCw,
  Eye,
  TrendingDown,
  Pencil,
  X,
  Check,
} from "lucide-react";
import { Course } from "@/types";

interface CoursePricingState {
  slug: string;
  title: string;
  actualFee: number;
  discountPercent: number;
  fee: number;
  duration: string;
  level: string;
  // Backup state for cancel
  originalActualFee: number;
  originalDiscountPercent: number;
  originalFee: number;
  // UI states
  isEditing?: boolean;
  saving?: boolean;
  savedSuccess?: boolean;
  error?: string | null;
}

export default function AdminCoursePricingPage() {
  const [courses, setCourses] = useState<CoursePricingState[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalMessage, setGlobalMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/courses", { cache: "no-store" });
      const data = await res.json();
      if (data.courses && Array.isArray(data.courses)) {
        setCourses(
          data.courses.map((c: Course) => {
            const actualFee = c.actualFee || 20000;
            const fee = c.fee || 10000;
            const calculatedDiscount =
              c.discountPercent !== undefined && c.discountPercent !== null
                ? c.discountPercent
                : actualFee > 0
                ? Math.round(((actualFee - fee) / actualFee) * 100)
                : 50;
            const discountPercent = Math.max(0, Math.min(100, calculatedDiscount));

            return {
              slug: c.slug,
              title: c.title,
              actualFee,
              discountPercent,
              fee,
              duration: c.duration,
              level: c.level,
              originalActualFee: actualFee,
              originalDiscountPercent: discountPercent,
              originalFee: fee,
              isEditing: false,
            };
          })
        );
      }
    } catch (err: any) {
      console.error("Failed to load courses:", err);
      setGlobalMessage({ type: "error", text: "Failed to load courses. Please refresh." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleStartEdit = (slug: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.slug === slug
          ? {
              ...c,
              isEditing: true,
              originalActualFee: c.actualFee,
              originalDiscountPercent: c.discountPercent,
              originalFee: c.fee,
              savedSuccess: false,
              error: null,
            }
          : c
      )
    );
  };

  const handleCancelEdit = (slug: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.slug === slug
          ? {
              ...c,
              isEditing: false,
              actualFee: c.originalActualFee,
              discountPercent: c.originalDiscountPercent,
              fee: c.originalFee,
              error: null,
            }
          : c
      )
    );
  };

  const handleActualFeeChange = (slug: string, newActualFee: number) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.slug === slug) {
          const actualFee = Math.max(0, newActualFee);
          const fee = Math.round(actualFee * (1 - c.discountPercent / 100));
          return { ...c, actualFee, fee, error: null };
        }
        return c;
      })
    );
  };

  const handleDiscountPercentChange = (slug: string, newPercent: number) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.slug === slug) {
          const discountPercent = Math.max(0, Math.min(100, newPercent));
          const fee = Math.round(c.actualFee * (1 - discountPercent / 100));
          return { ...c, discountPercent, fee, error: null };
        }
        return c;
      })
    );
  };

  const handleFinalFeeChange = (slug: string, newFee: number) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.slug === slug) {
          const fee = Math.max(0, newFee);
          const discountPercent =
            c.actualFee > 0 ? Math.max(0, Math.min(100, Math.round(((c.actualFee - fee) / c.actualFee) * 100))) : 0;
          return { ...c, fee, discountPercent, error: null };
        }
        return c;
      })
    );
  };

  const handleSaveCourse = async (slug: string) => {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return;

    setCourses((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, saving: true, error: null } : c))
    );

    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: course.slug,
          actualFee: course.actualFee,
          discountPercent: course.discountPercent,
          fee: course.fee,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to update pricing");
      }

      setCourses((prev) =>
        prev.map((c) =>
          c.slug === slug
            ? {
                ...c,
                saving: false,
                isEditing: false, // Exit edit mode
                savedSuccess: true,
                originalActualFee: c.actualFee,
                originalDiscountPercent: c.discountPercent,
                originalFee: c.fee,
                error: null,
              }
            : c
        )
      );

      setGlobalMessage({
        type: "success",
        text: `Pricing for "${course.title}" updated successfully! Live website reflects this immediately.`,
      });

      setTimeout(() => {
        setCourses((prev) =>
          prev.map((c) => (c.slug === slug ? { ...c, savedSuccess: false } : c))
        );
      }, 4000);
    } catch (err: any) {
      setCourses((prev) =>
        prev.map((c) =>
          c.slug === slug
            ? { ...c, saving: false, error: err.message || "Failed to save changes" }
            : c
        )
      );
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center shadow-sm">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Course Pricing & Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage original prices, discounts (%), and final offer prices for all 3 official programs.
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={fetchCourses}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Global alert toast */}
      {globalMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all ${
            globalMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {globalMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span>{globalMessage.text}</span>
          </div>
          <button
            onClick={() => setGlobalMessage(null)}
            className="text-xs font-bold uppercase hover:underline opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 3 Course Pricing Cards Grid */}
      {loading && courses.length === 0 ? (
        <div className="p-16 text-center">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-slate-500">Loading course pricing catalog...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {courses.map((course, idx) => {
            const savings = course.actualFee - course.fee;
            const isEditing = !!course.isEditing;

            const themeColors =
              idx === 0
                ? {
                    accent: "from-sky-500 to-blue-600",
                    badge: "bg-sky-50 text-sky-700 border-sky-200",
                    border: isEditing ? "border-sky-400 ring-2 ring-sky-400/20 shadow-xl" : "border-slate-200 hover:border-slate-300",
                    glow: "shadow-sky-500/10",
                  }
                : idx === 1
                ? {
                    accent: "from-rose-500 to-pink-600",
                    badge: "bg-rose-50 text-rose-700 border-rose-200",
                    border: isEditing ? "border-rose-400 ring-2 ring-rose-400/20 shadow-xl" : "border-slate-200 hover:border-slate-300",
                    glow: "shadow-rose-500/10",
                  }
                : {
                    accent: "from-emerald-500 to-teal-600",
                    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    border: isEditing ? "border-emerald-400 ring-2 ring-emerald-400/20 shadow-xl" : "border-slate-200 hover:border-slate-300",
                    glow: "shadow-emerald-500/10",
                  };

            return (
              <div
                key={course.slug}
                className={`bg-white rounded-3xl border ${themeColors.border} shadow-lg ${themeColors.glow} overflow-hidden flex flex-col transition-all duration-300`}
              >
                {/* Top Accent Bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${themeColors.accent}`} />

                <div className="p-6 space-y-5">
                  {/* Card Header with Program Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${themeColors.badge}`}
                      >
                        Program 0{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-medium">{course.slug}</span>
                    </div>

                    <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {course.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {course.duration} • {course.level}
                    </p>
                  </div>

                  {/* Card Body: Read View Mode OR Edit Mode */}
                  {!isEditing ? (
                    /* ─── READ / VIEW MODE (Clean, No Duplicate Buttons) ─── */
                    <div className="space-y-4 pt-3 border-t border-slate-100">
                      {/* Pricing Summary Box */}
                      <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 relative overflow-hidden shadow-inner">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                            <Eye className="w-3.5 h-3.5 text-amber-400" />
                            <span>Current Pricing</span>
                          </span>
                          {course.discountPercent > 0 && (
                            <span className="bg-emerald-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                              {course.discountPercent}% OFF
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-2.5 pt-1">
                          {course.actualFee > course.fee && (
                            <span className="text-sm text-slate-400 line-through font-semibold">
                              {formatCurrency(course.actualFee, "INR")}
                            </span>
                          )}
                          <span className="text-3xl font-black text-white tracking-tight">
                            {formatCurrency(course.fee, "INR")}
                          </span>
                        </div>

                        {savings > 0 && (
                          <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
                            <TrendingDown className="w-3.5 h-3.5" />
                            <span>Learner saves {formatCurrency(savings, "INR")} with this offer</span>
                          </p>
                        )}
                      </div>

                      {/* Single, Clear Edit Button */}
                      <div className="pt-1">
                        <button
                          onClick={() => handleStartEdit(course.slug)}
                          className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md"
                        >
                          <Pencil className="w-4 h-4 text-amber-400" />
                          <span>Edit Pricing</span>
                        </button>
                      </div>

                      {course.savedSuccess && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Pricing updated live on site!</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* ─── EDIT MODE (Clean & Compact) ─── */
                    <div className="space-y-4 pt-3 border-t border-slate-100">
                      {/* 1. Original Price Input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Original Price (₹)</span>
                          <span className="text-[10px] text-slate-400 font-normal">Strikethrough</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-slate-400 pointer-events-none">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="500"
                            value={course.actualFee}
                            onChange={(e) =>
                              handleActualFeeChange(course.slug, parseFloat(e.target.value) || 0)
                            }
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-xs"
                          />
                        </div>
                      </div>

                      {/* 2. Discount Percentage */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Percent className="w-3.5 h-3.5 text-brand-600" />
                            <span>Discount (%)</span>
                          </span>
                          <span className="text-xs font-extrabold text-emerald-600">
                            {course.discountPercent}% OFF
                          </span>
                        </label>

                        <div className="flex items-center gap-2.5">
                          <input
                            type="range"
                            min="0"
                            max="90"
                            step="5"
                            value={course.discountPercent}
                            onChange={(e) =>
                              handleDiscountPercentChange(course.slug, parseInt(e.target.value) || 0)
                            }
                            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                          />
                          <div className="w-16 flex-shrink-0">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={course.discountPercent}
                              onChange={(e) =>
                                handleDiscountPercentChange(course.slug, parseInt(e.target.value) || 0)
                              }
                              className="w-full text-center px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                            />
                          </div>
                        </div>

                        {/* Quick discount preset chips */}
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {[0, 30, 40, 50, 60, 70].map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => handleDiscountPercentChange(course.slug, pct)}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${
                                course.discountPercent === pct
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {pct}%
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 3. Final Offer Price */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span className="text-emerald-700 font-extrabold">Final Offer Price (₹)</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">Checkout Price</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-emerald-600 pointer-events-none">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="100"
                            value={course.fee}
                            onChange={(e) =>
                              handleFinalFeeChange(course.slug, parseFloat(e.target.value) || 0)
                            }
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-emerald-400 text-base font-black text-emerald-700 bg-emerald-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Error & Feedback */}
                      {course.error && (
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{course.error}</span>
                        </div>
                      )}

                      {/* Action Buttons: Cancel & Save */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleCancelEdit(course.slug)}
                          disabled={course.saving}
                          className="w-1/3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>

                        <button
                          onClick={() => handleSaveCourse(course.slug)}
                          disabled={course.saving}
                          className="w-2/3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-98 disabled:opacity-50"
                        >
                          {course.saving ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
