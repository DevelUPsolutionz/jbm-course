import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Sparkles, Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { COURSES } from "@/config/courses";

export function Footer() {
  return (
    <footer className="bg-maroon-950 text-maroon-100/80 border-t border-maroon-900 relative">
      {/* Top accent border */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-maroon-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl bg-white border border-maroon-800 p-1 flex items-center justify-center shadow-md">
                <Image
                  src="/images/jbm-logo.png"
                  alt={siteConfig.name}
                  width={44}
                  height={44}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-tight group-hover:text-maroon-300 transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                  {siteConfig.slogan}
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-maroon-200/80 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-maroon-900/60 border border-maroon-800 text-[11px] text-maroon-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Government Registered Education Partner • Coimbatore</span>
            </div>
          </div>

          {/* Col 2: Featured Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Certification Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-maroon-200/80">
              {COURSES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="hover:text-white transition-colors font-medium flex items-center gap-1.5"
                  >
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-maroon-200/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors font-medium">
                  About Institution
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors font-medium">
                  Admission Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors font-medium">
                  Counselor Helpline
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Admissions Desk
            </h4>
            <ul className="space-y-3 text-xs text-maroon-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white font-semibold">
                  +91 {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-maroon-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-maroon-400">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Secure Razorpay 256-Bit Gateway</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
