import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js";

const FALLBACK_SUPABASE_URL = "https://vpyttmmosqhdjucdwzye.supabase.co";
const FALLBACK_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweXR0bW1vc3FoZGp1Y2R3enllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTI1MzI2NCwiZXhwIjoyMTA2ODI5MjY0fQ.-2QME7VGKgDock_xTJLw8MRmSwT0hlODjmf_qzy7F1M";

export function getAdminClient(): SupabaseClient<any, "public", any> {
  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_SERVICE_ROLE_KEY;

  // Safeguard: Check if the provided Vercel env URL is different
  if (supabaseUrl !== FALLBACK_SUPABASE_URL) {
    console.warn(`WARNING: NEXT_PUBLIC_SUPABASE_URL in Vercel (${supabaseUrl}) differs from expected (${FALLBACK_SUPABASE_URL}). Forcing fallback to prevent connecting to wrong DB!`);
    supabaseUrl = FALLBACK_SUPABASE_URL;
  }

  // Safeguard: Check if the provided Vercel env key is accidentally the 'anon' key.
  try {
    if (serviceRoleKey && serviceRoleKey.includes(".")) {
      const payloadBase64 = serviceRoleKey.split(".")[1];
      const payloadString = Buffer.from(payloadBase64, "base64").toString();
      const payload = JSON.parse(payloadString);
      if (payload.role !== "service_role") {
        console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY in Vercel is NOT a service_role key (detected role:", payload.role, "). Forcefully switching to fallback service key to prevent RLS 0-records issue!");
        serviceRoleKey = FALLBACK_SERVICE_ROLE_KEY;
      }
    }
  } catch (e) {
    // Ignore parse errors, proceed with the key
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
