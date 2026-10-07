"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeOff, Lock, ShieldAlert, ShieldCheck, User } from "lucide-react";

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

      {/* Top Logo */}
      <div className="relative z-10 mb-8 flex flex-col items-center space-y-2">
        <Image
          src="/images/jbm-logo.png"
          alt="JBM Logo"
          width={64}
          height={64}
          className="object-contain drop-shadow-sm"
          priority
        />
        <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">
          Johanna Bright Mentors
        </h1>
      </div>

      {/* Main Wide Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Column - Illustration area */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 bg-slate-50/50 border-r border-slate-100 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-maroon-50 via-transparent to-transparent opacity-60" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="relative w-48 h-48 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100">
               {/* Composed Icon Graphic */}
               <ShieldCheck className="w-24 h-24 text-maroon-700 drop-shadow-sm" strokeWidth={1.5} />
               <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-md border border-slate-100">
                  <User className="w-6 h-6 text-slate-600" />
               </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-800">Secure Access</h2>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                Administrative control portal. Cryptographically verified access with 256-Bit SSL encryption.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Form area */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-8">
            <div>
              <div className="w-8 h-1 bg-maroon-700 rounded-full mb-4" />
              <h2 className="text-2xl font-bold text-slate-800">Login as a Admin User</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-xs font-semibold text-red-600 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-bold text-white bg-maroon-700 hover:bg-maroon-800 shadow-lg shadow-maroon-700/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
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

            <div className="pt-6 text-center space-y-2">
              <p className="text-xs text-slate-500">
                Forget your password?
              </p>
              <p className="text-xs font-semibold text-maroon-700 hover:text-maroon-800 cursor-pointer transition-colors">
                Get help Signed in.
              </p>
            </div>
            
            <div className="pt-8 text-center">
              <p className="text-[10px] text-slate-400">
                Terms of use. Privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
