"use client";

import React, { useRef, useState, MouseEvent } from "react";

interface InteractiveGlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string; // e.g. "rgba(128, 0, 32, 0.15)" or "rgba(99, 102, 241, 0.18)"
  spotlightRadius?: number; // e.g. 500
  className?: string;
}

export function InteractiveGlowCard({
  children,
  glowColor = "rgba(128, 0, 32, 0.12)",
  spotlightRadius = 550,
  className = "",
  ...props
}: InteractiveGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
        }}
      />

      {/* Dynamic Subtle Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/20 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Card Children (Elevated above glow) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
