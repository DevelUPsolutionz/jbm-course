"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Scroll spy logic
      const sections = ["courses", "faq", "contact"];
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
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border-slate-200 shadow-[0_8px_30px_rgb(128,0,32,0.06)]"
              : "bg-white/90 backdrop-blur-xl border-slate-200/80 shadow-sm"
          }`}
        >
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon-800 rounded-xl"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm group-hover:border-maroon-300 group-hover:shadow-md transition-all">
              <Image
                src="/images/jbm-logo.png"
                alt={siteConfig.name}
                width={50}
                height={50}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-maroon-800 transition-colors">
                  {siteConfig.name}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-maroon-800 tracking-wider uppercase">
                {siteConfig.slogan}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200" aria-label="Main Navigation">
            {siteConfig.nav.map((item) => {
              const isActive = activeHash === item.href || (item.href === "/" && activeHash === "/");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-semibold transition-all rounded-lg px-3.5 py-1.5 ${
                    isActive 
                      ? "bg-maroon-800 text-white shadow-sm" 
                      : "text-slate-700 hover:bg-maroon-800 hover:text-white hover:shadow-sm"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/register"
              className="relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-md shadow-maroon-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Enroll Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/register"
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-maroon-800 rounded-lg shadow-sm"
            >
              Enroll
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-3">
            <nav className="flex flex-col space-y-1">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-maroon-800 hover:bg-maroon-50 rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-maroon-800 shadow-md text-center"
            >
              <span>Enroll in a Course</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
