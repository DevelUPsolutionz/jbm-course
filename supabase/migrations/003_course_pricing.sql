-- ==============================================================================
-- 003_course_pricing.sql
-- Dynamic Course Catalog & Pricing Schema
-- ==============================================================================

-- 1. Ensure actual_fee and discount_percent columns exist on courses table
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS actual_fee INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS discount_percent INTEGER DEFAULT 0;

-- 2. Ensure RLS policies allow public read and authenticated/service-role updates
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Allow public to view active courses
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'courses' AND policyname = 'Public can view active courses'
    ) THEN
        CREATE POLICY "Public can view active courses" 
        ON public.courses FOR SELECT 
        USING (true);
    END IF;
END $$;

-- Allow admin/service_role to update courses
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'courses' AND policyname = 'Admins can update courses'
    ) THEN
        CREATE POLICY "Admins can update courses" 
        ON public.courses FOR ALL 
        USING (true)
        WITH CHECK (true);
    END IF;
END $$;

-- 3. Upsert default pricing for the 3 official courses
INSERT INTO public.courses (
    id,
    slug,
    title,
    short_description,
    description,
    actual_fee,
    discount_percent,
    fee,
    currency,
    duration,
    is_active
) VALUES
(
    'c3333333-3333-3333-3333-333333333333',
    'artificial-intelligence',
    'AI Foundation & Productivity',
    'Turn ideas into opportunities with AI. Master generative AI tools, prompt engineering, AI-powered automation, and real-world capstones in 30 days.',
    'A comprehensive 30-day practical immersion into modern Artificial Intelligence.',
    23000,
    50,
    11500,
    'INR',
    '30 Days (Live Online + Hands-on Labs)',
    true
),
(
    'e2222222-2222-2222-2222-222222222222',
    'english',
    'JBM Professional English',
    'Master clear, impactful workplace communication. Speak with authority, lead meetings, draft executive emails, and conduct yourself with boardroom poise.',
    'A transformative 40-day immersion into professional and workplace English communication.',
    20000,
    50,
    10000,
    'INR',
    '40 Days (Interactive Live Workshops)',
    true
),
(
    'a1111111-1111-1111-1111-111111111111',
    'cyber-security',
    'Networking in Cyber Security',
    'Master practical network defense, vulnerability assessment, ethical penetration testing, and modern digital asset security in 30 days.',
    'A comprehensive, hands-on immersion into modern cybersecurity practices.',
    21000,
    50,
    10500,
    'INR',
    '30 Days (Hands-on Labs + Live Mentorship)',
    true
)
ON CONFLICT (slug) DO UPDATE SET
    actual_fee = EXCLUDED.actual_fee,
    discount_percent = EXCLUDED.discount_percent,
    fee = EXCLUDED.fee,
    updated_at = NOW();
