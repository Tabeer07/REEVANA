import React from 'react';
import { Star, MapPin, DollarSign, Navigation, ArrowRight, Utensils, ExternalLink, Plus, Map } from 'lucide-react';
import { getOpenInMapUrl, getDirectionsUrl } from '../../utils/distanceCalculator';

export default function RestaurantCard({ restaurant, onViewDetails, onOpenMap, onAddToTrip }) {
  const directionsUrl = getDirectionsUrl(restaurant.address || restaurant.name, restaurant.lat, restaurant.lng);
  const mapUrl = getOpenInMapUrl(restaurant.name, restaurant.lat, restaurant.lng, restaurant.destinationCity);

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-rose-500/40 flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-2xl">
      
      {/* Image Banner Container */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Data Source Badge Top Left */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-rose-500/40 text-rose-300 text-[10px] font-extrabold shadow-md flex items-center gap-1">
          {restaurant.isGoogleVerified ? (
            <span className="text-emerald-400 font-bold">🟢 Verified Google Place</span>
          ) : (
            <span className="text-amber-300 font-bold">✨ {restaurant.sourceLabel || 'REEVANA Demo Data'}</span>
          )}
        </div>

        {/* Price & Distance Top Right */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-700 text-amber-300 text-xs font-extrabold shadow-md">
          {restaurant.priceRange} (₹{restaurant.avgCostPerPerson.toLocaleString('en-IN')}/person)
        </div>

        {/* Dietary Pills Bottom Left */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {restaurant.dietary.map((d) => (
            <span 
              key={d}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md border shadow-sm ${
                d === 'Vegan' || d === 'Vegetarian'
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950/80 border-slate-700 text-slate-300'
              }`}
            >
              {d === 'Vegan' ? '🌱 Vegan' : d === 'Vegetarian' ? '🥦 Veg' : '🍖 Non-Veg'}
            </span>
          ))}
        </div>

        {/* Distance Badge Bottom Right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 text-[10px] font-semibold">
          <Navigation className="w-3 h-3 text-sky-400" />
          <span>{restaurant.distanceKm} km</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          {/* Cuisine & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5" />
              {restaurant.cuisine}
            </span>

            <div className="flex items-center gap-1 text-amber-300 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating}</span>
              <span className="text-slate-500 font-normal text-[10px]">({restaurant.reviewsCount})</span>
            </div>
          </div>

          {/* Restaurant Title */}
          <h4 className="text-lg font-bold text-white font-heading group-hover:text-rose-300 transition-colors line-clamp-1">
            {restaurant.name}
          </h4>

          {/* Address & Note */}
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
            {restaurant.specialityNote}
          </p>
        </div>

        {/* Popular Dishes Tags */}
        <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Popular Dishes:
          </span>
          <div className="flex flex-wrap gap-1">
            {restaurant.popularDishes.slice(0, 3).map((dish) => (
              <span 
                key={dish}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium"
              >
                🍱 {dish}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Standard Requirement Buttons (View Details, View on Map, Add to My Trip, Get Directions) */}
        <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
          
          {/* 1. View Details */}
          <button
            onClick={() => onViewDetails(restaurant)}
            className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-bold flex items-center justify-center gap-1 transition-all"
          >
            <span>View Details</span>
          </button>

          {/* 2. View on Map */}
          <button
            onClick={() => onOpenMap ? onOpenMap(restaurant) : window.open(mapUrl, '_blank')}
            className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-400 hover:text-sky-300 font-bold flex items-center justify-center gap-1 transition-all"
          >
            <Map className="w-3.5 h-3.5" />
            <span>View on Map</span>
          </button>

          {/* 3. Add to My Trip */}
          <button
            onClick={() => onAddToTrip && onAddToTrip(restaurant)}
            className="py-2 px-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 border border-rose-500/40 text-rose-300 hover:text-white font-extrabold flex items-center justify-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to My Trip</span>
          </button>

          {/* 4. Get Directions */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 hover:text-emerald-300 font-bold flex items-center justify-center gap-1 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>

        </div>

      </div>
    </div>
  );
}
