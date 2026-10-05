-- ==============================================================================
-- 001_initial_schema.sql
-- High-Performance Course Registration Platform Database Schema
-- Supabase PostgreSQL + Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    fee INTEGER NOT NULL CHECK (fee >= 0), -- Amount in INR (or lowest currency unit)
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    duration VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL DEFAULT 'Beginner to Advanced',
    intro_video_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT true,
    syllabus JSONB NOT NULL DEFAULT '[]'::jsonb,
    learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
    prerequisites JSONB NOT NULL DEFAULT '[]'::jsonb,
    target_audience JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for course lookup by slug and active status
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_is_active ON public.courses(is_active);

-- 2. REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_reference VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE RESTRICT,
    course_slug VARCHAR(100) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL CHECK (amount >= 0),
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    message TEXT,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
    terms_accepted BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast filtering and searching
CREATE INDEX IF NOT EXISTS idx_registrations_ref ON public.registrations(registration_reference);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_course_id ON public.registrations(course_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON public.registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);

-- 3. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE RESTRICT,
    provider VARCHAR(50) NOT NULL DEFAULT 'razorpay',
    provider_order_id VARCHAR(255) NOT NULL,
    provider_payment_id VARCHAR(255),
    provider_signature VARCHAR(500),
    amount INTEGER NOT NULL CHECK (amount >= 0),
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    status VARCHAR(50) NOT NULL DEFAULT 'created', -- 'created', 'captured', 'failed', 'refunded'
    raw_payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for payment queries
CREATE INDEX IF NOT EXISTS idx_payments_registration_id ON public.payments(registration_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(provider_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_id ON public.payments(provider_payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- 4. WEBHOOK LOGS (For idempotency & debugging)
CREATE TABLE IF NOT EXISTS public.webhook_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(255) UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(50) NOT NULL DEFAULT 'processed'
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_event_id ON public.webhook_logs(event_id);

-- 5. TRIGGER FOR AUTO UPDATING updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_courses_updated_at ON public.courses;
CREATE TRIGGER set_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_registrations_updated_at ON public.registrations;
CREATE TRIGGER set_registrations_updated_at
BEFORE UPDATE ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_payments_updated_at ON public.payments;
CREATE TRIGGER set_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;

-- Courses: Public can read active courses
CREATE POLICY "Public can view active courses"
ON public.courses FOR SELECT
USING (is_active = true);

-- Courses: Authenticated admin can read/write everything
CREATE POLICY "Admins can manage all courses"
ON public.courses FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Registrations: Public cannot directly select other registrations
-- Public can INSERT their own registration through the API
CREATE POLICY "Allow registration creation via API"
ON public.registrations FOR INSERT
WITH CHECK (true);

-- Registrations: Authenticated admin can view and update all registrations
CREATE POLICY "Admins can view and manage all registrations"
ON public.registrations FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Payments: Authenticated admin can view all payments
CREATE POLICY "Admins can view all payments"
ON public.payments FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Webhook logs: Authenticated admin can view logs
CREATE POLICY "Admins can view webhook logs"
ON public.webhook_logs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
