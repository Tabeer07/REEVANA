import React from 'react';
import { Search, Landmark, MapPin, Sparkles } from 'lucide-react';
import { MONUMENTS_DATA } from '../../data/culturalGuideData';

export default function MonumentSelector({
  selectedMonumentId,
  onSelectMonument,
  searchQuery,
  setSearchQuery
}) {
  const filteredMonuments = MONUMENTS_DATA.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.location.toLowerCase().includes(q) || m.historicalPeriod.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Landmark className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-bold text-white font-heading">
            Select World Heritage Monument
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search monument or city..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>
      </div>

      {/* Monument Cards Horizontal Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {filteredMonuments.map((m) => {
          const isSelected = selectedMonumentId === m.id;

          return (
            <div
              key={m.id}
              onClick={() => onSelectMonument(m)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border group h-36 flex flex-col justify-end p-3 ${
                isSelected
                  ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20 scale-102'
                  : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={m.image}
                alt={m.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {isSelected && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold shadow-md">
                  Active
                </div>
              )}

              <div className="relative z-10 space-y-0.5">
                <span className="text-[10px] text-amber-300 font-semibold block truncate">
                  📍 {m.location}
                </span>
                <h4 className="text-xs font-bold text-white font-heading line-clamp-1 group-hover:text-amber-200">
                  {m.name}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
