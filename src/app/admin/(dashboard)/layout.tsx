import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
