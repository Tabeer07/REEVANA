import React from 'react';
import { Star, MapPin, Navigation, ArrowRight, Hotel, Wifi, Shield, Plus, Map } from 'lucide-react';
import { getOpenInMapUrl } from '../../utils/distanceCalculator';

export default function StayCard({ stay, onViewDetails, onOpenMap, onAddToTrip }) {
  const mapUrl = getOpenInMapUrl(stay.name, stay.lat, stay.lng, stay.destinationCity);

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-sky-500/40 flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-2xl">
      
      {/* Image Banner */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={stay.image} 
          alt={stay.name} 
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Property Type Badge Top Left */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-sky-500/40 text-sky-300 text-xs font-extrabold shadow-md">
          {stay.type}
        </div>

        {/* Price Label Badge Top Right (PART 8 Spec: Clearly label Demo price or Price unavailable) */}
        <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-extrabold shadow-md">
          {stay.pricePerNight ? (
            <span>₹{stay.pricePerNight.toLocaleString('en-IN')} / night <span className="text-[9px] text-emerald-400 font-semibold block sm:inline">({stay.isDemoPrice ? 'Demo price' : 'Verified'})</span></span>
          ) : (
            <span className="text-slate-400">Price unavailable</span>
          )}
        </div>

        {/* Rating Badge Bottom Left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-amber-300 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{stay.rating}</span>
          <span className="text-slate-400 font-normal text-[10px]">({stay.reviewsCount})</span>
        </div>

        {/* Distance Badge Bottom Right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 text-[10px] font-semibold">
          <Navigation className="w-3 h-3 text-sky-400" />
          <span>{stay.distanceFromAttractionsKm} km to attractions</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          {/* Location Score Badge if available */}
          {stay.locationScore && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-bold">
              <span>📍 Location Score: {stay.locationScore}/10</span>
            </div>
          )}

          <h4 className="text-lg font-bold text-white font-heading group-hover:text-sky-300 transition-colors line-clamp-1">
            {stay.name}
          </h4>

          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
            {stay.description}
          </p>

          <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">{stay.address}</span>
          </div>
        </div>

        {/* Amenities List */}
        <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Featured Amenities:
          </span>
          <div className="flex flex-wrap gap-1">
            {stay.amenities.slice(0, 3).map((amenity) => (
              <span 
                key={amenity}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium"
              >
                ✓ {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Standard Requirement Buttons: [View Details], [View on Map], [Add to My Trip] */}
        <div className="pt-2 grid grid-cols-3 gap-2 text-xs">
          
          {/* 1. View Details */}
          <button
            onClick={() => onViewDetails(stay)}
            className="py-2 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-bold flex items-center justify-center gap-1 transition-all"
          >
            <span>Details</span>
          </button>

          {/* 2. View on Map */}
          <button
            onClick={() => onOpenMap ? onOpenMap(stay) : window.open(mapUrl, '_blank')}
            className="py-2 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-400 hover:text-sky-300 font-bold flex items-center justify-center gap-1 transition-all"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>

          {/* 3. Add to My Trip */}
          <button
            onClick={() => onAddToTrip && onAddToTrip(stay)}
            className="py-2 px-2 rounded-xl bg-sky-500/20 hover:bg-sky-500 border border-sky-500/40 text-sky-300 hover:text-slate-950 font-extrabold flex items-center justify-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Trip</span>
          </button>

        </div>

      </div>
    </div>
  );
}
