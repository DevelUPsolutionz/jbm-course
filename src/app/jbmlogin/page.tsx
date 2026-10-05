"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldAlert, ArrowRight } from "lucide-react";

// ─── Static Admin Credentials ────────────────────────────────────────────────
// These are static-only. Do NOT surface this route in any public UI.
const STATIC_USERNAME = "jbmadmin@jbm.edu";
const STATIC_PASSWORD = "JBM@Admin2025!";

export default function JbmHiddenLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate slight delay for UX
    await new Promise((r) => setTimeout(r, 600));

    if (
      email.trim().toLowerCase() === STATIC_USERNAME.toLowerCase() &&
      password === STATIC_PASSWORD
    ) {
      // Set a session cookie so admin pages know we are authenticated
      document.cookie = "jbm_admin_auth=true; path=/; max-age=86400; SameSite=Strict";
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      {/* Hidden — no branding in page title or H1 that would reveal this route */}
      <div className="w-full max-w-md space-y-8">
        {/* Logo + header */}
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-md p-2 flex items-center justify-center">
            <Image
              src="/images/jbm-logo.png"
              alt="JBM"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Admin Access Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authorized personnel only. All access is logged.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
          {/* Security badge */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-maroon-50 border border-maroon-200">
            <ShieldAlert className="w-4 h-4 text-maroon-800 flex-shrink-0" />
            <span className="text-xs font-semibold text-maroon-800">
              Secure Administrative Login — JBM Internal
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@jbm.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-lg shadow-maroon-900/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-slate-400">
          This page is for authorized JBM administrators only.
          Unauthorized access attempts are logged and reported.
        </p>
      </div>
    </div>
  );
}
