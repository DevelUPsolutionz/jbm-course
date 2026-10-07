import React from "react";
import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-slate-100 rounded-md animate-pulse" />
        </div>
        <div className="h-9 w-28 bg-slate-200 rounded-xl animate-pulse" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="w-8 h-8 rounded-xl bg-slate-100 animate-pulse" />
            </div>
            <div className="h-8 w-28 bg-slate-300 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>

      {/* Main Content Skeleton Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
          <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse" />
        </div>
        
        <div className="space-y-3 pt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 w-full bg-slate-50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
