import React from 'react';
import { Navigation, Clock, IndianRupee, ArrowDown, Sparkles } from 'lucide-react';
import { formatCurrencyRange } from '../../utils/currencyFormatter';

/**
 * Compact Transportation Card Component for Itineraries (Parts 5 & 6 Spec)
 * Rendered between consecutive activities: Location A -> Transit -> Location B
 */
export default function CompactTransportationCard({ 
  from = 'Mall Road', 
  to = 'George Everest', 
  transitType = 'taxi', 
  estimatedCostMin = 400, 
  estimatedCostMax = 700, 
  estimatedTimeMinutes = 30, 
  distanceKm = 8,
  notes = '',
  onChangeTransit
}) {
  const iconMap = {
    taxi: '🚕',
    cab: '🚕',
    bus: '🚌',
    metro: '🚇',
    auto: '🛺',
    car: '🚗',
    rental: '🚗',
    ropeway: '🚡',
    walking: '🚶',
    walk: '🚶'
  };

  const currentIcon = iconMap[String(transitType).toLowerCase()] || '🚕';

  const costDisplay = (estimatedCostMin === 0 && estimatedCostMax === 0)
    ? 'Free (₹0)'
    : formatCurrencyRange(estimatedCostMin, estimatedCostMax);

  return (
    <div className="my-3 pl-4 sm:pl-8 relative before:absolute before:left-2 sm:before:left-4 before:top-0 before:bottom-0 before:w-[2px] before:bg-sky-500/30">
      
      <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-sky-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/30 space-y-2 text-xs hover:border-sky-500/50 transition-all shadow-lg">
        
        {/* Connector Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
          
          <div className="flex items-center gap-2 font-bold text-sky-300">
            <span className="text-base">{currentIcon}</span>
            <span className="uppercase tracking-wider text-[11px]">
              Travel to {to}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-400">
            <IndianRupee className="w-3.5 h-3.5 shrink-0" />
            <span>Est. Fare: <strong>{costDisplay}</strong></span>
          </div>

        </div>

        {/* Details Row: From -> To, Distance, Time */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 pt-1">
          
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-slate-500">From:</span>
            <strong className="text-slate-200 truncate">{from}</strong>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <span className="text-slate-500">To:</span>
            <strong className="text-slate-200 truncate">{to}</strong>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Navigation className="w-3 h-3 text-sky-400" />
              {distanceKm} km
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              {estimatedTimeMinutes} min
            </span>
          </div>

        </div>

        {notes && (
          <div className="text-[10px] text-slate-400 italic pt-1">
            Note: {notes}
          </div>
        )}

      </div>

      {/* Down Arrow Flow Indicator */}
      <div className="flex justify-center -my-1">
        <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 text-xs">
          ↓
        </div>
      </div>

    </div>
  );
}
