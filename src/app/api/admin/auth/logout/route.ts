import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/admin-session";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Admin session terminated.",
    redirectTo: "/jbmlogin",
  });

  // Clear all admin session cookies
  response.cookies.delete(ADMIN_COOKIE_NAME);
  response.cookies.delete("jbm_admin_auth");
  response.cookies.delete("admin_auth");

  return response;
}
