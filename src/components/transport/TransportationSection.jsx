import React, { useState } from 'react';
import { Navigation, MapPin, Sparkles, Info, Bus, Car, Bike, Footprints } from 'lucide-react';
import TransportationCard from './TransportationCard';
import { getTransportForLocation } from '../../data/transportData';

/**
 * Reusable Transportation Section Component for Destination Pages & Detail Modals (Parts 3 & 4 Spec)
 */
export default function TransportationSection({ destinationName = 'George Everest', originName = 'Mussoorie Mall Road' }) {
  const transportData = getTransportForLocation(destinationName, originName);
  const [selectedMode, setSelectedMode] = useState(transportData.recommendedType);

  const recommendedOption = transportData.options.find(opt => opt.type === transportData.recommendedType) || transportData.options[0];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>Transit & Route Guide</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            📍 How to Reach {transportData.to}
          </h3>
          <p className="text-xs text-slate-400">
            From: <strong className="text-white">{transportData.from}</strong> • Est. Distance: <strong className="text-sky-400">{transportData.distanceKm} km</strong>
          </p>
        </div>

        {/* Data Disclaimer Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Fares are <strong>Approximate Costs</strong></span>
        </div>
      </div>

      {/* "Best Option For You" Recommendation Callout Banner */}
      {recommendedOption && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-sky-950/30 border border-amber-500/30 text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
              💡
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                <span>Recommended Option:</span>
                <span className="text-white font-heading">{recommendedOption.label}</span>
              </div>
              <p className="text-slate-300 text-xs">
                {transportData.recommendedReason}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedMode(recommendedOption.type)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 transition-all shadow-md shadow-amber-500/20"
          >
            Choose Recommended
          </button>
        </div>
      )}

      {/* Grid of All Available Transit Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transportData.options.map((opt) => (
          <TransportationCard
            key={opt.type}
            option={opt}
            from={transportData.from}
            to={transportData.to}
            onSelectMode={(selected) => setSelectedMode(selected.type)}
          />
        ))}
      </div>

    </div>
  );
}
