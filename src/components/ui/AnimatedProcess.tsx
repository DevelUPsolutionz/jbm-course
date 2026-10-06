"use client";

import React, { useState, useEffect } from "react";
import { Send, FileText, CheckCircle, Users, Presentation, Play } from "lucide-react";

const steps = [
  { 
    step: "01", 
    title: "Share Your Requirement", 
    desc: "Tell us about your institution and what your students need.",
    icon: FileText,
  },
  { 
    step: "02", 
    title: "Discuss Your Requirements", 
    desc: "Our team understands your objectives, audience and preferred format.",
    icon: Users,
  },
  { 
    step: "03", 
    title: "Receive a Customized Proposal", 
    desc: "We prepare a tailored proposal based on your specific requirements.",
    icon: Send,
  },
  { 
    step: "04", 
    title: "Confirm the Program", 
    desc: "Finalize the topic, date, duration, format and other requirements.",
    icon: CheckCircle,
  },
  { 
    step: "05", 
    title: "Conduct the Program", 
    desc: "JBM delivers the agreed workshop, training or program successfully.",
    icon: Presentation,
  },
];

export function AnimatedProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Column: Tab List */}
      <div className="space-y-3 relative">
        {/* Animated vertical line indicating progress */}
        <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-200 hidden sm:block">
          <div 
            className="absolute left-0 top-0 w-full bg-maroon-600 transition-all duration-500"
            style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {steps.map((s, idx) => {
          const isActive = activeStep === idx;
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`relative cursor-pointer pl-4 sm:pl-16 pr-4 py-4 rounded-2xl transition-all duration-300 ${isActive ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 scale-[1.02]" : "hover:bg-slate-50/50 grayscale opacity-60 hover:opacity-100 hover:grayscale-0"}`}
            >
              <div className={`hidden sm:flex absolute left-[21px] top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full z-10 transition-colors duration-300 ${isActive ? "bg-maroon-600 ring-4 ring-maroon-100" : "bg-slate-300"}`}></div>
              
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive ? "bg-maroon-50 text-maroon-700 shadow-inner" : "bg-slate-100 text-slate-500"}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold transition-colors ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                    {s.title}
                  </h3>
                  <div className={`grid transition-all duration-500 overflow-hidden ${isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="text-sm text-slate-500 leading-relaxed overflow-hidden">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column: Dynamic Graphic/Card */}
      <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] bg-slate-50/80 border border-slate-100/80 overflow-hidden flex items-center justify-center shadow-inner">
        {/* Abstract background shapes */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        {steps.map((s, idx) => (
          <div
            key={s.step}
            className={`absolute inset-0 p-8 flex items-center justify-center transition-all duration-700 ${activeStep === idx ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"}`}
          >
            <div className="w-full h-full p-6 sm:p-8 flex items-center justify-center">
               {/* Custom Visual based on step */}
               {idx === 0 && (
                 <div className="relative w-full max-w-sm aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center">
                   {/* Floating Elements */}
                   <div className="absolute -top-4 -left-4 bg-maroon-50 text-maroon-600 p-3 rounded-2xl shadow-lg animate-bounce duration-[3000ms]">
                     <FileText className="w-6 h-6" />
                   </div>
                   <div className="absolute -bottom-2 -right-2 bg-blue-50 text-blue-600 p-3 rounded-2xl shadow-lg animate-pulse">
                     <Send className="w-5 h-5" />
                   </div>
                   
                   {/* Main Graphic - Document */}
                   <div className="w-3/4 space-y-4">
                     <div className="flex gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                     </div>
                     <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse"></div>
                     <div className="h-10 w-full bg-slate-50 rounded-xl border border-slate-100 mt-4"></div>
                     <div className="h-20 w-full bg-slate-50 rounded-xl border border-slate-100"></div>
                     <div className="h-10 w-2/3 bg-maroon-700 rounded-xl mx-auto mt-4 flex items-center justify-center shadow-md">
                        <span className="w-12 h-2 bg-white/40 rounded-full"></span>
                     </div>
                   </div>
                 </div>
               )}

               {idx === 1 && (
                 <div className="relative w-full max-w-sm aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center overflow-hidden">
                   {/* Floating Elements */}
                   <div className="absolute top-6 left-6 bg-emerald-50 text-emerald-600 p-2.5 rounded-xl shadow-lg animate-bounce duration-[2000ms]">
                     <Users className="w-5 h-5" />
                   </div>
                   <div className="absolute bottom-8 right-6 bg-purple-50 text-purple-600 p-2.5 rounded-xl shadow-lg animate-float delay-150">
                     <Presentation className="w-5 h-5" />
                   </div>
                   
                   {/* Main Graphic - Meeting */}
                   <div className="absolute inset-0 bg-slate-50/50 flex flex-col items-center justify-center gap-6 p-8">
                     <div className="flex gap-4 items-center justify-center">
                       <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-200 to-sky-100 border-4 border-white shadow-md z-10 flex items-center justify-center"><Users className="w-6 h-6 text-sky-600"/></div>
                       <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-maroon-200 to-maroon-100 border-4 border-white shadow-xl z-20 -ml-6 flex items-center justify-center"><Presentation className="w-8 h-8 text-maroon-700"/></div>
                       <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-200 to-amber-100 border-4 border-white shadow-md z-10 -ml-6 flex items-center justify-center"><Users className="w-6 h-6 text-amber-600"/></div>
                     </div>
                     <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <div className="h-3 w-1/2 bg-slate-200 rounded mx-auto mb-2"></div>
                        <div className="flex justify-center gap-2 mt-4">
                           <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                           <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center bg-rose-500"><div className="w-4 h-1 bg-white rounded-full"></div></div>
                           <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                        </div>
                     </div>
                   </div>
                 </div>
               )}

               {idx === 2 && (
                 <div className="relative w-full max-w-sm aspect-[4/3] bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl border border-amber-100 flex items-center justify-center p-6">
                   {/* Floating Elements */}
                   <div className="absolute -top-4 right-8 bg-white text-amber-500 p-3 rounded-full shadow-xl animate-float">
                     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                   </div>
                   
                   {/* Main Graphic - Proposal */}
                   <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
                     <div className="h-12 bg-maroon-800 w-full flex items-center px-4">
                       <span className="text-white text-xs font-bold tracking-widest opacity-80">PROPOSAL</span>
                     </div>
                     <div className="p-6 space-y-4">
                       <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                       <div className="h-3 w-full bg-slate-100 rounded mt-4"></div>
                       <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
                       <div className="h-3 w-4/6 bg-slate-100 rounded"></div>
                       <div className="mt-6 flex justify-between items-end">
                         <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                           <FileText className="w-6 h-6 text-slate-300" />
                         </div>
                         <div className="h-8 w-24 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold text-[10px]">READY</div>
                       </div>
                     </div>
                   </div>
                 </div>
               )}

               {idx === 3 && (
                 <div className="relative w-full max-w-sm aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center p-6">
                   {/* Floating Elements */}
                   <div className="absolute top-1/2 -left-6 -translate-y-1/2 bg-emerald-500 text-white p-3 rounded-full shadow-xl shadow-emerald-500/30 animate-pulse">
                     <CheckCircle className="w-6 h-6" />
                   </div>
                   
                   {/* Main Graphic - Calendar */}
                   <div className="w-full">
                     <div className="bg-slate-800 text-white p-4 rounded-t-2xl flex justify-between items-center">
                       <div className="h-4 w-24 bg-slate-600 rounded"></div>
                       <div className="flex gap-1">
                         <div className="w-2 h-2 rounded-full bg-slate-500"></div><div className="w-2 h-2 rounded-full bg-slate-500"></div><div className="w-2 h-2 rounded-full bg-slate-500"></div>
                       </div>
                     </div>
                     <div className="bg-slate-50 p-6 rounded-b-2xl border border-slate-100 border-t-0 space-y-3">
                       <div className="grid grid-cols-7 gap-2 mb-4">
                         {[...Array(7)].map((_, i) => <div key={`h-${i}`} className="h-2 bg-slate-200 rounded w-full"></div>)}
                       </div>
                       <div className="grid grid-cols-7 gap-2">
                         {[...Array(28)].map((_, i) => (
                           <div key={`d-${i}`} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold ${i === 15 ? 'bg-maroon-600 text-white shadow-md ring-2 ring-maroon-200 scale-110' : i === 16 || i === 17 ? 'bg-maroon-100 text-maroon-700' : 'bg-white border border-slate-100 text-slate-400'}`}>
                             {i + 1}
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               )}

               {idx === 4 && (
                 <div className="relative w-full max-w-sm aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden group">
                   {/* Floating Elements */}
                   <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-rose-600 px-3 py-1.5 rounded-full shadow-lg text-[10px] font-bold flex items-center gap-1.5 animate-float z-20">
                     <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span> LIVE
                   </div>
                   
                   {/* Main Graphic - Presentation/Event */}
                   <div className="absolute inset-0 bg-slate-900">
                     <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/80 to-slate-900 mix-blend-multiply"></div>
                     <div className="absolute inset-0 flex items-center justify-center z-10">
                       <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                         <Play className="w-8 h-8 text-white fill-white ml-1" />
                       </div>
                     </div>
                     {/* Decorative audience representation */}
                     <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent flex items-end justify-around px-8 pb-4 opacity-60">
                        <div className="w-8 h-12 bg-slate-700 rounded-t-full"></div>
                        <div className="w-10 h-16 bg-slate-600 rounded-t-full"></div>
                        <div className="w-12 h-20 bg-slate-500 rounded-t-full"></div>
                        <div className="w-10 h-14 bg-slate-600 rounded-t-full"></div>
                        <div className="w-8 h-12 bg-slate-700 rounded-t-full"></div>
                     </div>
                   </div>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
