"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeOff, Lock, ShieldAlert, User } from "lucide-react";

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

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(data.redirectTo || "/admin/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed. Access denied.");
        setLoading(false);
      }
    } catch (err: any) {
      setError("Network or server connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Decorative Maroon Shapes in Background */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-maroon-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-maroon-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-maroon-50/50 to-transparent pointer-events-none" />

      {/* Main Wide Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[460px]">
        
        {/* Left Column - Brand Logo & Name */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 md:p-12 bg-slate-50/70 border-b md:border-b-0 md:border-r border-slate-100 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-maroon-50/80 via-transparent to-transparent opacity-80 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <Image
              src="/images/jbm-logo.png"
              alt="Johanna Bright Mentors Logo"
              width={260}
              height={140}
              className="object-contain drop-shadow-sm w-56 sm:w-64 h-auto max-h-48"
              priority
            />
          </div>
        </div>

        {/* Right Column - Form Area */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <div className="w-8 h-1 bg-maroon-700 rounded-full mb-3" />
              <h2 className="text-2xl font-bold text-slate-800">Login as a Admin User</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Administrator Email"
                    className="w-full px-5 py-3.5 rounded-full border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:border-transparent transition-all pr-12"
                  />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Security Key"
                    className="w-full px-5 py-3.5 rounded-full border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:border-transparent transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-maroon-600 transition-colors"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs font-semibold text-red-600 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-bold text-white bg-maroon-700 hover:bg-maroon-800 shadow-lg shadow-maroon-700/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "LOGIN"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
