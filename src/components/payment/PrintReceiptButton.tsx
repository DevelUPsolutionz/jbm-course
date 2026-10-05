"use client";

import React from "react";
import { Printer } from "lucide-react";

export function PrintReceiptButton() {
  return (
    <button
      onClick={() => window.print()}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-sm transition-all print:hidden"
    >
      <Printer className="w-4 h-4" />
      <span>Print / Download Receipt</span>
    </button>
  );
}
