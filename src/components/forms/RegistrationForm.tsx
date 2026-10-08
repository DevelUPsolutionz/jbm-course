"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { COURSES } from "@/config/courses";
import { registrationSchema } from "@/lib/validations/registration";
import { formatCurrency } from "@/lib/utils";
import { validateReferralCode, calculateDiscountedPrice, ReferralCode } from "@/config/coupons";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Lock,
  Sparkles,
  Tag,
  Check,
  X,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Building2,
} from "lucide-react";
import { RazorpayCheckout } from "@/components/payment/RazorpayCheckout";

interface RegistrationFormProps {
  initialCourseSlug?: string;
}

export function RegistrationForm({ initialCourseSlug }: RegistrationFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryCourse = searchParams?.get("course") || initialCourseSlug || "artificial-intelligence";
  const queryCoupon = searchParams?.get("coupon") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseSlug: queryCourse,
    message: "",
    termsAccepted: true,
  });

  const [couponInput, setCouponInput] = useState(queryCoupon);
  const [appliedCoupon, setAppliedCoupon] = useState<ReferralCode | null>(
    queryCoupon ? validateReferralCode(queryCoupon) : null
  );
  const [couponError, setCouponError] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [createdOrderData, setCreatedOrderData] = useState<{
    orderId: string;
    amount: number;
    currency: string;
    registrationReference: string;
    keyId: string;
    courseTitle: string;
    userName: string;
    userEmail: string;
    userPhone: string;
  } | null>(null);

  const selectedCourse =
    COURSES.find((c) => c.slug === formData.courseSlug) || COURSES[0];

  const priceCalculation = calculateDiscountedPrice(
    selectedCourse.fee,
    appliedCoupon?.code
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);

    if (!couponInput.trim()) {
      setAppliedCoupon(null);
      return;
    }

    const validated = validateReferralCode(couponInput.trim());
    if (!validated) {
      setCouponError("Coupon invalid");
      setAppliedCoupon(null);
    } else {
      setAppliedCoupon(validated);
      setCouponError(null);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponInput("");
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const payload = {
      ...formData,
      couponCode: appliedCoupon?.code,
    };

    const result = registrationSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit registration to API
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit registration");
      }

      // 2. Initiate payment order creation
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationReference: json.registrationReference,
          courseSlug: formData.courseSlug,
          couponCode: appliedCoupon?.code,
        }),
      });

      const orderJson = await orderRes.json();

      if (!orderRes.ok) {
        router.push(`/register/success?ref=${json.registrationReference}&pay=pending`);
        return;
      }

      // If 100% scholarship / referral coupon, immediate free admission
      if (orderJson.isFree) {
        router.push(
          `/register/success?ref=${json.registrationReference}&status=vip_free&course=${formData.courseSlug}`
        );
        return;
      }

      setCreatedOrderData({
        orderId: orderJson.orderId,
        amount: orderJson.amount,
        currency: orderJson.currency,
        registrationReference: json.registrationReference,
        keyId: orderJson.keyId,
        courseTitle: selectedCourse.title,
        userName: formData.fullName,
        userEmail: formData.email,
        userPhone: formData.phone,
      });
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
      {/* Step 2: Payment Modal State */}
      {createdOrderData ? (
        <div className="p-8 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 bg-maroon-50 border border-maroon-200 rounded-2xl flex items-center justify-center mx-auto text-maroon-800 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-maroon-800">
              Step 2 of 2: Secure Payment
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Finalize Your Admission
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Registration Reference:{" "}
              <strong className="text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {createdOrderData.registrationReference}
              </strong>
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 text-left border border-slate-200 space-y-2.5 max-w-md mx-auto text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Selected Program:</span>
              <span className="font-semibold text-slate-900 text-right">
                {createdOrderData.courseTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Candidate:</span>
              <span className="font-semibold text-slate-900">{createdOrderData.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-semibold text-slate-900">{createdOrderData.userEmail}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Referral Code:</span>
                <span>{appliedCoupon.code} ({appliedCoupon.staffName})</span>
              </div>
            )}
            <div className="pt-3 border-t border-slate-200 flex justify-between text-sm sm:text-base font-bold">
              <span className="text-slate-900">Total Payable:</span>
              <span className="text-maroon-800">
                {formatCurrency(createdOrderData.amount / 100, createdOrderData.currency)}
              </span>
            </div>
          </div>

          {/* Supported Methods Icons Bar */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 max-w-md mx-auto py-2 px-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-maroon-800" />
              <span>UPI / QR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-maroon-800" />
              <span>Cards</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-maroon-800" />
              <span>NetBanking</span>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <RazorpayCheckout orderData={createdOrderData} />
          </div>

          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            256-bit SSL encrypted Razorpay checkout.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6" noValidate>
          {serverError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Legal Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.fullName
                    ? "border-red-400 focus:ring-red-400/40 bg-red-50/20"
                    : "border-slate-300 focus:border-maroon-800 focus:ring-maroon-800/20"
                }`}
                required
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-600 font-medium mt-1">{errors.fullName}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400/40 bg-red-50/20"
                    : "border-slate-300 focus:border-maroon-800 focus:ring-maroon-800/20"
                }`}
                required
              />
            </div>
            {errors.email && <p className="text-xs text-red-600 font-medium mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone / WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 87785 78437"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? "border-red-400 focus:ring-red-400/40 bg-red-50/20"
                    : "border-slate-300 focus:border-maroon-800 focus:ring-maroon-800/20"
                }`}
                required
              />
            </div>
            {errors.phone && <p className="text-xs text-red-600 font-medium mt-1">{errors.phone}</p>}
          </div>

          {/* Selected Course */}
          <div>
            <label htmlFor="courseSlug" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Course Track <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <select
                id="courseSlug"
                name="courseSlug"
                value={formData.courseSlug}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:border-maroon-800 focus:ring-maroon-800/20"
              >
                {COURSES.map((course) => (
                  <option key={course.slug} value={course.slug}>
                    {course.title} ({course.duration}) — {formatCurrency(course.fee, course.currency)} (50% Off Offer)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="pt-2">
            <label htmlFor="couponInput" className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-maroon-800" />
                Coupon Code
              </span>
            </label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="couponInput"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="ENTER COUPON CODE"
                  disabled={!!appliedCoupon}
                  className={`w-full uppercase font-mono px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    appliedCoupon
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                      : "bg-white border-slate-300 focus:border-maroon-800 focus:ring-maroon-800/20"
                  }`}
                />
              </div>

              {appliedCoupon ? (
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Apply
                </button>
              )}
            </div>

            {couponError && (
              <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{couponError}</span>
              </p>
            )}

            {appliedCoupon && (
              <div className="mt-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">
                    Coupon applied
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200/60 font-bold text-[10px] uppercase">
                  Verified
                </span>
              </div>
            )}
          </div>

          {/* Pricing Preview Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Program Details
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedCourse.title}</p>
                <span className="text-xs text-slate-500 font-medium">{selectedCourse.duration}</span>
              </div>

              {selectedCourse.actualFee && (
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">
                    {formatCurrency(selectedCourse.actualFee, selectedCourse.currency)}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    50% Flyer Offer
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Standard Inaugural Offer Price:</span>
                <span className="font-semibold text-slate-800">
                  {formatCurrency(selectedCourse.fee, selectedCourse.currency)}
                </span>
              </div>

              {priceCalculation.appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Applied:</span>
                  <span>{priceCalculation.appliedCoupon.code}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">Final Amount Payable:</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-maroon-800">
                    {formatCurrency(priceCalculation.finalPrice, selectedCourse.currency)}
                  </span>
                  {priceCalculation.finalPrice === 0 && (
                    <span className="block text-[10px] text-emerald-700 font-bold uppercase">
                      100% VIP Scholarship Pass
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>



          {/* Optional Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Background / Aspirations <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <textarea
                id="message"
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Share your goals, prior experience, or preferred batch schedule..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-maroon-800 focus:ring-maroon-800/20"
              />
            </div>
          </div>

          {/* Terms Consent */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-maroon-800 focus:ring-maroon-800"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                I agree to the{" "}
                <a href="/terms" target="_blank" className="text-maroon-800 font-semibold underline">
                  Terms & Conditions
                </a>{" "}
                and acknowledge the{" "}
                <a href="/privacy" target="_blank" className="text-maroon-800 font-semibold underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-xs text-red-600 font-medium">{errors.termsAccepted}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-lg shadow-maroon-900/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Preparing Enrollment...</span>
            ) : (
              <>
                <span>
                  {priceCalculation.finalPrice === 0
                    ? "Claim 100% Free Scholarship Admission"
                    : `Proceed to Pay with UPI / Cards (${formatCurrency(
                        priceCalculation.finalPrice,
                        selectedCourse.currency
                      )})`}
                </span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
