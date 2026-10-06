// Secret used to sign admin session tokens
// Uses SUPABASE_SERVICE_ROLE_KEY or RAZORPAY_KEY_SECRET as cryptographic anchor if ADMIN_SESSION_SECRET not defined
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.RAZORPAY_KEY_SECRET ||
  "jbm-production-hardened-admin-secret-key-2026";

export const ADMIN_COOKIE_NAME = "jbm_admin_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface AdminSessionData {
  email: string;
  role: "superadmin" | "admin";
  issuedAt: number;
  expiresAt: number;
}

// Convert base64url string to Uint8Array
function base64UrlToBytes(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Convert ArrayBuffer or Uint8Array to base64url string
function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Timing-safe byte array comparison
function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token using Web Crypto
 */
export async function createAdminSessionToken(
  email: string,
  role: "superadmin" | "admin" = "superadmin"
): Promise<string> {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_DURATION_MS;

  const payload: AdminSessionData = {
    email: email.toLowerCase().trim(),
    role,
    issuedAt,
    expiresAt,
  };

  const payloadJson = JSON.stringify(payload);
  const enc = new TextEncoder();
  const payloadBase64 = bytesToBase64Url(enc.encode(payloadJson));

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuffer = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(payloadBase64));
  const signature = bytesToBase64Url(new Uint8Array(sigBuffer));

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies the admin session token using constant-time signature comparison
 */
export async function verifyAdminSessionToken(
  token: string | undefined | null
): Promise<AdminSessionData | null> {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [payloadBase64, signature] = parts;

  try {
    const enc = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      enc.encode(SESSION_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const expectedSigBuffer = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      enc.encode(payloadBase64)
    );
    const expectedSigBytes = new Uint8Array(expectedSigBuffer);
    const providedSigBytes = base64UrlToBytes(signature);

    if (!timingSafeEqualBytes(providedSigBytes, expectedSigBytes)) {
      return null;
    }

    const payloadBytes = base64UrlToBytes(payloadBase64);
    const dec = new TextDecoder();
    const payload: AdminSessionData = JSON.parse(dec.decode(payloadBytes));

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Securely verifies admin credentials on the server side
 * Prevents timing attacks using SHA-256 digest comparison
 */
export async function verifyAdminCredentials(
  providedEmail: string,
  providedPass: string
): Promise<boolean> {
  const allowedCredentials: Array<{ email: string; pass: string }> = [
    {
      email: "hello.johannabrightmentors@gmail.com",
      pass: "Johanna@JBM",
    }
  ];

  const cleanProvidedEmail = (providedEmail || "").toLowerCase().trim();
  const cleanProvidedPass = providedPass || "";

  const enc = new TextEncoder();
  const providedPassBuffer = await crypto.subtle.digest("SHA-256", enc.encode(cleanProvidedPass));
  const providedPassBytes = new Uint8Array(providedPassBuffer);

  for (const cred of allowedCredentials) {
    if (cred.email === cleanProvidedEmail) {
      const expectedPassBuffer = await crypto.subtle.digest("SHA-256", enc.encode(cred.pass));
      const expectedPassBytes = new Uint8Array(expectedPassBuffer);

      if (timingSafeEqualBytes(providedPassBytes, expectedPassBytes)) {
        return true;
      }
    }
  }

  return false;
}
