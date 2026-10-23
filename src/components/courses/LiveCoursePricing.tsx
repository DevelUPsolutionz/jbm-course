"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Course } from "@/types";
import { Sparkles } from "lucide-react";

interface LiveCoursePricingProps {
  slug: string;
  initialFee: number;
  initialActualFee?: number;
  initialDiscountPercent?: number;
  currency?: string;
  variant: "card" | "badge";
}

export function LiveCoursePricing({
  slug,
  initialFee,
  initialActualFee,
  initialDiscountPercent,
  currency = "INR",
  variant,
}: LiveCoursePricingProps) {
  const [fee, setFee] = useState(initialFee);
  const [actualFee, setActualFee] = useState(initialActualFee || initialFee * 2);
  const [discountPercent, setDiscountPercent] = useState(
    initialDiscountPercent !== undefined
      ? initialDiscountPercent
      : initialActualFee && initialActualFee > initialFee
      ? Math.round(((initialActualFee - initialFee) / initialActualFee) * 100)
      : 50
  );

  useEffect(() => {
    let isMounted = true;

    const syncFreshPrice = async () => {
      try {
        const res = await fetch(`/api/courses?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.courses && Array.isArray(data.courses)) {
          const fresh = data.courses.find((c: Course) => c.slug === slug);
          if (fresh) {
            setFee(fresh.fee);
            if (fresh.actualFee) setActualFee(fresh.actualFee);
            if (fresh.discountPercent !== undefined) {
              setDiscountPercent(fresh.discountPercent);
            } else if (fresh.actualFee && fresh.actualFee > fresh.fee) {
              setDiscountPercent(Math.round(((fresh.actualFee - fresh.fee) / fresh.actualFee) * 100));
            }
          }
        }
      } catch {
        // Silent fallback
      }
    };

    // 1. Fetch immediately
    syncFreshPrice();

    // 2. Poll every 10 seconds silently
    const intervalId = setInterval(syncFreshPrice, 10000);

    // 3. Tab focus & visibility change listener
    const onFocus = () => syncFreshPrice();
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        syncFreshPrice();
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slug]);

  if (variant === "badge") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-maroon-50 text-maroon-800 border border-maroon-200 shadow-sm transition-all">
        <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
        {discountPercent}% INAUGURAL OFFER
      </span>
    );
  }

  return (
    <div>
      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
        Inaugural Discount Fee
      </span>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-3xl font-extrabold text-slate-900 transition-all">
          {formatCurrency(fee, currency)}
        </span>
        {actualFee && actualFee > fee && (
          <span className="text-xs text-slate-400 line-through transition-all">
            {formatCurrency(actualFee, currency)}
          </span>
        )}
      </div>
    </div>
  );
}
