import React, { useState } from 'react';
import { MapPin, Navigation, Star, DollarSign, X, Layers, Compass, ArrowRight } from 'lucide-react';

export default function InteractiveMapView({ attractions, onSelectAttraction }) {
  const [activePin, setActivePin] = useState(attractions[0] || null);

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden relative min-h-[480px] h-full flex flex-col justify-between shadow-2xl">
      
      {/* Map Control Bar Top */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold shadow-lg pointer-events-auto">
          <Compass className="w-4 h-4 text-sky-400 animate-spin-slow" />
          <span>Interactive Destination Map</span>
          <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px] font-bold">
            {attractions.length} Pins
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button 
            onClick={() => alert('Map View Satellite / Dark Mode Toggle')}
            className="p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white text-xs"
            title="Layer View"
          >
            <Layers className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Map Background Grid Simulation */}
      <div className="absolute inset-0 bg-slate-950 z-0 overflow-hidden">
        {/* Subtle Map Topography Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-slate-900/60"></div>
        
        {/* Simulated Coastline Curves */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M -100 200 Q 200 100, 500 400 T 1200 300" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M 0 500 Q 400 300, 800 600 T 1600 400" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Pins Layer */}
      <div className="relative z-10 w-full h-full min-h-[420px] p-6 flex items-center justify-center">
        <div className="relative w-full max-w-xl h-96">
          {attractions.map((attraction, idx) => {
            // Calculate pseudo coordinates for visual grid placement
            const posX = 15 + ((idx * 27) % 70);
            const posY = 15 + ((idx * 33) % 70);
            const isSelected = activePin?.id === attraction.id;

            return (
              <div 
                key={attraction.id}
                style={{ top: `${posY}%`, left: `${posX}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
              >
                {/* Pin Button */}
                <button
                  onClick={() => setActivePin(attraction)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-xl ${
                    isSelected
                      ? 'bg-sky-500 text-white border-white scale-110 ring-4 ring-sky-500/30 font-bold z-30'
                      : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-sky-400 hover:scale-105 z-10'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-400'}`} />
                  <span className="text-[11px] truncate max-w-[90px] font-semibold">{attraction.name.split(' ')[0]}</span>
                </button>

                {/* Pulse Ring */}
                {isSelected && (
                  <span className="absolute -inset-1 rounded-full bg-sky-400 opacity-40 animate-ping pointer-events-none"></span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Marker Details Drawer (Bottom Popup Overlay) */}
      {activePin && (
        <div className="relative z-30 p-4 m-4 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img 
              src={activePin.image} 
              alt={activePin.name} 
              className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-sky-400 uppercase">{activePin.category}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">• {activePin.crowdLevel} Crowd</span>
              </div>
              <h5 className="text-sm font-bold text-white font-heading truncate max-w-xs sm:max-w-md">
                {activePin.name}
              </h5>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {activePin.rating}
                </span>
                <span>{activePin.costFormatted}</span>
                <span>{activePin.distanceKm} km away</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => onSelectAttraction(activePin)}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-md shadow-sky-500/20 flex items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
