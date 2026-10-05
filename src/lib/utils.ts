import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateRegistrationReference(courseSlug: string): string {
  const prefixMap: Record<string, string> = {
    "cyber-security": "CS",
    english: "ENG",
    "artificial-intelligence": "AI",
  };
  const prefix = prefixMap[courseSlug] || "APX";
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${dateStr}-${randomSuffix}`;
}

export function getYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return `https://www.youtube-nocookie.com/embed/${v}?autoplay=1&rel=0`;
    }
    if (parsed.hostname.includes("youtu.be")) {
      const v = parsed.pathname.slice(1);
      if (v) return `https://www.youtube-nocookie.com/embed/${v}?autoplay=1&rel=0`;
    }
    return url;
  } catch {
    return url;
  }
}

export function getYouTubeThumbnail(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId = "";
    if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v") || "";
    } else if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    }
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return null;
  } catch {
    return null;
  }
}
