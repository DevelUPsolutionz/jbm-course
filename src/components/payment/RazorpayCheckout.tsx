"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CreditCard, ShieldCheck, Smartphone, Lock, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  orderData: {
    orderId: string;
    amount: number;
    currency: string;
    registrationReference: string;
    keyId: string;
    courseTitle: string;
    userName: string;
    userEmail: string;
    userPhone: string;
  };
}

export function RazorpayCheckout({ orderData }: RazorpayCheckoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      setIsLoading(false);
      setErrorMessage("Razorpay payment gateway failed to load. Please check your internet connection.");
      return;
    }

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: siteConfig.name,
      description: `Admission: ${orderData.courseTitle}`,
      image: `${window.location.origin}/images/jbm-logo.png`,
      order_id: orderData.orderId,
      prefill: {
        name: orderData.userName,
        email: orderData.userEmail,
        contact: orderData.userPhone,
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
          // Server-side verification
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              registrationReference: orderData.registrationReference,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            router.push(
              `/register/success?ref=${orderData.registrationReference}&pay=confirmed&payment_id=${response.razorpay_payment_id}`
            );
          } else {
            setErrorMessage(
              verifyData.error || "Payment verification failed on the server. Please contact support."
            );
          }
        } catch (err: any) {
          setErrorMessage(err.message || "An error occurred while verifying the payment.");
        } finally {
          setIsLoading(false);
        }
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        setErrorMessage(
          response.error?.description || "Payment attempt was declined or cancelled."
        );
        setIsLoading(false);
      });
      paymentObject.open();
    } catch (err: any) {
      setErrorMessage("Could not initialize Razorpay checkout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 font-medium text-left">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 10% Emerald Green Trust & Payment Gateway Box */}
      <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 text-emerald-900 space-y-2 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Razorpay Verified Payment Gateway
          </span>
          <span className="text-[10px] font-extrabold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md">
            100% SECURE
          </span>
        </div>
        <p className="text-[11px] text-emerald-800 leading-relaxed">
          Supports instant payment via <strong>Google Pay, PhonePe, Paytm, UPI QR</strong>, all major <strong>Debit/Credit Cards</strong>, and <strong>50+ Net Banking</strong> institutions.
        </p>
      </div>

      {/* Payment Action Button (Emerald Green 10% on Payment Action) */}
      <button
        type="button"
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-700/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-50"
      >
        {isLoading ? (
          <span>Connecting Gateway...</span>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            <span>
              Pay {formatCurrency(orderData.amount / 100, orderData.currency)} via UPI / Cards
            </span>
          </>
        )}
      </button>
    </div>
  );
}
