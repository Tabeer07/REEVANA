import React from 'react';
import { MapPin, Sliders, Wand2, Smile, ArrowRight, Sparkles } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

export default function HowItWorks({ onOpenPlanner }) {
  const iconMap = {
    MapPin: MapPin,
    Sliders: Sliders,
    Wand2: Wand2,
    Smile: Smile,
  };

  return (
    <section id="planner" className="py-24 relative bg-slate-950">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 4-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            How REEVANA Works
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            From initial destination search to hassle-free travel execution, here is how REEVANA transforms your trip.
          </p>
        </div>

        {/* 4-Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-emerald-500/20 -translate-y-6 z-0"></div>

          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const IconComponent = iconMap[step.icon] || MapPin;
            return (
              <div 
                key={step.step}
                className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-slate-700 space-y-6 relative z-10 flex flex-col justify-between group"
              >
                
                <div className="space-y-4">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-slate-700 font-heading group-hover:text-sky-400 transition-colors">
                      {step.step}
                    </span>

                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.color} shadow-lg`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-heading">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Step Indicator */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Step {idx + 1} of 4</span>
                  <span className="w-2 h-2 rounded-full bg-sky-400 opacity-50 group-hover:opacity-100 transition-opacity"></span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onOpenPlanner}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 hover:scale-105"
          >
            <Wand2 className="w-5 h-5 text-amber-300" />
            <span>Start Building Your Trip Plan Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
