"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h4 className="text-base font-bold text-slate-900">Inquiry Received!</h4>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Thank you for reaching out. A Johanna Bright Mentors admissions counselor will respond to your email or call within 24 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold text-maroon-800 hover:underline pt-2 block mx-auto"
        >
          Submit another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone / WhatsApp</label>
        <input
          type="tel"
          required
          placeholder="+91 87785 78437"
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Interested Course</label>
        <select
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800"
        >
          <option value="ai">AI Foundation & Productivity (30 Days)</option>
          <option value="english">JBM Professional English (40 Days)</option>
          <option value="cyber">Networking in Cyber Security (30 Days)</option>
          <option value="general">General Counseling / Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message / Inquiries</label>
        <textarea
          rows={4}
          required
          placeholder="Tell us what you'd like to learn or any questions you have..."
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-maroon-800/20 focus:border-maroon-800"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-md shadow-maroon-900/20 transition-all flex items-center justify-center gap-2"
      >
        <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
