"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function WhatsAppWidget() {
  const pathname = usePathname();
  const [showBubble, setShowBubble] = useState(true);

  // Do not show WhatsApp widget inside admin dashboard or admin login
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/jbmlogin")) {
    return null;
  }

  const whatsappUrl = siteConfig.social.whatsapp;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Floating Callout Popup */}
      {showBubble && (
        <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs font-semibold text-slate-800 animate-bounce transition-all">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Chat with Admissions Counselor</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300" />
          </span>
        </div>
        <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline-block">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
