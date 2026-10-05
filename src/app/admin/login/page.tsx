import { redirect } from "next/navigation";

export default function AdminLoginRedirect() {
  // Public admin login route is disabled for security.
  // Admins must use the hidden route.
  redirect("/");
}
