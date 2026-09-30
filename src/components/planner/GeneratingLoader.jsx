import React from 'react';
import { Sparkles, Compass, Cpu, CheckCircle2 } from 'lucide-react';

export default function GeneratingLoader({ currentStatusMessage, progressPercentage }) {
  return (
    <div className="glass-panel p-12 rounded-3xl border border-sky-500/30 text-center space-y-8 max-w-xl mx-auto shadow-2xl relative overflow-hidden my-12 animate-fade-in">

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Progress Ring & ReeVANA Logo Badge */}
      <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
        {/* Outer Rotating Glow Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-sky-400/30 animate-spin-slow pointer-events-none"></div>

        {/* SVG Circle Progress */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="72"
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="72"
            stroke="currentColor"
            strokeWidth="6"
            className="text-sky-400 transition-all duration-300 ease-out"
            fill="transparent"
            strokeDasharray={452.3}
            strokeDashoffset={452.3 - (452.3 * progressPercentage) / 100}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Logo Image & Progress Percentage */}
        <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-blue-600 to-amber-400 shadow-xl overflow-hidden animate-logo-pulse">
          <img
            src="/reevana-logo.jpg"
            alt="ReeVANA AI Engine Loading"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center">
            <span className="text-base font-extrabold text-white font-heading drop-shadow-md">
              {progressPercentage}%
            </span>
            <span className="text-[9px] font-bold text-sky-300 uppercase tracking-wider">Generating</span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white font-heading flex items-center justify-center gap-2">
          <Cpu className="w-5 h-5 text-sky-400 animate-spin-slow" />
          <span>Gemini AI Engine at Work</span>
        </h3>

        <p className="text-sky-300 text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-900/90 border border-sky-500/20 max-w-md mx-auto min-h-[42px] flex items-center justify-center gap-2">
          <Compass className="w-4 h-4 text-sky-400 shrink-0 animate-spin" />
          <span>{currentStatusMessage || 'Planning your perfect trip...'}</span>
        </p>
      </div>

      {/* Step Indicators Ticker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 text-left pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <CheckCircle2 className={`w-3.5 h-3.5 ${progressPercentage >= 25 ? 'text-emerald-400' : 'text-slate-600'}`} />
          <span>Planning your perfect trip...</span>
        </div>
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <CheckCircle2 className={`w-3.5 h-3.5 ${progressPercentage >= 50 ? 'text-emerald-400' : 'text-slate-600'}`} />
          <span>Finding the best experiences...</span>
        </div>
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <CheckCircle2 className={`w-3.5 h-3.5 ${progressPercentage >= 75 ? 'text-emerald-400' : 'text-slate-600'}`} />
          <span>Optimizing your itinerary...</span>
        </div>
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <CheckCircle2 className={`w-3.5 h-3.5 ${progressPercentage >= 95 ? 'text-emerald-400' : 'text-slate-600'}`} />
          <span>Calculating your estimated budget...</span>
        </div>
      </div>

    </div>
  );
}

