"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, AlertCircle, Sparkles } from "lucide-react";
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/utils";

interface VideoEmbedProps {
  videoUrl: string;
  title: string;
  thumbnailUrl?: string;
  aspectRatio?: "16/9" | "4/3";
  className?: string;
}

export function VideoEmbed({
  videoUrl,
  title,
  thumbnailUrl,
  aspectRatio = "16/9",
  className = "",
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const poster =
    thumbnailUrl ||
    getYouTubeThumbnail(videoUrl) ||
    "/images/sections/video-default-thumb.webp";
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="relative group/video">
      {/* Ambient Soft Glow for Light Theme */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/15 via-indigo-500/10 to-cyan-500/15 rounded-3xl blur-2xl opacity-70 group-hover/video:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xl shadow-slate-300/40 ${className}`}
        style={{ aspectRatio }}
      >
        {!isPlaying ? (
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              src={poster}
              alt={`${title} Preview Thumbnail`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              priority={false}
              loading="lazy"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

            {/* Top Status Pill */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-[11px] font-semibold text-slate-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive Briefing</span>
            </div>

            {/* Centered Glowing Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-500/30 animate-ping opacity-75" />
                <button
                  type="button"
                  aria-label={`Play video briefing for ${title}`}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/50 transform transition-all duration-300 group-hover:scale-110 group-focus:scale-110 focus:outline-none"
                >
                  <Play className="w-7 h-7 sm:w-8 h-8 fill-current ml-1 text-white drop-shadow-md" />
                </button>
              </div>

              <div className="mt-5 text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Click to Load Interactive Player</span>
                </div>
                <p className="text-white text-sm sm:text-base font-semibold drop-shadow line-clamp-1 max-w-md mx-auto">
                  {title}
                </p>
              </div>
            </div>
          </div>
        ) : hasError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-300 p-6 text-center">
            <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
            <p className="font-semibold text-base text-white">Video preview unavailable</p>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              The external stream could not be loaded. You can still review the full course syllabus and curriculum breakdown below.
            </p>
            <button
              onClick={() => setIsPlaying(false)}
              className="mt-4 px-4 py-2 text-xs font-semibold text-brand-300 border border-brand-400/30 rounded-xl hover:bg-brand-500/10"
            >
              Back to Preview
            </button>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            title={`Introductory Video: ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </div>
  );
}
