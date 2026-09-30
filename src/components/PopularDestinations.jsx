import React, { useState } from 'react';
import { Star, MapPin, DollarSign, Calendar, ArrowRight, Compass, Users } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/mockData';

export default function PopularDestinations({ onSelectDestination }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cultural', 'Coastal', 'Nature & Adventure', 'Historical', 'Mountains'];

  const filteredDestinations = selectedCategory === 'All' 
    ? POPULAR_DESTINATIONS 
    : POPULAR_DESTINATIONS.filter(d => d.category === selectedCategory);

  return (
    <section id="popular" className="py-20 relative bg-slate-950/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Hand-Picked Travel Spots</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Popular Destinations
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore world-famous landmarks and top-rated travel hubs equipped with real-time budget and crowd insight.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20 font-semibold' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div 
              key={dest.id}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-slate-800 hover:border-sky-500/40"
            >
              {/* Image & Badge Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Category Pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white text-[11px] font-semibold">
                  {dest.category}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-bold shadow-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                  <span className="text-slate-400 font-normal text-[10px]">({dest.reviewsCount})</span>
                </div>

                {/* Location Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.country}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading tracking-tight">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {dest.description}
                </p>

                {/* Meta Highlights Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                    <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500">Est. Budget</div>
                      <div className="font-semibold text-slate-200">{dest.avgDailyBudget}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500">Best Season</div>
                      <div className="font-semibold text-slate-200">{dest.bestTime}</div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {dest.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-400 text-[10px] border border-slate-800 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Explore Button CTA */}
                <button
                  onClick={() => onSelectDestination ? onSelectDestination(dest) : alert(`Exploring ${dest.name}, ${dest.country}`)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900 hover:bg-sky-500 text-slate-200 hover:text-white border border-slate-800 hover:border-sky-400 text-xs font-bold transition-all duration-300 group/btn shadow-md hover:shadow-sky-500/20"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-4 h-4 text-sky-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
