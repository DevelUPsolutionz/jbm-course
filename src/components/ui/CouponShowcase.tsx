"use client";

import React, { useState } from "react";
import Link from "next/link";
import { JBM_COUPONS } from "@/config/coupons";
import { Tag, Copy, Check, Sparkles, Gift } from "lucide-react";

export function CouponShowcase() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  // Filter out referral-only coupons from public display
  const couponList = Object.values(JBM_COUPONS).filter((c) => !c.isReferral);

  return (
    <section id="coupons" className="py-20 sm:py-28 relative bg-gradient-to-b from-white via-maroon-50/20 to-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-maroon-800 bg-maroon-50 border border-maroon-200 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-maroon-800" />
            <span>Exclusive JBM Scholarships & Coupons</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Unlock Additional Instant Discounts
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Copy any of the 9 exclusive JBM coupon codes below and apply it during checkout for instant savings.
          </p>
        </div>

        {/* 10 Coupon Codes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {couponList.map((coupon) => (
            <div
              key={coupon.code}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                coupon.isReferral
                  ? "bg-maroon-900 text-white border-amber-400/50 shadow-lg shadow-maroon-950/20 col-span-1 sm:col-span-2 lg:col-span-1"
                  : "bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-maroon-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      coupon.isReferral
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                        : "bg-maroon-50 text-maroon-800 border border-maroon-200"
                    }`}
                  >
                    {coupon.discountPercentage}% OFF
                  </span>
                  {coupon.isReferral && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  )}
                </div>

                <div className="font-mono font-black text-lg tracking-wider mb-1">
                  {coupon.code}
                </div>

                <p
                  className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
                    coupon.isReferral ? "text-maroon-100" : "text-slate-600"
                  }`}
                >
                  {coupon.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100/10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    copiedCode === coupon.code
                      ? "bg-emerald-600 text-white"
                      : coupon.isReferral
                      ? "bg-white text-maroon-900 hover:bg-maroon-50"
                      : "bg-slate-100 text-slate-800 hover:bg-maroon-50 hover:text-maroon-800"
                  }`}
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Notice */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Have a special student or corporate coupon?</p>
              <p className="text-xs text-slate-600">Enter your code directly on the checkout screen for real-time validation.</p>
            </div>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-md shadow-maroon-900/20 transition-all whitespace-nowrap"
          >
            <span>Apply Coupon on Checkout</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
