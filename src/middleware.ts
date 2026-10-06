import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth/admin-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Dashboard Routes
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const verifiedSession = await verifyAdminSessionToken(sessionToken);
    const sbAuthCookie = request.cookies.get("sb-access-token")?.value;

    if (!verifiedSession && !sbAuthCookie) {
      const url = new URL("/jbmlogin", request.url);
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect Admin API Routes (exclude /api/admin/auth/* login/logout routes)
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth")) {
    const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const verifiedSession = await verifyAdminSessionToken(sessionToken);
    const sbAuthCookie = request.cookies.get("sb-access-token")?.value;

    if (!verifiedSession && !sbAuthCookie) {
      return NextResponse.json(
        { error: "Unauthorized access: Valid cryptographic administrator session required." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
