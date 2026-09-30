import React from 'react';
import { PiggyBank, Sparkles, ArrowRight, Check, Zap } from 'lucide-react';

export default function CheaperAlternativesCard({
  cheaperAlternatives = [],
  currencySymbol = '$',
  onApplyAlternative
}) {
  if (!cheaperAlternatives || cheaperAlternatives.length === 0) return null;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 shadow-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Smart Cheaper Alternatives
            </h3>
            <p className="text-xs text-slate-400">
              Recommended adjustments to optimize costs without sacrificing travel quality
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold self-start sm:self-auto">
          ✨ AI Cost Optimizer
        </span>
      </div>

      {/* Alternatives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cheaperAlternatives.map((alt) => (
          <div 
            key={alt.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 space-y-3 flex flex-col justify-between group transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  {alt.type} Optimization
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                  Save ~{currencySymbol}{alt.savings.toLocaleString()}
                </span>
              </div>

              <h4 className="text-base font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                {alt.title}
              </h4>

              <p className="text-slate-300 text-xs leading-relaxed">
                {alt.desc}
              </p>
            </div>

            {/* Apply 1-Click Savings Button */}
            <button
              onClick={() => onApplyAlternative(alt.type, alt.targetVal)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:text-slate-950" />
              <span>Apply Savings (Save {currencySymbol}{alt.savings.toLocaleString()})</span>
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
