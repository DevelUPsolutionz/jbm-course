"use client";

import React from "react";
import { Printer } from "lucide-react";

export function InvoicePrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 px-5 py-2.5 rounded-xl shadow-md shadow-maroon-900/20 transition-all cursor-pointer"
    >
      <Printer className="w-4 h-4" />
      <span>Print / Download PDF</span>
    </button>
  );
}
