"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { validateCoupon, calculateDiscountedPrice, Coupon } from "@/config/coupons";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  Smartphone,
  CreditCard,
  Building2,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Tag,
  ArrowRight,
  Loader2,
  Check,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CourseEnrollmentFormProps {
  course: Course;
}

export function CourseEnrollmentForm({ course }: CourseEnrollmentFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
  });

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const priceCalc = calculateDiscountedPrice(course.fee, appliedCoupon?.code);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);

    if (!couponInput.trim()) {
      setAppliedCoupon(null);
      return;
    }

    const validated = validateCoupon(couponInput.trim());
    if (!validated) {
      setCouponError(`Coupon code "${couponInput.toUpperCase()}" is invalid or expired.`);
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

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, Phone).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (formData.phone.trim().length !== 10) {
      setErrorMessage("Please enter a valid 10-digit WhatsApp/Mobile number.");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage("Please accept the terms and conditions to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit Registration
      const regRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          courseSlug: course.slug,
          couponCode: appliedCoupon?.code || undefined,
          message: formData.message.trim() || undefined,
          termsAccepted: formData.termsAccepted,
        }),
      });

      const regData = await regRes.json();
      if (!regRes.ok || !regData.success) {
        throw new Error(regData.error || "Failed to initiate registration.");
      }

      const registrationReference = regData.registrationReference;

      // 2. Create Razorpay order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationReference,
          courseSlug: course.slug,
          couponCode: appliedCoupon?.code || undefined,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create payment order.");
      }

      // If 100% free pass / VIP
      if (orderData.isFree) {
        router.push(`/register/success?ref=${registrationReference}&pay=free_pass`);
        return;
      }

      // 3. Load official Razorpay Checkout script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay payment gateway failed to load. Please check your internet connection.");
      }

      // 4. Open Razorpay Checkout modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: siteConfig.name,
        description: `Enrollment: ${course.title}`,
        image: `${window.location.origin}/images/jbm-logo.png`,
        order_id: orderData.orderId,
        prefill: {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          contact: formData.phone.trim(),
        },
        theme: {
          color: "#800020",
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationReference,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              router.push(
                `/register/success?ref=${registrationReference}&pay=confirmed&payment_id=${response.razorpay_payment_id}`
              );
            } else {
              setErrorMessage(
                verifyData.error || "Payment verification failed on the server. Please contact support."
              );
            }
          } catch (err: any) {
            setErrorMessage(err.message || "An error occurred while verifying the payment.");
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        setErrorMessage(
          response.error?.description || "Payment was cancelled or unsuccessful. Please try again."
        );
        setIsSubmitting(false);
      });
      paymentObject.open();
    } catch (err: any) {
      setErrorMessage(err.message || "Could not process enrollment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const phoneClean = siteConfig.contact.phone.replace(/[^0-9]/g, "");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* ================================================================ */}
      {/* LEFT COLUMN: Student Details & Payment Initiation Form           */}
      {/* ================================================================ */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-8">
        <form onSubmit={handleSubmitEnrollment} className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Learner Admission Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Please enter your accurate contact information for course sandbox access and certification.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Full Legal Name <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rachel Johnson"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent bg-slate-50/50 text-slate-900 transition-all font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              This name will be printed on your verified certificate of completion.
            </span>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Email Address <span className="text-rose-600">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="learner@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent bg-slate-50/50 text-slate-900 transition-all font-medium"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Class links & receipts will be sent here.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                WhatsApp Phone <span className="text-rose-600">*</span>
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                  setFormData({ ...formData, phone: val });
                }}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent bg-slate-50/50 text-slate-900 transition-all font-medium"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                For batch WhatsApp cohort and alerts.
              </span>
            </div>
          </div>

          {/* Referral / Coupon Code */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Have a Referral or Discount Coupon?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. JBM50K2L"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                disabled={!!appliedCoupon}
                className="flex-grow px-4 py-3 rounded-xl border border-slate-300 text-sm uppercase tracking-wider font-bold focus:outline-none focus:ring-2 focus:ring-maroon-800 bg-slate-50/50 text-slate-900 disabled:bg-slate-100 disabled:text-slate-500"
              />
              {appliedCoupon ? (
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="px-4 py-3 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-5 py-3 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 border border-amber-300 transition-colors shadow-sm"
                >
                  Apply
                </button>
              )}
            </div>

            {couponError && (
              <p className="text-xs text-rose-600 font-semibold mt-2">{couponError}</p>
            )}

            {appliedCoupon && (
              <div className="mt-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Coupon "{appliedCoupon.code}" applied! You save {formatCurrency(priceCalc.discountAmount, course.currency)}.</span>
                </span>
                <span className="text-emerald-700 uppercase tracking-wider text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
            )}
          </div>

          {/* Supported Razorpay Methods Preview */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3">
              Payment Methods (Integrated with Razorpay)
            </span>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1">
                <Smartphone className="w-5 h-5 text-maroon-800 mx-auto" />
                <span className="text-xs font-bold block">UPI & QR</span>
                <span className="text-[10px] text-slate-500 block">GPay, PhonePe, Paytm</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1">
                <CreditCard className="w-5 h-5 text-maroon-800 mx-auto" />
                <span className="text-xs font-bold block">Debit & Credit</span>
                <span className="text-[10px] text-slate-500 block">Visa, Mastercard, RuPay</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1">
                <Building2 className="w-5 h-5 text-maroon-800 mx-auto" />
                <span className="text-xs font-bold block">Net Banking</span>
                <span className="text-[10px] text-slate-500 block">50+ Indian Banks</span>
              </div>
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-maroon-800 focus:ring-maroon-800 cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="font-bold text-maroon-800 hover:underline">
                  Johanna Bright Mentors Terms & Conditions
                </Link>{" "}
                and confirm that my contact details are accurate.
              </span>
            </label>
          </div>

          {/* Main Action Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formData.termsAccepted}
              className="w-full py-4 px-6 rounded-2xl text-base font-extrabold text-white bg-maroon-800 hover:bg-maroon-900 shadow-xl shadow-maroon-900/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting to Secure Razorpay...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-amber-300" />
                  <span>
                    Proceed to Pay
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Razorpay Payment Gateway • 256-Bit SSL Encrypted</span>
          </div>
        </form>
      </div>

      {/* ================================================================ */}
      {/* RIGHT COLUMN: Sticky Order Summary & Program Highlights         */}
      {/* ================================================================ */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-maroon-50 text-maroon-800 border border-maroon-200">
              <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
              <span>COHORT SUMMARY</span>
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              {course.duration}
            </span>
          </div>

          {/* Course Title & Thumbnail */}
          <div className="space-y-3">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
              {course.title}
            </h3>
            {course.tagline && (
              <p className="text-xs text-maroon-800 font-bold">
                {course.tagline}
              </p>
            )}
          </div>

          {/* Key Inclusions from PDF */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              What's Included:
            </span>
            {[
              "Live Cohort Classes & Full Recorded Access",
              "Structured Hands-On Labs & Capstone Projects",
              "Official JBM Verified Certificate of Completion",
              "Mentorship & Career Direction Guidance",
              "Direct Q&A with Faculty on WhatsApp",
            ].map((inc, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{inc}</span>
              </div>
            ))}
          </div>

          {/* Detailed Price Calculation Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Standard Tuition Fee:</span>
              <span className="font-semibold text-slate-400 line-through">
                {course.actualFee ? formatCurrency(course.actualFee, course.currency) : "—"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Inaugural Special Discount (50%):</span>
              <span>- {formatCurrency(course.actualFee ? course.actualFee - course.fee : 0, course.currency)}</span>
            </div>

            {priceCalc.discountAmount > 0 && (
              <div className="flex items-center justify-between text-xs text-amber-700 font-bold">
                <span>Coupon ({appliedCoupon?.code}):</span>
                <span>- {formatCurrency(priceCalc.discountAmount, course.currency)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <span className="text-sm font-extrabold text-slate-900">Total Amount Payable:</span>
              <span className="text-2xl font-black text-maroon-800">
                {formatCurrency(priceCalc.finalPrice, course.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Need Help? Box */}
        <div className="p-6 rounded-3xl bg-maroon-50/70 border border-maroon-200 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <strong className="text-xs font-bold text-slate-900 block">Have Questions Before Enrolling?</strong>
            <p className="text-[11px] text-slate-600">Speak directly with our counselor.</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/91${phoneClean}?text=Hello%20JBM,%20I%20have%20questions%20before%20enrolling%20in%20${encodeURIComponent(course.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-transform hover:scale-105"
              aria-label="WhatsApp Counselor"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={`tel:${phoneClean}`}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-transform hover:scale-105"
              aria-label="Call Counselor"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
