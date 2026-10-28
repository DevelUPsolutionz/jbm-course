"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Star, Sparkles, CheckCircle2, Clock } from "lucide-react";

export interface StudentVideoData {
  id: string;
  studentName: string;
  videoSrc: string;
  duration: string;
  category: string;
  highlight: string;
  feedbackQuote: string;
}

interface StudentVideoCardProps {
  video: StudentVideoData;
  activeVideoId: string | null;
  onPlay: (id: string) => void;
}

export function StudentVideoCard({ video, activeVideoId, onPlay }: StudentVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Automatically pause this video if another video starts playing
  useEffect(() => {
    if (activeVideoId !== video.id && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeVideoId, video.id]);

  const handleStartPlay = () => {
    if (videoRef.current) {
      onPlay(video.id);
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Playback error:", err);
        });
    }
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-maroon-300 transition-all duration-300 flex flex-col group">
      {/* 16:9 Landscape Video Container */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Native HTML5 Video Element - Full Video Visible with object-contain */}
        <video
          ref={videoRef}
          src={`${video.videoSrc}#t=0.001`}
          preload="metadata"
          playsInline
          controls={isPlaying}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => {
            onPlay(video.id);
            setIsPlaying(true);
          }}
          className="w-full h-full object-contain bg-black"
        />

        {/* Overlay when NOT playing: Top duration badge & prominent Play button, clean video frame */}
        {!isPlaying && (
          <div
            onClick={handleStartPlay}
            className="absolute inset-0 z-20 flex flex-col justify-between p-4 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/60 cursor-pointer select-none transition-all duration-300 group-hover:from-slate-950/85"
          >
            {/* Top Badges: Category & Duration only on top */}
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-maroon-900 shadow-sm border border-white/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{video.category}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-black/60 backdrop-blur-md text-white border border-white/20">
                <Clock className="w-3 h-3 text-slate-300" />
                <span>{video.duration}</span>
              </span>
            </div>

            {/* Center Animated Glowing Play Button */}
            <div className="flex flex-col items-center justify-center my-auto transform group-hover:scale-110 transition-transform duration-300">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full bg-maroon-600/40 animate-ping pointer-events-none"></div>
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-maroon-800 to-rose-600 text-white flex items-center justify-center shadow-2xl shadow-rose-950/80 border-2 border-white/90 group-hover:bg-maroon-700 transition-colors">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                </div>
              </div>
              <span className="mt-3 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-black/75 backdrop-blur-md border border-white/20 shadow-md">
                Click to Play
              </span>
            </div>

            {/* Empty placeholder for clean spacing balance */}
            <div className="h-4" />
          </div>
        )}
      </div>

      {/* Card Content & Testimonial Details (Clean White Footer) */}
      <div className="p-5 sm:p-6 space-y-3 flex-grow flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Header Row: Student Name (Single Appearance) & 5 Gold Stars */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1.5">
              <span>{video.studentName}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
            </div>

            {/* 5 Full Gold Stars */}
            <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-200/90 px-2.5 py-1 rounded-full shadow-xs">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          {/* Highlight Headline */}
          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-maroon-800 transition-colors">
            {video.highlight}
          </h4>

          {/* Feedback Quote */}
          <p className="text-xs sm:text-sm text-slate-600 italic font-serif leading-relaxed">
            &ldquo;{video.feedbackQuote}&rdquo;
          </p>
        </div>

        {/* Verification Footer Pill (Without bottom duration time) */}
        <div className="pt-2.5 flex items-center text-xs text-slate-500 border-t border-slate-100">
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Course Experience</span>
          </span>
        </div>
      </div>
    </div>
  );
}
