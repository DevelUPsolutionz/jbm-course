# 🚀 High-Performance Course Registration Platform

A full-stack, enterprise-grade online course discovery, registration, payment, and administrative management platform built with Next.js 15 App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL, Razorpay Checkout, and Resend.

---

## 🌟 Key Features

1. **High-Performance Architecture & Fast LCP:**
   - **Click-to-Load Video Delivery:** Zero video bytes or heavy third-party iframes downloaded on initial page load. Poster thumbnails with reserved 16:9 aspect ratios prevent Cumulative Layout Shifts (CLS = 0).
   - **Ultra-lightweight Bundles:** Shared First-Load JS of ~105 kB with Server Components by default.
   - **Static Site Generation (SSG):** Course pages pre-rendered at build time with `generateStaticParams`.

2. **Courses Catalog:**
   - 🛡️ **Cyber Security & Ethical Hacking**
   - 🗣️ **Professional English & Global Communication**
   - 🤖 **Artificial Intelligence & Applied Machine Learning**
   - Complete with weekly syllabus, learning outcomes, target audience, prerequisites, and video previews.

3. **Secure Registration & Form Validation:**
   - Type-safe client-side and server-side validation using **Zod**.
   - Strict rate-limiting on sensitive registration endpoints.
   - Unique reference code generation (e.g., `CS-260930-A9X2Z`).
   - Clear distinction between *pending payment* and *confirmed paid* states.

4. **Official Razorpay Payment Gateway Integration:**
   - Server-side order creation (`/api/payment/create-order`) with authoritative price lookup (never trusts client prices).
   - Server-side cryptographic HMAC SHA-256 signature verification (`/api/payment/verify`).
   - Webhook handler (`/api/webhooks/razorpay`) with idempotency deduplication to prevent double charging or repeated emails.

5. **Automated Transactional Emails (Resend):**
   - Registration acknowledgment emails with reference codes and program summary.
   - Payment confirmation receipts with transaction IDs upon verified payment.
   - Non-blocking email delivery with graceful fallback logs in local development.

6. **Administrative Management Dashboard:**
   - Protected routes (`/admin/dashboard`, `/admin/registrations`, `/admin/courses`) guarded by Next.js middleware and Supabase Auth.
   - Real-time KPI cards: Total registrations, confirmed seats, pending orders, and gross revenue.
   - Live search, course filtering, payment status filtering, and detailed student inspection modal.

7. **Built-in SEO & Metadata:**
   - Automated dynamic XML sitemap (`/sitemap.xml`) and `robots.txt`.
   - Open Graph tags, Twitter cards, semantic HTML5, and responsive typography.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase (PostgreSQL + Row Level Security)
- **Payments:** Razorpay Checkout
- **Transactional Email:** Resend
- **Deployment:** Vercel

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ or 20+
- npm 9+

### 2. Clone & Install
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials (see `docs/SETUP.md` for instructions).

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── docs/
│   ├── DEPLOYMENT.md              # Vercel & GoDaddy domain guide
│   └── SETUP.md                   # Step-by-step external credentials guide
├── src/
│   ├── app/
│   │   ├── (public)
│   │   │   ├── page.tsx           # Homepage (Hero, Video, Courses, FAQ)
│   │   │   ├── about/page.tsx     # About Institution
│   │   │   ├── contact/page.tsx   # Admissions contact & inquiry form
│   │   │   ├── courses/[slug]/    # Dynamic SSG Course Detail Pages
│   │   │   ├── register/          # Registration form & checkout
│   │   │   ├── register/success/  # Payment & status confirmation page
│   │   │   ├── privacy/page.tsx   # Privacy Policy
│   │   │   ├── terms/page.tsx     # Terms & Conditions
│   │   │   ├── sitemap.ts         # XML sitemap generator
│   │   │   └── robots.ts          # Robots.txt generator
│   │   ├── admin/
│   │   │   ├── login/page.tsx     # Secure admin login
│   │   │   └── (dashboard)/       # Protected dashboard layouts & views
│   │   │       ├── dashboard/     # KPI overview & analytics
│   │   │       ├── registrations/ # Student registration management & table
│   │   │       └── courses/       # Course catalog overview
│   │   └── api/
│   │       ├── register/          # Registration API (Zod + DB + Email)
│   │       ├── payment/           # Razorpay order creation & signature verify
│   │       ├── webhooks/razorpay/ # Idempotent webhook receiver
│   │       └── admin/             # Protected admin reporting endpoints
│   ├── components/
│   │   ├── layout/                # Header & Footer
│   │   ├── ui/                    # CourseCard, VideoEmbed, Button, Badge
│   │   ├── forms/                 # RegistrationForm, ContactForm
│   │   ├── payment/               # RazorpayCheckout modal
│   │   └── admin/                 # AdminSidebar, StatsCard, RegistrationsTable
│   ├── config/
│   │   ├── courses.ts             # Centralized course data & syllabus
│   │   └── site.ts                # Brand settings, navigation & contact info
│   ├── lib/
│   │   ├── supabase/              # Browser, server, and admin clients
│   │   ├── razorpay.ts            # Razorpay order & HMAC verification
│   │   ├── email/send.ts          # Resend templates & delivery
│   │   ├── validations/           # Zod validation schemas
│   │   ├── rate-limit.ts          # API rate limiter
│   │   └── utils.ts               # Formatting & reference helpers
│   ├── middleware.ts              # Route protection middleware
│   └── types/                     # Database & domain TypeScript interfaces
└── supabase/
    ├── migrations/
    │   └── 001_initial_schema.sql # Complete SQL schema with RLS & indexes
    └── seed.sql                   # 3 Initial course programs
```

---

## 🔒 Security Best Practices Implemented

- **No Secret Leakage:** Service-role keys and Razorpay secrets are strictly server-side.
- **Price Tampering Protection:** Prices are resolved on the server by course slug, never accepted from the browser client.
- **HMAC SHA-256 Verification:** Payments and webhooks are cryptographically validated before granting paid status.
- **Row Level Security (RLS):** Supabase RLS prevents unauthorized public access to student records.
- **Idempotency:** Webhook event deduplication prevents duplicate notifications.
