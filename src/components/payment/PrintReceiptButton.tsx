"use client";

import React from "react";
import Link from "next/link";
import { FileText, Printer } from "lucide-react";

interface PrintReceiptButtonProps {
  registrationReference?: string;
  isPaid?: boolean;
  paymentId?: string;
}

export function PrintReceiptButton({
  registrationReference,
  isPaid = true,
  paymentId,
}: PrintReceiptButtonProps) {
  if (!registrationReference) {
    return (
      <button
        onClick={() => window.print()}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-sm transition-all print:hidden"
      >
        <Printer className="w-4 h-4" />
        <span>Print Receipt</span>
      </button>
    );
  }

  const downloadUrl = `/api/invoice/download?ref=${registrationReference}`;

  return (
    <a
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 shadow-md shadow-maroon-900/20 transition-all print:hidden"
    >
      <FileText className="w-4 h-4" />
      <span>📄 Download Receipt (PDF)</span>
    </a>
  );
}
