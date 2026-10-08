"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Sparkles, Menu, X, ArrowUpRight, Phone, MessageSquare, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────
   JBM BRAND PALETTE (from official logo)
   Royal Maroon  #800020
   Radiant Gold  #F59E0B
   Pearl/Cream   #FFF9F0
   ───────────────────────────────────────────────────────────────────── */

function EnrollCTA({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link
      href="/#courses"
      className={`relative inline-flex items-center gap-1.5 font-bold text-white rounded-full overflow-hidden group transition-all duration-300 hover:scale-[1.04] active:scale-95 focus:outline-none ${mobile ? "px-3.5 py-1.5 text-xs shadow-md" : "px-6 py-2.5 text-xs shadow-[0_4px_14px_rgba(128,0,32,0.35)]"}`}
      style={{ background: "linear-gradient(135deg,#800020 0%,#5a0016 100%)" }}
    >
      <span aria-hidden className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
      <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
      <span>Enroll</span>
      <ArrowUpRight className="w-3.5 h-3.5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy logic
      const sections = ["about", "courses", "philosophy", "institutions", "contact"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = `/#${section}`;
          }
        }
      }
      if (window.scrollY < 150) current = "/";
      if (current) setActiveHash(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile wave menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const phoneClean = siteConfig.contact.phone.replace(/[^0-9]/g, "");

  return (
    <>
      {/* ==================================================================== */}
      {/* 1. DESKTOP FULL-WIDTH CURVED & STRAIGHT HEADER                       */}
      {/* Auto-adjusts to any screen width with straight ceiling rails + curve */}
      {/* ==================================================================== */}
      <header
        className="sticky top-0 z-40 w-full transition-all duration-300"
        style={{
          filter: scrolled
            ? "drop-shadow(0 12px 28px rgba(128, 0, 32, 0.08))"
            : "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.04))",
        }}
      >
        {/* Subtle Top Ceiling Accent Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-maroon-800/25 to-transparent pointer-events-none z-20" />

        {/* 1. DESKTOP HEADER (lg:flex) */}
        {pathname === "/" ? (
          /* HOMEPAGE: FULL-WIDTH SEAMLESS CURVED & STRAIGHT CANOPY */
          <div className="hidden lg:flex w-full items-start justify-center relative">
            {/* Left Straight Bar along the top ceiling (Auto-adjusts width with flex-1) */}
            <div className="flex-1 h-[12px] bg-white/95 backdrop-blur-xl border-b border-slate-200" />

            {/* Left S-Curve Transition Wing: Sweeps from 12px straight rail down into 68px center dock */}
            <div className="w-20 h-[84px] -mr-[1px] relative flex-shrink-0 pointer-events-none">
              <svg viewBox="0 0 80 84" preserveAspectRatio="none" className="w-full h-full block">
                <path d="M 0 0 L 80 0 L 80 84 C 44 84 36 12 0 12 Z" fill="rgba(255, 255, 255, 0.95)" />
                <path d="M 0 12 C 36 12 44 84 80 84" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
              </svg>
            </div>

            {/* Central Curved Navigation Dock: Holds Logo, Menu, and Action Button */}
            <div className="h-[84px] flex-shrink-0 flex items-center justify-between px-8 xl:px-12 2xl:px-16 bg-white/95 backdrop-blur-xl border-b border-slate-200 min-w-[960px] xl:min-w-[1140px] 2xl:min-w-[1260px]">
              {/* Brand Logo & Name */}
              <Link
                href="/"
                className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon-800 rounded-xl flex-shrink-0"
              >
                <div className="relative w-16 h-16 flex items-center justify-center transition-all">
                  <Image
                    src="/images/jbm-logo.png"
                    alt={siteConfig.name}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] xl:text-[17px] font-black text-slate-900 tracking-tight group-hover:text-maroon-800 transition-colors">
                    {siteConfig.name}
                  </span>
                  <span className="text-[9.5px] xl:text-[10px] font-extrabold text-maroon-800 tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {siteConfig.slogan}
                  </span>
                </div>
              </Link>
              {/* Desktop Navigation Links (Floating Pill Dock) */}
              <nav
                className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
                aria-label="Main Navigation"
              >
                {siteConfig.nav.map((item) => {
                  const isActive = activeHash === item.href || (item.href === "/" && activeHash === "/");
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`text-xs font-semibold transition-all duration-200 rounded-full px-4 py-1.5 ${
                        isActive
                          ? "bg-maroon-800 text-white shadow-[0_2px_8px_rgba(128,0,32,0.3)]"
                          : "text-slate-600 hover:text-maroon-900 hover:bg-white/90"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right S-Curve Transition Wing: Sweeps from 68px center dock up into 12px straight rail */}
            <div className="w-20 h-[84px] -ml-[1px] relative flex-shrink-0 pointer-events-none">
              <svg viewBox="0 0 80 84" preserveAspectRatio="none" className="w-full h-full block">
                <path d="M 0 0 L 80 0 L 80 12 C 44 12 36 84 0 84 Z" fill="rgba(255, 255, 255, 0.95)" />
                <path d="M 0 84 C 36 84 44 12 80 12" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
              </svg>
            </div>

            {/* Right Straight Bar along the top ceiling (Auto-adjusts width with flex-1) */}
            <div className="flex-1 h-[12px] bg-white/95 backdrop-blur-xl border-b border-slate-200" />
          </div>
        ) : (
          /* COURSE & OTHER PAGES: FULL-WIDTH CLEAN DESKTOP NAVBAR (No 12px rail cutouts) */
          <div className="hidden lg:flex w-full h-20 bg-white/95 backdrop-blur-xl border-b border-slate-200 items-center justify-between px-6 xl:px-12 shadow-sm">
            <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
              {/* Brand Logo & Name */}
              <Link
                href="/"
                className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon-800 rounded-xl flex-shrink-0"
              >
                <div className="relative w-20 h-20 flex items-center justify-center transition-all">
                  <Image
                    src="/images/jbm-logo.png"
                    alt={siteConfig.name}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[17px] xl:text-xl font-black text-slate-900 tracking-tight group-hover:text-maroon-800 transition-colors">
                    {siteConfig.name}
                  </span>
                  <span className="text-[10.5px] font-extrabold text-maroon-800 tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {siteConfig.slogan}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav
                className="flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
                aria-label="Main Navigation"
              >
                {siteConfig.nav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`text-xs font-semibold transition-all duration-200 rounded-full px-4 py-1.5 ${
                        isActive
                          ? "bg-maroon-800 text-white shadow-[0_2px_8px_rgba(128,0,32,0.3)]"
                          : "text-slate-600 hover:text-maroon-900 hover:bg-white/90"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* 2. MOBILE / TABLET COMPACT HEADER (lg:hidden) */}
        <div className="lg:hidden w-full flex items-center justify-between px-4 sm:px-6 h-20 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src="/images/jbm-logo.png"
                alt={siteConfig.name}
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                {siteConfig.name}
              </span>
              <span className="text-[9px] font-bold text-maroon-800 tracking-wider uppercase">
                {siteConfig.slogan}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 border border-slate-200/90 focus:outline-none transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2. MOBILE WAVE DRAWER (Sweeps from Top-Right to Bottom-Left)        */}
      {/* Matches user hand-drawn sketch with organic curved S-wave contour    */}
      {/* ==================================================================== */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark Dimmed Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Diagonal Wave Drawer (Sliding in from top-right to bottom-left) */}
        <div
          className={`absolute top-0 right-0 w-[88vw] max-w-sm h-full bg-gradient-to-b from-[#13070B] via-[#1C0B12] to-[#0D0407] text-white shadow-2xl flex flex-col justify-between p-6 sm:p-7 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Organic SVG Curved Wave Edge along the left boundary */}
          <div className="absolute top-0 -left-[44px] w-[45px] h-full pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 60 1000"
              preserveAspectRatio="none"
              className="w-full h-full fill-[#13070B]"
            >
              <path d="M60,0 C15,180 -10,360 35,520 C75,700 10,870 60,1000 L60,0 Z" />
            </svg>
            {/* Glowing Accent Wave Outline */}
            <svg
              viewBox="0 0 60 1000"
              preserveAspectRatio="none"
              className="w-full h-full absolute inset-0 stroke-rose-400/25 fill-none"
              strokeWidth="2"
            >
              <path d="M60,0 C15,180 -10,360 35,520 C75,700 10,870 60,1000" />
            </svg>
          </div>

          {/* Drawer Top Header (Logo & Animated Close Button) */}
          <div className="flex items-center justify-between pb-5 border-b border-rose-900/30 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/jbm-logo.png"
                  alt={siteConfig.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                  {siteConfig.slogan}
                </span>
              </div>
            </div>

            {/* Circular Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white transition-all hover:rotate-90"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with Staggered Entrance */}
          <div className="py-6 space-y-5 overflow-y-auto relative z-10 flex-grow">
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300/80 block px-2">
              NAVIGATION
            </span>
            <nav className="flex flex-col space-y-1.5">
              {siteConfig.nav.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all group"
                  style={{
                    transitionDelay: `${idx * 40}ms`,
                  }}
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {item.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </nav>

            {/* Quick 3 Course Jump Section */}
            <div className="pt-4 border-t border-rose-900/30 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300/90 block px-2">
                CORE PROGRAMS
              </span>
              <div className="space-y-1.5">
                {[
                  { name: "AI Foundation & Productivity", href: "/courses/artificial-intelligence", tag: "30 Days" },
                  { name: "Networking in Cyber Security", href: "/courses/cyber-security", tag: "30 Days" },
                  { name: "Professional English", href: "/courses/english", tag: "40 Days" },
                ].map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-slate-200 hover:text-white transition-all"
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {c.tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-4 border-t border-rose-900/30 space-y-3 relative z-10">
            <Link
              href="/#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 hover:opacity-95 shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Enroll in a Course</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
            </Link>

            {/* Quick Helpline Strip */}
            <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-rose-200/80">
              <a
                href={`https://wa.me/91${phoneClean}?text=Hello%20JBM,%20I%20would%20like%20to%20know%20more%20about%20your%20programs.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Counselor</span>
              </a>
              <a
                href={`tel:${phoneClean}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 {siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
