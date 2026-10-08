"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DoodleMintLoop,
  DoodleStarburst8,
  DoodleSquiggleUnderline,
  DoodleSparkleStar,
} from "./DoodleArt";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "High-Quality Hands-on Learning & Live Faculty Mentorship",
    answer:
      "Every JBM program features structured, practical modules with live mentorship, direct code feedback, and real-time doubt clearing. We emphasize building real-world projects over passive theory.",
  },
  {
    question: "Can I Access Course Materials and Practice Labs at My Own Pace?",
    answer:
      "Yes! You receive lifetime access to session recordings, lab manuals, code templates, and project repositories, allowing you to learn anytime, anywhere at your convenient schedule.",
  },
  {
    question: "Are the Programs Beginner-Friendly for Non-Technical Students?",
    answer:
      "Absolutely. Our curriculum starts from the foundational concepts (Step 01: Understand) and progressively advances into guided hands-on exercises (Step 02: Practice) and industry portfolio projects (Step 03: Build).",
  },
  {
    question: "Will I Receive a Verified Certificate Upon Completion?",
    answer:
      "Yes. Upon successfully completing the program curriculum and final capstone project, you receive a verified Johanna Bright Mentors (JBM) Certificate of Completion with a unique credential ID.",
  },
  {
    question: "What Is the Refund & Batch Switch Policy?",
    answer:
      "We provide full cohort flexibility. If an emergency arises or your schedule changes, you can request to switch to the upcoming batch or contact our counselor helpline for assistance.",
  },
  {
    question: "Can Colleges or Institutions Request Custom Campus Workshops?",
    answer:
      "Yes, JBM conducts customized department-level workshops, faculty development programs, and campus bootcamps. You can reach out directly via our Institutional Inquiry section or WhatsApp helpline.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
      {/* Decorative Mint Double Loop Doodle on Top Right (From ZenEd Screenshot 1) */}
      <div className="absolute top-10 right-8 sm:right-20 lg:right-32 pointer-events-none opacity-85 z-10 animate-float">
        <DoodleMintLoop className="w-20 h-20 sm:w-28 sm:h-28 text-emerald-300" />
      </div>

      {/* Decorative Pastel Cyan 8-Point Starburst at Bottom Left (From ZenEd Screenshot 1) */}
      <div className="absolute bottom-12 left-8 sm:left-16 lg:left-24 pointer-events-none opacity-80 z-10 animate-pulse-slow">
        <DoodleStarburst8 className="w-12 h-12 sm:w-16 sm:h-16 text-sky-200" />
      </div>

      {/* Floating 4-Point Green Sparkle Star */}
      <div className="absolute top-1/2 left-10 hidden lg:block pointer-events-none opacity-70 z-10">
        <DoodleSparkleStar className="w-7 h-7 text-emerald-400" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently asked{" "}
            <span className="relative inline-block text-orange-500 font-serif italic font-semibold">
              questions
              <div className="absolute -bottom-2.5 left-0 w-full">
                <DoodleSquiggleUnderline className="text-orange-400" />
              </div>
            </span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            From foundation courses that lay the groundwork for your educational journey to advanced specializations.
          </p>
        </div>

        {/* Accordion List Styled Exactly Like ZenEd Screenshot 1 */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? "bg-[#FEFCE8]/80 border-amber-200/90 shadow-sm"
                    : "bg-white hover:bg-slate-50/70 border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                >
                  <span
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? "text-amber-900" : "text-slate-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 text-amber-800 bg-amber-100/80"
                        : "text-slate-400 bg-slate-100"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-amber-200/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
