import React from 'react';
import { Search, MapPin, SlidersHorizontal, DollarSign, Star, Users, Navigation, RotateCcw, Sparkles } from 'lucide-react';
import { DESTINATIONS_LIST, EXPLORE_CATEGORIES } from '../../data/exploreData';

export default function FilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedDestination,
  setSelectedDestination,
  selectedCategory,
  setSelectedCategory,
  maxBudget,
  setMaxBudget,
  maxDistance,
  setMaxDistance,
  minRating,
  setMinRating,
  selectedCrowd,
  setSelectedCrowd,
  onResetFilters,
  totalResultsCount
}) {
  return (
    <aside className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 sticky top-28 shadow-xl">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-white font-heading">Filters</h3>
          <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold">
            {totalResultsCount}
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors"
          title="Reset all filter choices"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Search Bar */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Search Keyword
        </label>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search attractions, temples, food..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-medium"
          />
        </div>
      </div>

      {/* 2. Destination Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Destination City
        </label>
        <div className="relative">
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-sky-500 font-medium appearance-none cursor-pointer"
          >
            {DESTINATIONS_LIST.map((dest) => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
          <MapPin className="w-4 h-4 text-sky-400 absolute right-3.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* 3. Category Filters */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
          {EXPLORE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Budget Slider */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Max Est. Cost
          </span>
          <span className="text-emerald-400 font-bold">
            {maxBudget >= 100 ? 'Any Price' : maxBudget === 0 ? 'Free Entry' : `$${maxBudget}`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={maxBudget}
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          className="w-full accent-sky-400 cursor-pointer"
        />
      </div>

      {/* 5. Distance Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-amber-400" /> Max Distance
          </span>
          <span className="text-amber-400 font-bold">
            {maxDistance >= 30 ? 'Any Distance' : `< ${maxDistance} km`}
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="30"
          step="5"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full accent-amber-400 cursor-pointer"
        />
      </div>

      {/* 6. Rating Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Minimum Rating
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMinRating(rating)}
              className={`py-1.5 rounded-xl border text-center font-medium transition-all ${
                minRating === rating
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {rating === 0 ? 'All' : `★ ${rating}+`}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Crowd Level Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-emerald-400" /> Crowd Level
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {['All', 'Low', 'Moderate', 'High'].map((crowd) => (
            <button
              key={crowd}
              type="button"
              onClick={() => setSelectedCrowd(crowd)}
              className={`py-1.5 px-2 rounded-xl border text-center font-medium transition-all ${
                selectedCrowd === crowd
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {crowd === 'Low' ? '🟢 Quiet / Low' : crowd === 'Moderate' ? '🟡 Moderate' : crowd === 'High' ? '🔴 High Crowd' : 'All Density'}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}
