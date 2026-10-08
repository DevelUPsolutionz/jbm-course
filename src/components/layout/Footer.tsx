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
    <footer id="contact" className="bg-[#120308] text-white border-t border-white/10 relative overflow-hidden">
      {/* Top subtle accent line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-4 sm:pb-5 relative z-10">
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
                <span className="text-[10px] font-bold text-amber-400 tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  {siteConfig.slogan}
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/90 max-w-sm leading-relaxed font-normal">
              {siteConfig.description}
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-white/80 block mb-1">
                Mentorship & Counseling Helpline:
              </span>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-base font-bold text-white hover:text-amber-400 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+91 {siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Certification Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] flex items-center gap-2">
              <span>Certification Programs</span>
            </h4>
            <ul className="space-y-3 text-sm text-white/90">
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
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white/90 font-medium">
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
            </ul>
          </div>

          {/* Col 4: Admissions & Contact Desk (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-white/90 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  +91 {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors font-semibold"
                >
                  WhatsApp Direct Support
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-xs pt-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{siteConfig.contact.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 mt-6 border-t border-white/10 flex flex-col items-center justify-center gap-1.5 text-xs text-white/80 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-0.5 text-white font-medium">
            <Link href="/about" className="hover:text-amber-400 transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Contact Us
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="text-white/90">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-white/70 font-medium tracking-wide">
            Developed by <a href="https://www.develupsolutionz.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors cursor-pointer">DevelUp Solutionz</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
