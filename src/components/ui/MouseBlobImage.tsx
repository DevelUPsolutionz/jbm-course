"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

interface MouseBlobImageProps {
  src: string;
  alt: string;
  blobColor?: string;
}

/**
 * MouseBlobImage — circular image with a soft blob behind it that
 * parallax-tracks the mouse cursor within the container.
 */
export function MouseBlobImage({
  src,
  alt,
  blobColor = "#D1C4E9",
}: MouseBlobImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Normalized -1..1 offset from center
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    // Move blob up to 30px in any direction
    setBlobPos({ x: dx * 30, y: dy * 30 });
  };

  const handleMouseLeave = () => setBlobPos({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Primary mouse-tracking blob */}
      <div
        className="absolute inset-0 rounded-t-full rounded-bl-full"
        style={{
          background: blobColor,
          opacity: 0.75,
          transform: `scale(1.10) translate(calc(6px + ${blobPos.x}px), calc(6px + ${blobPos.y}px))`,
          transition: "transform 0.10s cubic-bezier(0.25,0.46,0.45,0.94)",
          willChange: "transform",
          filter: "blur(3px)",
        }}
      />

      {/* Outer glow ring — slower, larger lag for depth feel */}
      <div
        className="absolute inset-0 rounded-t-full rounded-bl-full"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${blobColor}80 0%, transparent 72%)`,
          opacity: 0.55,
          transform: `scale(1.18) translate(calc(3px + ${blobPos.x * 0.45}px), calc(3px + ${blobPos.y * 0.45}px))`,
          transition: "transform 0.22s cubic-bezier(0.25,0.46,0.45,0.94)",
          willChange: "transform",
        }}
      />

      {/* Circular image — sits above blob layers */}
      <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white bg-slate-100 z-10 max-w-md mx-auto">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}
