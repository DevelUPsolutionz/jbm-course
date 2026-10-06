"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2, ShieldCheck, Smartphone, Monitor } from "lucide-react";

export default function EmailPreviewPage() {
  const [activeTab, setActiveTab] = useState<"registration" | "payment">("registration");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const sampleRegistrationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmed - JOHANNA BRIGHT MENTORS</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 24px 12px;
      box-sizing: border-box;
    }
    .main-card {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
    }
    .header-bar {
      background: linear-gradient(135deg, #800020 0%, #5a0016 100%);
      padding: 30px 24px 24px 24px;
      text-align: center;
    }
    .brand-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 1.5px;
      margin: 0;
      text-transform: uppercase;
    }
    .brand-slogan {
      display: inline-block;
      margin-top: 6px;
      padding: 3px 12px;
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 9999px;
      color: #fef3c7;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content-body {
      padding: 32px 28px;
    }
    .greeting {
      font-size: 17px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 14px 0;
    }
    .lead-text {
      font-size: 14.5px;
      line-height: 1.65;
      color: #475569;
      margin: 0 0 24px 0;
    }
    .ref-box {
      background: #fff5f7;
      border: 1.5px dashed #f43f5e;
      border-radius: 12px;
      padding: 16px 20px;
      text-align: center;
      margin: 0 0 26px 0;
    }
    .ref-label {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #9f1239;
      margin: 0 0 4px 0;
    }
    .ref-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 20px;
      font-weight: 800;
      color: #800020;
      letter-spacing: 1.5px;
      margin: 0;
    }
    .summary-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 0 0 24px 0;
    }
    .summary-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 12px 0;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
    .summary-row {
      padding: 7px 0;
      font-size: 13.5px;
    }
    .summary-label {
      color: #64748b;
      font-weight: 500;
    }
    .summary-val {
      color: #0f172a;
      font-weight: 700;
      text-align: right;
    }
    .steps-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 0 0 24px 0;
    }
    .steps-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .step-item {
      font-size: 13px;
      color: #334155;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    .help-card {
      background: #f1f5f9;
      border-radius: 10px;
      padding: 16px 20px;
      margin: 0 0 24px 0;
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
    }
    .help-card strong {
      color: #0f172a;
    }
    .help-card a {
      color: #800020;
      font-weight: 700;
      text-decoration: none;
    }
    .footer {
      background: #0f172a;
      padding: 24px 28px;
      text-align: center;
      color: #94a3b8;
      font-size: 11.5px;
      line-height: 1.6;
    }
    .footer a {
      color: #cbd5e1;
      text-decoration: none;
    }
    .footer-divider {
      height: 1px;
      background: #334155;
      margin: 14px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <div class="header-bar">
        <h1 class="brand-title">JOHANNA BRIGHT MENTORS</h1>
        <div class="brand-slogan">✨ ALWAYS BEST LESSON</div>
      </div>

      <div class="content-body">
        <p class="greeting">Dear Jayanth Kumar,</p>
        
        <p class="lead-text">
          Thank you for initiating your enrollment with <strong>JOHANNA BRIGHT MENTORS</strong>. We are thrilled to welcome you to our professional mentorship and career transformation community. Your registration has been successfully recorded in our academic registry.
        </p>

        <div class="ref-box">
          <div class="ref-label">Official Registration Reference</div>
          <div class="ref-code">JBM-2026-AI-8492</div>
        </div>

        <div class="summary-card">
          <div class="summary-title">Program Summary</div>
          <table>
            <tr class="summary-row">
              <td class="summary-label">Selected Program:</td>
              <td class="summary-val">AI Foundation & Productivity</td>
            </tr>
            <tr class="summary-row">
              <td class="summary-label">Training Format:</td>
              <td class="summary-val">Live Mentorship + Hands-on Labs</td>
            </tr>
            <tr class="summary-row">
              <td class="summary-label">Course Fee:</td>
              <td class="summary-val">₹4,999</td>
            </tr>
            <tr class="summary-row">
              <td class="summary-label">Registration Status:</td>
              <td class="summary-val" style="color: #b45309;">Application Recorded</td>
            </tr>
          </table>
        </div>

        <div class="steps-box">
          <div class="steps-title">What Happens Next?</div>
          <div class="step-item">
            <strong>1. Fee Verification / Payment:</strong> If payment was not completed at registration, you can finalize it through your admissions link or via Razorpay on the platform.
          </div>
          <div class="step-item">
            <strong>2. Admissions Onboarding:</strong> Our academic coordinator will reach out via WhatsApp/Phone with your orientation schedule, batch timings, and learning portal access.
          </div>
          <div class="step-item">
            <strong>3. Live Batch Access:</strong> You will receive the mentorship link and course repository ahead of the opening session.
          </div>
        </div>

        <div class="help-card">
          <strong>Need immediate assistance or have a question?</strong><br>
          📞 Phone: <a href="tel:8778578437">+91 87785 78437</a><br>
          💬 WhatsApp: <a href="https://wa.me/918778578437">Chat with Admissions Mentor</a><br>
          ✉️ Email: <a href="mailto:hello.johannabrightmentors@gmail.com">hello.johannabrightmentors@gmail.com</a>
        </div>

        <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.5;">
          Warm regards,<br>
          <strong style="color: #0f172a; font-size: 14px;">Admissions & Mentorship Team</strong><br>
          JOHANNA BRIGHT MENTORS • <em>Learn. Practice. Build. Grow.</em>
        </p>
      </div>

      <div class="footer">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #ffffff;">JOHANNA BRIGHT MENTORS</p>
        <p style="margin: 0;">Coimbatore, Tamil Nadu, India • <a href="https://www.johannabrightmentors.com">www.johannabrightmentors.com</a></p>
        <div class="footer-divider"></div>
        <p style="margin: 0; font-size: 10.5px; color: #64748b;">
          This is an official automated communication from JOHANNA BRIGHT MENTORS. Please keep your Registration Reference (<strong>JBM-2026-AI-8492</strong>) safe for all future communications.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const samplePaymentHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Receipt - JOHANNA BRIGHT MENTORS</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 24px 12px;
      box-sizing: border-box;
    }
    .main-card {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
    }
    .header-bar {
      background: linear-gradient(135deg, #800020 0%, #5a0016 100%);
      padding: 30px 24px 24px 24px;
      text-align: center;
    }
    .brand-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 1.5px;
      margin: 0;
      text-transform: uppercase;
    }
    .brand-subtitle {
      color: #cbd5e1;
      font-size: 11.5px;
      letter-spacing: 1px;
      margin: 6px 0 0 0;
      text-transform: uppercase;
      font-weight: 600;
    }
    .content-body {
      padding: 32px 28px;
    }
    .success-badge-container {
      text-align: center;
      margin: 0 0 24px 0;
    }
    .success-badge {
      display: inline-block;
      background: #ecfdf5;
      border: 1.5px solid #10b981;
      color: #065f46;
      font-size: 13px;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: 9999px;
      letter-spacing: 0.5px;
    }
    .greeting {
      font-size: 17px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 12px 0;
    }
    .lead-text {
      font-size: 14.5px;
      line-height: 1.65;
      color: #475569;
      margin: 0 0 24px 0;
    }
    .receipt-card {
      background: #ffffff;
      border: 1.5px solid #0f172a;
      border-radius: 12px;
      overflow: hidden;
      margin: 0 0 26px 0;
    }
    .receipt-body {
      padding: 18px 20px;
      background: #ffffff;
    }
    .receipt-row {
      padding: 8px 0;
      font-size: 13.5px;
      border-bottom: 1px solid #f1f5f9;
    }
    .receipt-row:last-child {
      border-bottom: none;
    }
    .receipt-label {
      color: #64748b;
      font-weight: 500;
    }
    .receipt-val {
      color: #0f172a;
      font-weight: 700;
      text-align: right;
    }
    .total-row {
      background: #f8fafc;
      padding: 14px 20px;
      border-top: 1.5px dashed #cbd5e1;
    }
    .total-label {
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
    }
    .total-val {
      font-size: 18px;
      font-weight: 800;
      color: #15803d;
      text-align: right;
    }
    .onboarding-card {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 0 0 24px 0;
    }
    .onboarding-title {
      font-size: 13px;
      font-weight: 700;
      color: #92400e;
      text-transform: uppercase;
      margin: 0 0 8px 0;
    }
    .onboarding-text {
      font-size: 13px;
      color: #78350f;
      line-height: 1.6;
      margin: 0;
    }
    .help-card {
      background: #f1f5f9;
      border-radius: 10px;
      padding: 16px 20px;
      margin: 0 0 24px 0;
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
    }
    .help-card a {
      color: #800020;
      font-weight: 700;
      text-decoration: none;
    }
    .footer {
      background: #0f172a;
      padding: 24px 28px;
      text-align: center;
      color: #94a3b8;
      font-size: 11.5px;
      line-height: 1.6;
    }
    .footer a {
      color: #cbd5e1;
      text-decoration: none;
    }
    .footer-divider {
      height: 1px;
      background: #334155;
      margin: 14px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <div class="header-bar">
        <h1 class="brand-title">JOHANNA BRIGHT MENTORS</h1>
        <p class="brand-subtitle">Official Payment Receipt & Admission Confirmation</p>
      </div>

      <div class="content-body">
        <div class="success-badge-container">
          <div class="success-badge">✓ PAYMENT VERIFIED & ADMISSION CONFIRMED</div>
        </div>

        <p class="greeting">Dear Jayanth Kumar,</p>
        
        <p class="lead-text">
          Congratulations! Your payment for <strong>AI Foundation & Productivity</strong> has been successfully received and validated. Your official seat in the upcoming cohort is now formally confirmed.
        </p>

        <div class="receipt-card">
          <table style="width: 100%;">
            <tr>
              <td style="background: #0f172a; color: #ffffff; padding: 12px 20px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
                Official Tax / Payment Invoice
              </td>
              <td style="background: #0f172a; color: #38bdf8; padding: 12px 20px; font-size: 12px; font-weight: 700; text-align: right;">
                Date: 06 October 2026
              </td>
            </tr>
          </table>
          
          <div class="receipt-body">
            <table>
              <tr class="receipt-row">
                <td class="receipt-label">Student Name:</td>
                <td class="receipt-val">Jayanth Kumar</td>
              </tr>
              <tr class="receipt-row">
                <td class="receipt-label">Registration Reference:</td>
                <td class="receipt-val" style="font-family: monospace; color: #800020;">JBM-2026-AI-8492</td>
              </tr>
              <tr class="receipt-row">
                <td class="receipt-label">Razorpay Transaction ID:</td>
                <td class="receipt-val" style="font-family: monospace; font-size: 12.5px;">pay_PkZ8x9102Lq</td>
              </tr>
              <tr class="receipt-row">
                <td class="receipt-label">Enrolled Program:</td>
                <td class="receipt-val">AI Foundation & Productivity</td>
              </tr>
              <tr class="receipt-row">
                <td class="receipt-label">Payment Mode:</td>
                <td class="receipt-val">Online Payment (Razorpay Secure Gateway)</td>
              </tr>
              <tr class="receipt-row">
                <td class="receipt-label">Admission Status:</td>
                <td class="receipt-val" style="color: #16a34a;">Confirmed & Active</td>
              </tr>
            </table>
          </div>

          <table class="total-row">
            <tr>
              <td class="total-label">Total Amount Paid:</td>
              <td class="total-val">₹4,999</td>
            </tr>
          </table>
        </div>

        <div class="onboarding-card">
          <div class="onboarding-title">📚 Next Step: Batch Orientation & Access</div>
          <p class="onboarding-text">
            Our Academic Coordinator will connect with you via Phone/WhatsApp within <strong>24 business hours</strong> to share your live class schedule, private Discord / Community group link, and repository access.
          </p>
        </div>

        <div class="help-card">
          <strong>Have any questions regarding your batch or orientation?</strong><br>
          📞 Phone: <a href="tel:8778578437">+91 87785 78437</a><br>
          💬 WhatsApp: <a href="https://wa.me/918778578437">Direct Admissions Chat</a><br>
          ✉️ Email: <a href="mailto:hello.johannabrightmentors@gmail.com">hello.johannabrightmentors@gmail.com</a>
        </div>

        <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.5;">
          Warm regards,<br>
          <strong style="color: #0f172a; font-size: 14px;">Admissions & Academic Directorate</strong><br>
          JOHANNA BRIGHT MENTORS • <em>Learn. Practice. Build. Grow.</em>
        </p>
      </div>

      <div class="footer">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #ffffff;">JOHANNA BRIGHT MENTORS</p>
        <p style="margin: 0;">Coimbatore, Tamil Nadu, India • <a href="https://www.johannabrightmentors.com">www.johannabrightmentors.com</a></p>
        <div class="footer-divider"></div>
        <p style="margin: 0; font-size: 10.5px; color: #64748b;">
          This document serves as your official payment receipt. Please retain this email for your educational records and tax verification.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
          <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
            <Mail className="w-5 h-5 text-rose-400" />
            <h1 className="text-base font-bold text-white tracking-wide">Live Email Template Preview</h1>
          </div>
        </div>

        {/* Tab switcher & device mode */}
        <div className="flex items-center gap-3">
          {/* Email Type selector */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center gap-1 border border-slate-700">
            <button
              onClick={() => setActiveTab("registration")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "registration"
                  ? "bg-maroon-800 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              1. Registration Email
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "payment"
                  ? "bg-maroon-800 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              2. Payment Receipt Email
            </button>
          </div>

          {/* Device viewport toggle */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center gap-1 border border-slate-700">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-1.5 rounded-lg transition ${
                previewMode === "desktop" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Desktop View (600px)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-1.5 rounded-lg transition ${
                previewMode === "mobile" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Mobile View (380px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Meta Bar */}
      <div className="bg-slate-950/70 border-b border-slate-800/80 px-6 py-2.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>
            <strong className="text-slate-300">From:</strong> Johanna Bright Mentors &lt;noreply@johannabrightmentors.com&gt;
          </span>
          <span>
            <strong className="text-slate-300">Subject:</strong>{" "}
            {activeTab === "registration"
              ? "Registration Confirmed: AI Foundation & Productivity [JBM-2026-AI-8492]"
              : "Official Payment Receipt: AI Foundation & Productivity [JBM-2026-AI-8492]"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Resend Ready • 100% Compatible with Gmail/Apple Mail</span>
        </div>
      </div>

      {/* Live Iframe Sandbox Preview */}
      <main className="flex-1 bg-slate-900 flex items-center justify-center p-6 overflow-auto">
        <div
          className={`transition-all duration-300 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700 ${
            previewMode === "mobile" ? "w-[400px] h-[780px]" : "w-[680px] h-[820px]"
          }`}
        >
          <iframe
            srcDoc={activeTab === "registration" ? sampleRegistrationHtml : samplePaymentHtml}
            className="w-full h-full border-0"
            title="Email Preview"
          />
        </div>
      </main>
    </div>
  );
}
