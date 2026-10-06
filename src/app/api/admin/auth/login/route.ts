import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  createAdminSessionToken,
  verifyAdminCredentials,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth/admin-session";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting: 5 attempts per 15 minutes per IP to prevent brute-force attacks
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const { success, remaining } = rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000);

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many login attempts detected. For security purposes, this IP is temporarily throttled. Please try again in 15 minutes.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Please enter your administrator email and password." },
        { status: 400 }
      );
    }

    // 2. Constant-time secure credential verification
    const isValid = await verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        {
          error: "Invalid administrator credentials. Access has been denied and logged.",
          remainingAttempts: remaining,
        },
        { status: 401 }
      );
    }

    // 3. Create cryptographically signed HMAC session token
    const token = await createAdminSessionToken(email, "superadmin");

    // 4. Set HttpOnly, Secure, SameSite=Strict cookie
    const isProduction = process.env.NODE_ENV === "production";
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful. Establishing secure session.",
      redirectTo: "/admin/dashboard",
    });

    // Primary secure HttpOnly session cookie (cannot be stolen via JavaScript XSS)
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    // Client-side UI display flag
    response.cookies.set({
      name: "jbm_admin_auth",
      value: "true",
      httpOnly: false,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Admin auth login route error:", error);
    return NextResponse.json(
      { error: "An unexpected authentication error occurred." },
      { status: 500 }
    );
  }
}
