import React from 'react';
import { Star, MapPin, DollarSign, Clock, Users, Sparkles, ArrowRight, Navigation, PlusCircle } from 'lucide-react';

export default function AttractionCard({ attraction, onViewDetails, onAddToTrip }) {
  const getCrowdBadge = (level) => {
    switch (level) {
      case 'Low':
        return { label: '🟢 Low Crowd', color: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' };
      case 'Moderate':
        return { label: '🟡 Moderate', color: 'bg-amber-950/80 border-amber-500/40 text-amber-300' };
      case 'High':
        return { label: '🔴 High Crowd', color: 'bg-rose-950/80 border-rose-500/40 text-rose-300' };
      default:
        return { label: level, color: 'bg-slate-900 border-slate-800 text-slate-300' };
    }
  };

  const crowdBadge = getCrowdBadge(attraction.crowdLevel);

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-sky-500/40 flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-2xl">
      
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={attraction.image} 
          alt={attraction.name} 
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"></div>

        {/* Crowd Badge */}
        <div className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full backdrop-blur-md border text-[11px] font-bold shadow-md ${crowdBadge.color}`}>
          {crowdBadge.label}
        </div>

        {/* Hidden Gem Pill */}
        {attraction.isHiddenGem && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-extrabold tracking-wide uppercase shadow-md animate-pulse">
            <Sparkles className="w-3 h-3 fill-slate-950 text-slate-950" />
            <span>Hidden Gem</span>
          </div>
        )}

        {/* Category Pill Bottom Left */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-700 text-white text-[10px] font-semibold">
          {attraction.category}
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 text-[10px] font-semibold">
          <Navigation className="w-3 h-3 text-sky-400" />
          <span>{attraction.distanceKm} km</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          {/* Rating & City */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-sky-400 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {attraction.destinationCity}
            </span>

            <div className="flex items-center gap-1 text-amber-300 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{attraction.rating}</span>
              <span className="text-slate-500 font-normal text-[10px]">({attraction.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-lg font-bold text-white font-heading group-hover:text-sky-300 transition-colors line-clamp-1">
            {attraction.name}
          </h4>

          {/* Short Description */}
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
            {attraction.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-500">Est. Cost</div>
              <div className="font-semibold text-slate-200 text-[11px] truncate">{attraction.costFormatted}</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-500">Best Time</div>
              <div className="font-semibold text-slate-200 text-[11px] truncate">{attraction.bestTimeToVisit.split('(')[0]}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {onAddToTrip && (
            <button
              onClick={() => onAddToTrip(attraction)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
              title="Add spot to active trip itinerary"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add to Trip</span>
            </button>
          )}

          <button
            onClick={() => onViewDetails(attraction)}
            className={`${onAddToTrip ? 'px-3' : 'w-full'} flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-500 text-slate-200 hover:text-white border border-slate-800 hover:border-sky-400 text-xs font-bold transition-all duration-300 group/btn`}
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
          </button>
        </div>

      </div>
    </div>
  );
}
