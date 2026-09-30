import React from 'react';
import { Sparkles, Wallet, Compass, CloudSun, ShieldCheck, Languages, CheckCircle2, ArrowRight } from 'lucide-react';
import { SMART_TRAVEL_FEATURES } from '../data/mockData';

export default function SmartTravelFeatures({ onOpenPlanner }) {
  const iconMap = {
    Sparkles: Sparkles,
    Wallet: Wallet,
    Compass: Compass,
    CloudSun: CloudSun,
    ShieldCheck: ShieldCheck,
    Languages: Languages,
  };

  return (
    <section id="smart-travel" className="py-24 relative overflow-hidden bg-slate-950">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Travel Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Solve Every Travel Problem <br />
            <span className="gradient-text-sky">Before You Even Pack</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            REEVANA integrates 10+ essential travel tools into a single intuitive dashboard. Say goodbye to fragmented apps, budget surprises, and travel anxiety.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SMART_TRAVEL_FEATURES.map((feat) => {
            const IconComponent = iconMap[feat.icon] || Sparkles;
            return (
              <div 
                key={feat.id}
                className="glass-card rounded-3xl p-7 flex flex-col justify-between space-y-6 group border border-slate-800 hover:border-slate-700 relative overflow-hidden"
              >
                {/* Subtle Gradient Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feat.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}></div>

                <div className="space-y-4">
                  
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} p-[1px] shadow-lg`}>
                      <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <div>
                    <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                      {feat.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-sky-300 transition-colors">
                      {feat.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {feat.description}
                  </p>

                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Active Feature
                  </span>
                  <button 
                    onClick={onOpenPlanner}
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Try Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Feature Highlight CTA Box */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white font-heading">
              Ready to experience smart travel?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Create your personalized travel itinerary with real-time budget calculation and safety recommendations in under 60 seconds.
            </p>
          </div>

          <button
            onClick={onOpenPlanner}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all shrink-0 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Launch Smart Planner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
