import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: "brand" | "emerald" | "amber" | "indigo" | "rose";
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "brand",
}: StatsCardProps) {
  const colorMap = {
    brand: "bg-brand-500/10 text-brand-600 border-brand-200",
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    amber: "bg-amber-500/10 text-amber-600 border-amber-200",
    indigo: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    rose: "bg-rose-500/10 text-rose-600 border-rose-200",
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black text-slate-900 mt-2">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
