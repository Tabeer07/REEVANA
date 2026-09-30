import React, { useState, useEffect } from 'react';
import { Plane, Sparkles, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing REEVANA AI Engine...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const statusSteps = [
      { at: 10, msg: 'Initializing REEVANA AI Engine...' },
      { at: 35, msg: 'Connecting Real-Time Weather & Transit Services...' },
      { at: 65, msg: 'Unlocking Hidden Gems & Local Culinary Spots...' },
      { at: 90, msg: 'Preparing Your Smart Tourism Dashboard...' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 4) + 2;
        const currentNext = next > 100 ? 100 : next;

        const currentStep = statusSteps.reduce((acc, step) => {
          if (currentNext >= step.at) return step.msg;
          return acc;
        }, statusSteps[0].msg);

        setStatusMessage(currentStep);
        return currentNext;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitDelay = setTimeout(() => {
        setIsExiting(true);
        const finishDelay = setTimeout(() => {
          if (onFinish) onFinish();
        }, 650);
        return () => clearTimeout(finishDelay);
      }, 400);

      return () => clearTimeout(exitDelay);
    }
  }, [progress, onFinish]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Background Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Cyber Grid Lines Effect */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500/50 text-xs font-semibold transition-all backdrop-blur-md"
      >
        <span>Skip</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center max-w-lg mx-auto">
        
        {/* Animated ReeVANA Emblem & Compass Ring Assembly */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          
          {/* Outer Rotating Glowing Tech Ring 1 (Clockwise) */}
          <svg className="absolute inset-0 w-full h-full animate-spin-slow text-sky-500/40 opacity-80" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="94" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12 8 4 8" fill="none" />
            <circle cx="100" cy="100" r="86" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="40 10" fill="none" opacity="0.6" />
          </svg>

          {/* Inner Reverse Rotating Ring 2 (Counter-Clockwise) */}
          <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-spin-reverse-slow text-amber-400/50" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 6 18 6" fill="none" />
            <polygon points="100,10 105,20 95,20" fill="#fbbf24" opacity="0.8" />
            <polygon points="100,190 105,180 95,180" fill="#fbbf24" opacity="0.8" />
          </svg>

          {/* Radar Scanning Beam Light Overlay */}
          <div className="absolute inset-4 rounded-full overflow-hidden pointer-events-none z-10 animate-scan-beam">
            <div className="w-full h-full bg-gradient-to-tr from-sky-400/20 via-transparent to-transparent origin-center"></div>
          </div>

          {/* Orbiting Plane */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="animate-orbit-plane">
              <div className="p-1.5 rounded-full bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/80 -rotate-45">
                <Plane className="w-3.5 h-3.5 fill-slate-950" />
              </div>
            </div>
          </div>

          {/* Core ReeVANA Logo Badge Image */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-blue-600 to-amber-400 shadow-2xl shadow-sky-500/30 animate-logo-pulse overflow-hidden">
            <img 
              src="/reevana-logo.jpg" 
              alt="ReeVANA Official Logo Badge" 
              className="w-full h-full object-cover rounded-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>

        {/* Brand Text & Tagline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>Smart Tourism Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            REE<span className="text-sky-400">VANA</span>
          </h1>

          <p className="text-xs text-slate-400 tracking-wide uppercase font-medium">
            Explore More. Worry Less.
          </p>
        </div>

        {/* Progress Bar & Status Message */}
        <div className="w-full space-y-3 max-w-xs mx-auto">
          
          {/* Status Step Ticker */}
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-sky-400 truncate">
              <Compass className="w-3.5 h-3.5 animate-spin shrink-0" />
              <span className="truncate max-w-[200px] sm:max-w-[220px]">{statusMessage}</span>
            </span>
            <span className="font-extrabold text-white ml-2 font-heading">{progress}%</span>
          </div>

          {/* Neon Gradient Progress Track */}
          <div className="relative w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-amber-400 transition-all duration-300 ease-out shadow-lg shadow-sky-500/50"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer sweep effect inside progress bar */}
              <div className="w-full h-full bg-white/20 animate-pulse"></div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>AI Itineraries • Real-time Weather • Budget Tracking</span>
          </div>

        </div>

      </div>
    </div>
  );
}
