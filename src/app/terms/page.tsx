"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Building2, UserCheck, FileText, CheckCircle2 } from "lucide-react";

export default function TermsAndConditionsPage() {
  const [activeTab, setActiveTab] = useState<"learner" | "institution">("learner");

  const learnerTerms = [
    {
      title: "1. Program Enrollment",
      desc: "Enrollment is confirmed only after JBM receives the required registration information and applicable payment. A seat is not considered confirmed until the enrollment process is completed.",
    },
    {
      title: "2. Accurate Information",
      desc: "Participants must provide accurate details during registration, including name, email, phone number and educational information. JBM is not responsible for issues caused by incorrect information provided by a participant.",
    },
    {
      title: "3. Course Access",
      desc: "Course access is provided only to the registered participant and must not be shared with another person. Login credentials, meeting links and learning resources must be kept confidential.",
    },
    {
      title: "4. Class Schedule",
      desc: "JBM may reasonably modify class dates, timings, trainers or session arrangements when required. Participants will be informed about significant schedule changes through official communication channels.",
    },
    {
      title: "5. Attendance",
      desc: "Participants are expected to attend sessions regularly and complete required activities. Attendance may be considered when determining eligibility for certificates or other program benefits.",
    },
    {
      title: "6. Learning Materials",
      desc: "JBM-provided notes, recordings, presentations, assignments, templates and other learning materials are intended for personal educational use only and may not be copied, resold, redistributed or published without permission.",
    },
    {
      title: "7. Practical Projects",
      desc: "Projects and assignments are intended to provide practical learning experience. Participants are responsible for completing their own work and must not misrepresent another person's work as their own.",
    },
    {
      title: "8. Third-Party Tools",
      desc: "Some programs may use external platforms, software or AI tools. Their availability, pricing, functionality and policies are controlled by their respective providers and may change independently of JBM.",
    },
    {
      title: "9. AI & Technology Usage",
      desc: "Participants must use AI tools, software and technical resources responsibly and legally. JBM is not responsible for misuse of third-party tools or for actions taken by participants outside the learning environment.",
    },
    {
      title: "10. Certificate Eligibility",
      desc: "A certificate may be issued only when the participant satisfies the applicable program requirements, which may include attendance, assignments, projects, assessments and fee completion.",
    },
    {
      title: "11. Career & Placement Disclaimer",
      desc: "JBM provides career guidance, skill development and professional preparation. Completion of a JBM program does not guarantee employment, placement, internship, salary, promotion or any specific career outcome.",
    },
    {
      title: "12. Professional Conduct",
      desc: "Participants must maintain respectful and professional behaviour during classes, workshops, group discussions and online communities. Serious misconduct may result in suspension or removal from the program.",
    },
    {
      title: "13. Fees & Promotional Offers",
      desc: "Course fees, discounts, promotional prices and special offers may vary by program or batch. Promotional offers may have specific eligibility requirements, validity periods or limited availability.",
    },
    {
      title: "14. Refunds & Cancellations",
      desc: "Refunds, cancellations, transfers and related requests will be handled according to the JBM Refund & Cancellation Policy applicable to the participant's enrollment. Participants should review that policy before making payment.",
    },
    {
      title: "15. Changes to JBM Services",
      desc: "JBM may update its programs, curriculum, learning methods, schedules, policies and website content when reasonably necessary. The latest version of the applicable terms and policies published on the JBM website will apply.",
    },
  ];

  const institutionalTerms = [
    {
      title: "1. Proposal & Scope",
      desc: "Each institutional program will be conducted according to the scope, topics, duration, deliverables and other requirements agreed upon in the final proposal.",
    },
    {
      title: "2. Customized Programs",
      desc: "JBM may customize the workshop or training based on the institution's requirements, student level, department, number of participants and learning objectives.",
    },
    {
      title: "3. Program Confirmation",
      desc: "A workshop or training date is considered confirmed only after the institution accepts the proposal and completes the required confirmation/payment process.",
    },
    {
      title: "4. Fees & Payment",
      desc: "Program fees will be communicated privately through the official JBM proposal or quotation. Payment terms will be agreed upon before the program is confirmed.",
    },
    {
      title: "5. No Public Pricing",
      desc: "JBM does not publish standard institutional workshop pricing because fees may vary depending on the number of participants, duration, topic, delivery mode, customization and other requirements.",
    },
    {
      title: "6. Schedule & Rescheduling",
      desc: "The institution and JBM will mutually agree on the program date and timing. Any requested changes should be communicated in advance and may be subject to trainer and scheduling availability.",
    },
    {
      title: "7. Online / Offline Delivery",
      desc: "Programs may be delivered online, offline or in hybrid format, as agreed in the proposal. For offline programs, venue, equipment, internet, projector and other infrastructure requirements should be mutually agreed in advance.",
    },
    {
      title: "8. Participant Information",
      desc: "The institution is responsible for providing accurate information regarding the expected number and category of participants where such information is required for program planning.",
    },
    {
      title: "9. Learning Materials",
      desc: "Any JBM-provided presentations, documents, worksheets, recordings, templates or other proprietary materials are intended for the agreed educational purpose and must not be reproduced, resold or commercially distributed without permission.",
    },
    {
      title: "10. Photography & Media",
      desc: "JBM may request permission to capture photographs, videos or other media during institutional programs for documentation and promotional purposes. No student or institutional media should be used for promotional purposes without appropriate permission.",
    },
    {
      title: "11. Certificates",
      desc: "If certificates are included in the agreed proposal, they will be issued according to the eligibility and completion requirements specified for the particular program.",
    },
    {
      title: "12. Trainer & Content Changes",
      desc: "JBM may make reasonable changes to the assigned trainer, session structure or curriculum when necessary, while maintaining the agreed learning objectives and program scope.",
    },
    {
      title: "13. Cancellation",
      desc: "Cancellation, postponement and refund terms will be based on the specific terms agreed upon in the institutional proposal or quotation.",
    },
    {
      title: "14. No Guaranteed Outcomes",
      desc: "JBM provides educational and skill-development services. Participation in a workshop or training program does not guarantee employment, placement, internship, salary, certification from external organizations or any specific career outcome.",
    },
    {
      title: "15. Mutual Cooperation",
      desc: "Both JBM and the institution agree to cooperate professionally and provide the information, facilities and support reasonably required to conduct the program successfully.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sora">
      <Header />

      <main className="flex-grow py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            {/* Header */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-maroon-700 bg-maroon-50 px-3 py-1 rounded-full border border-maroon-200">
                Official Policies
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-3">
                Terms & Conditions
              </h1>
              <p className="text-xs text-slate-500 mt-2">
                Johanna Bright Mentors (JBM) • Effective Date: October 2026
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 max-w-md">
              <button
                type="button"
                onClick={() => setActiveTab("learner")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "learner"
                    ? "bg-white text-maroon-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Learner Terms (15)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("institution")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "institution"
                    ? "bg-white text-maroon-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Institutional Terms (15)</span>
              </button>
            </div>

            {/* Tab 1: Learner Terms */}
            {activeTab === "learner" && (
              <div className="space-y-6">
                <div className="p-4 bg-maroon-50/50 rounded-2xl border border-maroon-100 text-xs text-maroon-900 font-medium leading-relaxed">
                  These 15 terms apply to all individual students, graduates, and professionals enrolling in JBM courses, cohorts, and workshops.
                </div>

                <div className="space-y-6 text-sm text-slate-700 leading-relaxed divide-y divide-slate-100">
                  {learnerTerms.map((term, i) => (
                    <section key={i} className="pt-5 first:pt-0 space-y-1.5">
                      <h2 className="text-base font-bold text-slate-900">
                        {term.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {term.desc}
                      </p>
                    </section>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Institutional Terms */}
            {activeTab === "institution" && (
              <div className="space-y-6">
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium leading-relaxed">
                  These 15 terms apply to institutional agreements, university workshops, faculty development, and college training partnerships delivered by Johanna Bright Mentors.
                </div>

                <div className="space-y-6 text-sm text-slate-700 leading-relaxed divide-y divide-slate-100">
                  {institutionalTerms.map((term, i) => (
                    <section key={i} className="pt-5 first:pt-0 space-y-1.5">
                      <h2 className="text-base font-bold text-slate-900">
                        {term.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {term.desc}
                      </p>
                    </section>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-slate-100 text-xs text-slate-500">
              For any clarification regarding these terms, reach our compliance team at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-maroon-700 font-semibold underline"
              >
                {siteConfig.contact.email}
              </a>{" "}
              or call +91 {siteConfig.contact.phone}.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
