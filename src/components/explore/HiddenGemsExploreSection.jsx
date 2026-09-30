import React from 'react';
import { Sparkles, Users, ArrowRight, ShieldCheck, Bookmark } from 'lucide-react';

export default function HiddenGemsExploreSection({ hiddenGems, onViewDetails }) {
  return (
    <section className="space-y-8 pt-8 border-t border-slate-800/80">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Off-The-Beaten-Track</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Dedicated Hidden Gems
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Escape the tourist traps with our verified quiet sanctuaries, boasting low crowd capacity and serene atmospheres.
          </p>
        </div>

        <span className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Low-Crowd Status
        </span>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hiddenGems.map((gem) => (
          <div 
            key={gem.id}
            className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 space-y-4 p-5 flex flex-col justify-between group"
          >
            {/* Top Image */}
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <img 
                src={gem.image} 
                alt={gem.name} 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                🟢 Low Crowd Density
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white font-heading truncate">
                {gem.name}
              </div>
            </div>

            {/* Description & Crowd Meter */}
            <div className="space-y-3">
              <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                {gem.description}
              </p>

              {/* Crowd Capacity Gauge */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Estimated Visitor Density</span>
                  <span className="text-emerald-400 font-bold">~22% Capacity</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-[22%] h-full bg-emerald-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => onViewDetails(gem)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Explore Hidden Spot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
