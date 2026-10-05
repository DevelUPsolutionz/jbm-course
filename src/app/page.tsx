"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/ui/CourseCard";
import { getAllCourses } from "@/config/courses";
import { ChevronRight, Play } from "lucide-react";

export default function HomePage() {
  const courses = getAllCourses();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] text-slate-900 font-sora">
      <Header />

      <main className="flex-grow">
        {/* ================================================================ */}
        {/* HERO SECTION (ZenEd Replica)                                     */}
        {/* ================================================================ */}
        <section className="relative pt-10 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-[#F4EFF9] rounded-[2.5rem] border border-maroon-100 p-8 sm:p-16 lg:p-24 min-h-[600px] flex items-center justify-center overflow-hidden">
              {/* Decorative Background Shapes */}
              <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E9DEFA] rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-maroon-50 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />

              {/* Central Text Content */}
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="absolute -left-20 top-10 max-w-[200px] text-left hidden lg:block">
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    Welcome to our creative education portal, where innovation thrives, and practical execution has no limits.
                  </p>
                </div>

                <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-medium leading-[1.1] tracking-tight text-slate-900">
                  <div className="relative inline-block">
                    Transform
                    {/* Decorative Star */}
                    <svg className="absolute -right-12 -top-8 w-10 h-10 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0l3.5 8.5L24 12l-8.5 3.5L12 24l-3.5-8.5L0 12l8.5-3.5z" />
                    </svg>
                  </div>{" "}
                  Your Career,
                  <br />
                  <span className="relative inline-flex items-center justify-center px-4 py-2 mt-4">
                    <span className="relative z-10 text-maroon-800">at Your Pace</span>
                    {/* Sunburst background shape */}
                    <svg className="absolute inset-0 w-full h-full text-amber-200 scale-150 -z-10 opacity-60" viewBox="0 0 200 100" fill="currentColor">
                      <path d="M100 0l15 30 35-5-10 35 30 15-30 15 10 35-35-5-15 30-15-30-35 5 10-35-30-15 30-15-10-35 35 5z" />
                    </svg>
                  </span>
                </h1>

                <div className="mt-14 relative z-20">
                  <Link
                    href="#courses"
                    className="inline-flex items-center justify-center px-12 py-4 rounded-full text-sm font-semibold text-white bg-maroon-600 hover:bg-maroon-700 shadow-xl transition-transform hover:scale-105"
                  >
                    Lets Start
                  </Link>
                </div>
              </div>

              {/* Floating Image element (Girl) */}
              <div className="absolute bottom-10 left-10 hidden lg:block">
                <div className="relative w-48 h-56 bg-maroon-800 rounded-t-full rounded-bl-full overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=400&q=80"
                    alt="Student learning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Decorative shapes */}
              <svg className="absolute bottom-20 right-20 w-16 h-16 text-rose-300 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
              </svg>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* TOP COURSES SECTION                                              */}
        {/* ================================================================ */}
        <section id="courses" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-semibold text-slate-900 mb-4 tracking-tight">Browse Our Top Courses</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Welcome to our renowned educational portal for ambitious individuals, where technical capability is nurtured and professional growth knows no limits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FEATURE 1: Make Class Material Instantly Studible                */}
        {/* ================================================================ */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Image Side */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#81C784] transform -rotate-3 rounded-3xl scale-95 origin-bottom-left" />
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Class material"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="max-w-lg">
                <h2 className="text-4xl font-semibold text-slate-900 leading-[1.2] mb-6 tracking-tight">
                  Experience Practical Lab Sandboxes at Your Pace
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                  Turn theoretical concepts into high-demand skills through our interactive sandboxes, practical exercises, and structured cloud environments designed for accelerated learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FEATURE 2: One Ultimate Study App                                */}
        {/* ================================================================ */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="max-w-lg order-2 lg:order-1 lg:pl-12">
                <h2 className="text-4xl font-semibold text-slate-900 leading-[1.2] mb-6 tracking-tight">
                  One Ultimate Mentorship Program for Every Goal
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                  From Cyber Security to AI Foundation, track your progress, review recorded sessions, and get live faculty feedback all in one integrated learning platform.
                </p>
              </div>

              {/* Right Image Side */}
              <div className="relative order-1 lg:order-2">
                <div className="absolute inset-0 bg-[#D1C4E9] rounded-t-full rounded-bl-full scale-110 transform translate-x-10 translate-y-10" />
                {/* Decorative Green Ring */}
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full border-4 border-[#81C784]" />
                
                <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white bg-slate-100 z-10 max-w-md mx-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                    alt="Study App"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* STATS/INSTRUCTORS GRID (ZenEd Pill Marquee style)                */}
        {/* ================================================================ */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-900 tracking-tight">
              Education Which Promotes <span className="text-maroon-500 italic">Skill</span>
            </h2>
            <p className="text-sm text-slate-500 mt-4 max-w-xl mx-auto">
              Our placement-oriented programs include everything you need to begin executing and earning immediately.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4 overflow-hidden py-10 px-4 select-none">
            {/* Row 1 */}
            <div className="flex items-center justify-center gap-4 flex-nowrap min-w-max mx-auto translate-x-12">
              <div className="flex items-center gap-3 bg-[#F8BBD0] rounded-full p-2 pr-6 shadow-sm">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">Ananya S.</div>
                  <div className="text-[10px] text-slate-600">Alumni 2024</div>
                </div>
              </div>
              <div className="flex items-center justify-center px-10 py-4 bg-[#E1F5FE] rounded-full shadow-sm">
                <span className="text-3xl font-bold text-slate-800">1,200+</span>
              </div>
              <div className="flex items-center gap-3 bg-[#FFE082] rounded-full p-2 pr-6 shadow-sm">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Avatar" width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">Rahul M.</div>
                  <div className="text-[10px] text-slate-600">Alumni 2024</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#D1C4E9] rounded-full p-2 pr-6 shadow-sm">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Avatar" width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">Priya K.</div>
                  <div className="text-[10px] text-slate-600">Placed 2024</div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-center gap-4 flex-nowrap min-w-max mx-auto -translate-x-10">
              <div className="flex items-center gap-3 bg-[#E0E0E0] rounded-full p-2 pr-6 shadow-sm">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar" width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">Karthik R.</div>
                  <div className="text-[10px] text-slate-600">Alumni 2024</div>
                </div>
              </div>
              <div className="flex items-center justify-center px-12 py-4 bg-[#C8E6C9] rounded-full shadow-sm text-3xl font-bold text-[#2E7D32]">
                Mentors
              </div>
              <div className="flex items-center gap-3 bg-[#B3E5FC] rounded-full p-2 pr-6 shadow-sm">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80" alt="Avatar" width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">Sneha V.</div>
                  <div className="text-[10px] text-slate-600">Alumni 2024</div>
                </div>
              </div>
              <div className="flex items-center justify-center px-10 py-4 bg-[#FFCC80] rounded-full shadow-sm text-3xl font-bold text-slate-800">
                100%
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FAQ SECTION (Clean bordered list)                                */}
        {/* ================================================================ */}
        <section id="faq" className="py-20 bg-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              "Are the training cohorts conducted live or recorded?",
              "What payment options are supported via Razorpay?",
              "How do I apply coupon codes for extra discounts?",
              "Do I receive an official admission confirmation and receipt?",
              "What is the batch schedule and class timings?"
            ].map((q, i) => (
              <div key={i} className="flex items-center justify-between py-5 border-b border-slate-200 group cursor-pointer hover:border-maroon-300 transition-colors">
                <span className="text-sm font-semibold text-slate-700 group-hover:text-maroon-800">{q}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-maroon-800" />
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* CONTACT SECTION                                                  */}
        {/* ================================================================ */}
        <section id="contact" className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">Get in Touch</h2>
            <p className="text-slate-600 text-sm mb-10">Have questions about our programs? Our admissions team is here to help you.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
                <p className="text-sm text-maroon-700">hello.johannabrightmentors@gmail.com</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Call / WhatsApp</h3>
                <p className="text-sm text-maroon-700">+91 8778578437</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Location</h3>
                <p className="text-sm text-slate-600">Coimbatore, Tamil Nadu</p>
              </div>
            </div>
            
            <div className="mt-10">
              <Link href="https://wa.me/918778578437" target="_blank" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-md">
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================ */}
      {/* ZENED STYLE FOOTER                                               */}
      {/* ================================================================ */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 pb-8 pt-10">
        <div className="max-w-7xl mx-auto bg-[#F9FBE7] rounded-[2rem] p-10 sm:p-16 border border-[#E6EE9C]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Col 1 */}
            <div className="md:col-span-5 space-y-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/images/jbm-logo.png" alt="JBM" width={32} height={32} className="object-contain" />
                <span className="text-xl font-bold text-slate-900">JBM</span>
              </Link>
              <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
                Education theme designed for learning, teaching, engaging, and empowering ambitious learners.
              </p>
              <div className="flex items-center bg-white rounded-full p-1 border border-slate-200 max-w-xs shadow-sm">
                <input type="email" placeholder="Your email" className="w-full bg-transparent px-4 text-xs focus:outline-none" />
                <button className="w-8 h-8 rounded-full bg-[#1B5E20] text-white flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Col 2 */}
            <div className="md:col-span-3 space-y-4">
              <Link href="/about" className="block text-sm font-semibold text-slate-700 hover:text-maroon-800">About</Link>
              <Link href="/#courses" className="block text-sm font-semibold text-slate-700 hover:text-maroon-800">Courses</Link>
              <Link href="/contact" className="block text-sm font-semibold text-slate-700 hover:text-maroon-800">Contact</Link>
              <Link href="/register" className="block text-sm font-semibold text-slate-700 hover:text-maroon-800">Admissions</Link>
            </div>

            {/* Col 3 */}
            <div className="md:col-span-4 space-y-4 text-sm text-slate-600 font-medium">
              <p>+91 8778578437</p>
              <p>hello.johannabrightmentors@gmail.com</p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#E6EE9C] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-maroon-800">Terms and Conditions</Link>
              <Link href="/privacy" className="hover:text-maroon-800">Privacy Policy</Link>
            </div>
            <p>Copyright © 2026 Johanna Bright Mentors | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
