# 🌐 Production Deployment Guide

This guide walks you through deploying the Course Registration Platform to **Vercel**, configuring **Supabase**, and connecting your custom domain purchased through **GoDaddy**.

---

## 1. Supabase Database & Auth Setup

1. **Create a Project:**
   - Go to [Supabase](https://supabase.com) and click **New Project**.
   - Select your preferred region (e.g. `ap-south-1` Mumbai for Indian audience).

2. **Apply Database Migration & Seed Data:**
   - Navigate to the **SQL Editor** in your Supabase dashboard.
   - Copy the contents of `supabase/migrations/001_initial_schema.sql` and click **Run**.
   - Copy the contents of `supabase/seed.sql` and click **Run**.

3. **Obtain API Keys:**
   - Go to **Project Settings** > **API**.
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role secret` key → `SUPABASE_SERVICE_ROLE_KEY` *(Never expose in public code)*.

4. **Create Admin User:**
   - Go to **Authentication** > **Users** > **Add User**.
   - Enter your administrator email and a strong password.

---

## 2. Razorpay Payment Gateway Setup

1. **Get API Keys:**
   - Log in to your [Razorpay Dashboard](https://dashboard.razorpay.com).
   - Switch to **Test Mode** (or **Live Mode** when KYC is verified).
   - Go to **Settings** > **API Keys** > **Generate Key**.
   - Copy `Key Id` → `NEXT_PUBLIC_RAZORPAY_KEY_ID` & `RAZORPAY_KEY_ID`.
   - Copy `Key Secret` → `RAZORPAY_KEY_SECRET`.

2. **Configure Webhook:**
   - Go to **Settings** > **Webhooks** > **Add New Webhook**.
   - Webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
   - Secret: Choose a strong secret string → `RAZORPAY_WEBHOOK_SECRET`.
   - Active Events: Select `payment.captured`, `order.paid`, and `payment.failed`.

---

## 3. Resend Transactional Email Setup

1. Sign up at [Resend](https://resend.com).
2. Go to **API Keys** > **Create API Key** → `RESEND_API_KEY`.
3. Go to **Domains** > **Add Domain** and follow the DNS verification instructions to send emails from your custom domain (e.g., `admissions@yourdomain.com`).

---

## 4. Deploying to Vercel

1. **Import Git Repository:**
   - Push your code to GitHub / GitLab / Bitbucket.
   - Go to [Vercel Dashboard](https://vercel.com) and click **Add New** > **Project**.
   - Import your repository.

2. **Set Environment Variables in Vercel:**
   Add the following under **Settings** > **Environment Variables**:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=Apex Academy
   NEXT_PUBLIC_SITE_TAGLINE=Industry-Leading Tech & Language Training
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_yourkeyid (or test key)
   RAZORPAY_KEY_ID=rzp_live_yourkeyid (or test key)
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   RESEND_API_KEY=re_your_api_key
   EMAIL_FROM=Apex Academy <admissions@yourdomain.com>
   ADMIN_EMAIL=admin@yourdomain.com
   ```

3. **Deploy:**
   - Click **Deploy**. Vercel will automatically build and publish your project globally on their Edge Network.

---

## 5. Connecting GoDaddy Custom Domain

1. **Add Domain in Vercel:**
   - In Vercel, navigate to **Settings** > **Domains**.
   - Enter your domain (e.g., `yourdomain.com`) and click **Add**.
   - Vercel will prompt you to add DNS records.

2. **Configure DNS Records in GoDaddy:**
   - Log in to [GoDaddy Domain Portfolio](https://dcc.godaddy.com/control/portfolio).
   - Select your domain and click **DNS** / **Manage DNS**.
   - Add/Edit the following records:

| Type | Name / Host | Value / Points to | TTL |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | 1 Hour / Automatic |
| **CNAME** | `www` | `cname.vercel-dns.com.` | 1 Hour / Automatic |

3. **SSL Certificate Verification:**
   - Once DNS propagates (usually 5–30 minutes), Vercel automatically issues an SSL certificate.
   - Test by visiting `https://yourdomain.com` in your browser.

---

## 6. Post-Deployment Checklist

- [ ] Visit `https://yourdomain.com` and verify the homepage renders with video poster.
- [ ] Click the video Play button to confirm on-demand video playback.
- [ ] Navigate to `/courses/cyber-security`, `/courses/english`, and `/courses/artificial-intelligence`.
- [ ] Submit a test registration form on `/register`.
- [ ] Perform a test Razorpay payment.
- [ ] Verify that `/register/success` shows payment confirmation.
- [ ] Check inbox for automated receipt email.
- [ ] Log in to `/admin/login` and verify stats and registrations appear in `/admin/dashboard`.
