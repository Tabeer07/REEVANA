import React from 'react';
import { MapPin, Clock, Navigation, Star, Sparkles, AlertCircle } from 'lucide-react';
import { formatCurrencyRange } from '../../utils/currencyFormatter';

/**
 * Reusable Transportation Card Component (Part 9 UI Spec)
 */
export default function TransportationCard({ option, from = 'Origin', to = 'Destination', onSelectMode }) {
  if (!option) return null;

  const {
    type = 'taxi',
    label = 'Taxi',
    icon = '🚕',
    estimatedCostMin = 400,
    estimatedCostMax = 700,
    estimatedTimeMinutes = 30,
    distanceKm = 8,
    comfort = 'High',
    convenience = 'High',
    recommended = false,
    notes = ''
  } = option;

  const costDisplay = estimatedCostMin === 0 && estimatedCostMax === 0
    ? 'Free (₹0)'
    : formatCurrencyRange(estimatedCostMin, estimatedCostMax);

  return (
    <div className={`glass-card p-5 rounded-3xl border transition-all space-y-4 relative overflow-hidden group ${
      recommended
        ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-900 shadow-xl shadow-amber-500/10'
        : 'border-slate-800 hover:border-sky-500/40 bg-slate-900/80'
    }`}>
      
      {/* Recommended Banner Badge */}
      {recommended && (
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Recommended</span>
        </div>
      )}

      {/* Header: Mode Icon & Name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-inner shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="text-base font-bold text-white font-heading">
            {label}
          </h4>
          <div className="text-xs text-sky-400 font-semibold flex items-center gap-1">
            <span>{from}</span>
            <span>→</span>
            <span className="text-slate-200">{to}</span>
          </div>
        </div>
      </div>

      {/* Metrics Row: Distance & Time */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center gap-2">
          <Navigation className="w-4 h-4 text-sky-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Distance</div>
            <div className="font-bold text-white text-xs">{distanceKm} km</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Est. Time</div>
            <div className="font-bold text-white text-xs">{estimatedTimeMinutes} min</div>
          </div>
        </div>
      </div>

      {/* Price & Comfort Level */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
            <span>Approximate Cost</span>
            <AlertCircle className="w-3 h-3 text-slate-500" title="Estimated fare based on local rates" />
          </div>
          <div className="text-lg font-extrabold text-emerald-400 font-heading">
            {costDisplay}
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Comfort</div>
          <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold pt-0.5">
            {comfort === 'High' ? '★★★★★' : comfort === 'Moderate' ? '★★★☆☆' : '★★☆☆☆'}
          </div>
        </div>
      </div>

      {/* Notes & Disclaimer */}
      {notes && (
        <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800/60">
          💡 {notes}
        </p>
      )}

      {/* Action Button if Callback Provided */}
      {onSelectMode && (
        <button
          type="button"
          onClick={() => onSelectMode(option)}
          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
            recommended
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
        >
          Select This Transit Option
        </button>
      )}

    </div>
  );
}
