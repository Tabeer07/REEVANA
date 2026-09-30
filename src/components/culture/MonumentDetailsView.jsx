import React from 'react';
import { MapPin, Calendar, BookOpen, Sparkles, Clock, Ticket, ShieldCheck, CheckCircle2, Landmark } from 'lucide-react';

export default function MonumentDetailsView({ monument }) {
  if (!monument) return null;

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl space-y-6">
      
      {/* Hero Image Banner */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img
          src={monument.image}
          alt={monument.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Historical Period Badge Top Left */}
        <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-extrabold shadow-lg flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>{monument.historicalPeriod}</span>
        </div>

        {/* Location & Name Overlay */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <div className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold">
            <MapPin className="w-4 h-4" />
            <span>{monument.location}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
            {monument.name}
          </h2>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Short History */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Short History
          </h3>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
            {monument.shortHistory}
          </p>
        </div>

        {/* Cultural Significance Highlight Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/30 space-y-2">
          <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> Cultural Significance
          </h4>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {monument.culturalSignificance}
          </p>
        </div>

        {/* Interesting Facts Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" /> Interesting Facts & Trivia
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {monument.interestingFacts.map((fact, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visiting Information Panel */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <Clock className="w-4 h-4 text-sky-400" /> Visiting Information & Visitor Advice
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Opening Hours</span>
              <div className="font-bold text-white">{monument.visitingInfo.openingHours}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Entry Ticket Fee</span>
              <div className="font-bold text-emerald-400">{monument.visitingInfo.entryFee}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Best Time of Day</span>
              <div className="font-bold text-amber-300">{monument.visitingInfo.bestTimeToVisit}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Dress Code & Etiquette</span>
              <div className="font-medium text-slate-300 line-clamp-2">{monument.visitingInfo.dressCode}</div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
