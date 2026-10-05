import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Dashboard Routes
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    const adminAuthCookie = request.cookies.get("admin_auth")?.value;
    const sbAuthCookie = request.cookies.get("sb-access-token")?.value;

    if (!adminAuthCookie && !sbAuthCookie) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect Admin API Routes
  if (pathname.startsWith("/api/admin")) {
    const adminAuthCookie = request.cookies.get("admin_auth")?.value;
    const sbAuthCookie = request.cookies.get("sb-access-token")?.value;

    if (!adminAuthCookie && !sbAuthCookie) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
