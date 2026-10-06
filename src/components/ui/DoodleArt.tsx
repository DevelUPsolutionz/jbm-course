import React from "react";

/**
 * 1. Hand-drawn mint-green double loop / scribble ring (From ZenEd Screenshot 1)
 */
export function DoodleMintLoop({ className = "w-16 h-16 text-emerald-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28 42C23 28 35 15 50 15C68 15 82 30 82 50C82 72 65 84 46 84C28 84 16 70 16 52C16 32 32 20 54 20C73 20 85 34 85 52C85 68 74 80 58 81C44 82 32 73 30 60"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 2. 8-Pointed pastel starburst / snowflake sticker (From ZenEd Screenshot 1)
 */
export function DoodleStarburst8({ className = "w-10 h-10 text-sky-200" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* 8 rounded radiating rounded petals */}
      <rect x="44" y="8" width="12" height="84" rx="6" />
      <rect x="8" y="44" width="84" height="12" rx="6" />
      <rect x="44" y="8" width="12" height="84" rx="6" transform="rotate(45 50 50)" />
      <rect x="44" y="8" width="12" height="84" rx="6" transform="rotate(-45 50 50)" />
      <circle cx="50" cy="50" r="14" fill="currentColor" />
    </svg>
  );
}

/**
 * 3. Hand-drawn wavy scribble underline for highlighted words (From ZenEd Screenshot 1)
 */
export function DoodleSquiggleUnderline({ className = "text-orange-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 18" fill="none" className={`w-full overflow-visible ${className}`} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 11C28 4 48 16 74 8C100 2 124 16 157 9"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 4. 4-Pointed sparkle star sticker (From ZenEd Screenshots 2 & 4)
 */
export function DoodleSparkleStar({ className = "w-8 h-8 text-emerald-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z" />
    </svg>
  );
}

/**
 * 5. Hand-drawn downward curved arrow (From ZenEd Screenshot 2)
 */
export function DoodleArrowDown({ className = "w-10 h-10 text-slate-700" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 15C18 32 26 48 42 56L48 58"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M36 65L50 60L46 45"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 6. Hand-drawn curved doodle arrow pointing right/up (From ZenEd Screenshot 2 & 4)
 */
export function DoodleArrowCurved({ className = "w-10 h-10 text-slate-700", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 45C22 25 45 15 65 22"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M52 14L67 22L58 34"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 7. 3 Radiating hand-drawn burst tick marks above stat counter (From ZenEd Screenshot 3)
 */
export function DoodleBurstLines({ className = "w-8 h-6 text-amber-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Left tick */}
      <path d="M14 32L6 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Center tick */}
      <path d="M30 30L30 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Right tick */}
      <path d="M46 32L54 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 8. Diagonal light-blue sketchy hatch lines (From ZenEd Screenshot 3)
 */
export function DoodleHatchLines({ className = "w-28 h-20 text-sky-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 65L75 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M30 75L90 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <path d="M45 80L105 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <path d="M60 85L118 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

/**
 * 9. Folded soft-pink ribbon / tape sticker (From ZenEd Screenshot 2)
 */
export function DoodleRibbonTape({ className = "w-12 h-10 text-rose-200" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 15L65 8L75 42L20 48L10 15Z"
        opacity="0.85"
      />
      {/* subtle fold shadow */}
      <path
        d="M20 48L28 35L38 46Z"
        fill="rgba(0,0,0,0.08)"
      />
    </svg>
  );
}

/**
 * 10. Banana-yellow arched wave backdrop (From ZenEd Screenshot 3)
 */
export function OrganicArchYellow({ className = "bg-amber-300" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 rounded-[3rem] transform -rotate-3 scale-[1.03] transition-transform duration-500 pointer-events-none ${className}`}
      style={{
        borderRadius: "45% 55% 42% 58% / 55% 45% 55% 45%",
      }}
    />
  );
}

/**
 * 11. Organic Coral / Peach backdrop blob (From ZenEd Screenshot 2)
 */
export function OrganicCoralBlob({ className = "bg-[#FDA4AF]" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 rounded-[3.5rem] transform rotate-4 scale-[1.04] transition-transform duration-500 pointer-events-none ${className}`}
      style={{
        borderRadius: "58% 42% 65% 35% / 40% 60% 40% 60%",
      }}
    />
  );
}

/**
 * 12. Organic Mint / Cyan polygon backdrop (From ZenEd Screenshot 4)
 */
export function OrganicMintPolygon({ className = "bg-[#A7F3D0]" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 rounded-[3rem] transform -rotate-4 scale-[1.03] transition-transform duration-500 pointer-events-none ${className}`}
      style={{
        borderRadius: "48% 52% 38% 62% / 60% 40% 60% 40%",
      }}
    />
  );
}
