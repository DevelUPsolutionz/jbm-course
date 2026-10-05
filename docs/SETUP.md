# ⚙️ Credentials & Service Configuration Guide

This document lists all required external credentials, default fallbacks, and instructions for enabling production integrations.

---

## 1. Summary of Environment Variables

| Variable Name | Environment | Purpose | Default / Fallback Mode |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_NAME` | Public | Brand display name | `"Apex Academy"` |
| `NEXT_PUBLIC_SITE_TAGLINE` | Public | Hero tagline text | `"Industry-Leading Tech & Professional Training"` |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase API URL | Gracefully handled if unconfigured |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase Anon Key | Gracefully handled if unconfigured |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only | Admin Supabase operations | Gracefully handled if unconfigured |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public | Razorpay Checkout Key ID | `rzp_test_placeholder` |
| `RAZORPAY_KEY_ID` | Server-Only | Razorpay Key ID | Test order creation |
| `RAZORPAY_KEY_SECRET` | Server-Only | Razorpay Secret for HMAC verification | Safe test verification |
| `RAZORPAY_WEBHOOK_SECRET` | Server-Only | Webhook digital signature verification | Skipped in development |
| `RESEND_API_KEY` | Server-Only | Resend API Key | Logs email to console if omitted |
| `EMAIL_FROM` | Server-Only | Verified sender email | `"Apex Academy <admissions@domain.com>"` |
| `ADMIN_EMAIL` | Server-Only | Admin alert recipient | `"admin@domain.com"` |

---

## 2. Free-Tier Quotas & Estimated Costs

| Service | Free Tier Allowance | Estimated Monthly Cost |
|---|---|---|
| **Vercel** (Hobby) | 100 GB Bandwidth, Unlimited SSL | ₹0 / month |
| **Supabase** (Free Tier) | 500 MB Database, 50,000 Monthly Active Users | ₹0 / month |
| **Razorpay** | Standard Payment Gateway | 2% + GST per domestic transaction |
| **Resend** (Free Tier) | 3,000 emails / month, 100 emails / day | ₹0 / month |
| **GoDaddy** | Custom `.com` or `.in` domain | ~₹800 – ₹1,200 / year |

Total estimated ongoing infrastructure cost: **~₹0 / month** (plus normal domain renewal and 2% per successful payment). This perfectly adheres to the small-business project budget.
