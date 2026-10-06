"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "general",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", purpose: "general", message: "" });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center shadow-lg">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
        <p className="text-slate-600 mb-6">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="relative text-left">
      <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Enquiry Form</h3>
        <p className="text-slate-600 mt-2 text-sm">Have a question or want to discuss a program? Fill out the form below and we'll reach out.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {status === "error" && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 transition-shadow bg-slate-50 text-slate-900"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 transition-shadow bg-slate-50 text-slate-900"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 transition-shadow bg-slate-50 text-slate-900"
              placeholder="+91 98765 43210"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="purpose" className="text-sm font-semibold text-slate-700">Purpose of Inquiry</label>
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 transition-shadow bg-slate-50 appearance-none text-slate-900"
            >
              <option value="general">General Inquiry</option>
              <option value="course">Course Details</option>
              <option value="institution">Institutional Partnership</option>
              <option value="corporate">Corporate Training</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-slate-700">Your Message <span className="text-red-500">*</span></label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 transition-shadow bg-slate-50 resize-y text-slate-900"
            placeholder="How can we help you today?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-900 hover:to-maroon-950 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
