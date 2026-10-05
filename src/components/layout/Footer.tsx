import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";
import { COURSES } from "@/config/courses";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#120308] text-slate-300 border-t border-white/5 relative overflow-hidden">
      {/* Top subtle accent line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-rose-900/50 to-transparent" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 xl:gap-12">
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-16 h-16 rounded-xl bg-white border border-rose-900/30 p-1.5 flex items-center justify-center shadow-md">
                <Image
                  src="/images/jbm-logo.png"
                  alt={siteConfig.name}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] font-bold text-amber-500/90 tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  {siteConfig.slogan}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-light">
              {siteConfig.description}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Government Registered Education Partner • Coimbatore</span>
            </div>

            <div className="pt-2">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                Mentorship & Counseling Helpline:
              </span>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-base font-bold text-slate-200 hover:text-amber-400 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+91 {siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Certification Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] flex items-center gap-2">
              <span>Certification Programs</span>
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {COURSES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="hover:text-amber-400 transition-all font-medium flex items-start group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {c.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-400 transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="hover:text-amber-400 transition-colors block">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/#philosophy" className="hover:text-amber-400 transition-colors block">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/#institutions" className="hover:text-amber-400 transition-colors block">
                  For Institutions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions & Contact Desk (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em]">
              Admissions Desk
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  +91 {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.contact.rawWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp Direct Support
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-500 text-xs pt-2">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{siteConfig.contact.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure 256-Bit Razorpay Gateway</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
