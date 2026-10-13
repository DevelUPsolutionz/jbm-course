import React from "react";
import { ManualInvoiceClientView } from "@/components/admin/ManualInvoiceClientView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manual Invoice Generator | JBM Admin",
  description: "Generate Canva-stamped official fee receipts for offline/direct UPI payments.",
};

export default function AdminInvoicesPage() {
  return <ManualInvoiceClientView />;
}
