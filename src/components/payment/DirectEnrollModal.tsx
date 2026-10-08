"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { validateReferralCode } from "@/config/coupons";
import {
  CreditCard,
  ShieldCheck,
  Smartphone,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Building2,
  Loader2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface DirectEnrollModalProps {
  course: Course;
  buttonText?: string;
  buttonClassName?: string;
}

export function DirectEnrollModal({
  course,
  buttonText = "Enroll & Pay Now",
  buttonClassName,
}: DirectEnrollModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleStartEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please enter your name, email, and phone number.");
      return;
    }

    if (couponCode.trim()) {
      const validRef = validateReferralCode(couponCode.trim());
      if (!validRef) {
        setErrorMessage("Coupon invalid");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // 1. Create registration record
      const regRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          courseSlug: course.slug,
          couponCode: couponCode.trim() || undefined,
          termsAccepted: true,
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
          couponCode: couponCode.trim() || undefined,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create payment order.");
      }

      // If 100% free / VIP referral
      if (orderData.isFree) {
        router.push(
          `/register/success?ref=${registrationReference}&pay=free_pass`
        );
        return;
      }

      // 3. Load official Razorpay Checkout script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay payment gateway failed to load. Please check your internet connection.");
      }

      // 4. Trigger Razorpay Checkout Window
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: siteConfig.name,
        description: `Admission: ${course.title}`,
        image: `${window.location.origin}/images/jbm-logo.png`,
        order_id: orderData.orderId,
        prefill: {
          name: fullName.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        theme: {
          color: "#800020",
        },
        config: {
          display: {
            hide: [
              { method: "emi" },
              { method: "paylater" },
            ],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
          emi: false,
          paylater: false,
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
              setIsOpen(false);
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
          response.error?.description || "Payment attempt was cancelled or failed."
        );
        setIsSubmitting(false);
      });
      paymentObject.open();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initialize payment.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          buttonClassName ||
          "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-lg shadow-maroon-900/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        }
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
            {/* Header Strip */}
            <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white p-6 sm:p-7 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>DIRECT COHORT ENROLLMENT</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {course.title}
              </h2>
              <p className="text-xs text-rose-200 mt-1">
                {course.duration} • Live Online + Guided Hands-on Labs
              </p>

              {/* Price Preview */}
              <div className="mt-4 pt-3 border-t border-white/15 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-rose-200 block uppercase font-semibold">
                    Inaugural Enrollment Fee
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {formatCurrency(course.fee, course.currency)}
                    </span>
                    {course.actualFee && (
                      <span className="text-xs text-rose-300 line-through">
                        {formatCurrency(course.actualFee, course.currency)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-extrabold bg-emerald-500 text-white px-2.5 py-1 rounded-full shadow-sm">
                  50% OFF
                </span>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleStartEnrollment} className="p-6 sm:p-7 space-y-4 text-left">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 font-medium">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent text-slate-900 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="learner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    WhatsApp Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Coupon Code
                </label>
                <input
                  type="text"
                  placeholder="ENTER COUPON CODE"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 focus:border-transparent text-slate-900 uppercase bg-slate-50/50"
                />
              </div>


              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-xl shadow-maroon-900/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Connecting to Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-rose-200" />
                      <span>Proceed to Pay {formatCurrency(course.fee, course.currency)}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 leading-snug">
                🔒 256-Bit SSL Encrypted. Supports Google Pay, PhonePe, Paytm, RuPay, Visa, Mastercard, and Net Banking.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
