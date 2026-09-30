import React from 'react';
import { Search, Hotel, SlidersHorizontal, DollarSign, Star, Navigation, RotateCcw, CheckSquare, Square, Wifi, Coffee } from 'lucide-react';
import { PROPERTY_TYPES, AMENITIES_LIST } from '../../data/staysData';
import { DESTINATIONS_LIST } from '../../data/exploreData';

export default function StayFilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedDestination,
  setSelectedDestination,
  selectedType,
  setSelectedType,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  maxDistance,
  setMaxDistance,
  selectedAmenities,
  setSelectedAmenities,
  sortBy,
  setSortBy,
  onResetFilters,
  resultsCount
}) {

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <aside className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 sticky top-28 shadow-xl">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Hotel className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-white font-heading">Stay Filters</h3>
          <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold">
            {resultsCount}
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Destination Search & Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Destination City
        </label>
        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
        >
          {DESTINATIONS_LIST.map((dest) => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hotel name, resort, spa..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-medium"
          />
        </div>
      </div>

      {/* 2. Property Type Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Property Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedType === type
                  ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Max Price per Night Slider */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Max Price / Night
          </span>
          <span className="text-emerald-400 font-bold">
            {maxPrice >= 350 ? 'Any Price' : `$${maxPrice}`}
          </span>
        </div>
        <input
          type="range"
          min="30"
          max="350"
          step="20"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-emerald-400 cursor-pointer"
        />
      </div>

      {/* 4. Minimum Rating */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Guest Rating
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMinRating(rating)}
              className={`py-1.5 rounded-xl border text-center font-medium transition-all ${
                minRating === rating
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {rating === 0 ? 'All' : `★ ${rating}+`}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Distance from Attractions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-sky-400" /> Distance to Attractions
          </span>
          <span className="text-sky-400 font-bold">
            {maxDistance >= 5 ? 'Any Distance' : `< ${maxDistance} km`}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full accent-sky-400 cursor-pointer"
        />
      </div>

      {/* 6. Amenities Checklist */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Amenities
        </label>
        <div className="space-y-1.5">
          {AMENITIES_LIST.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs text-left transition-all ${
                  isChecked
                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-300 font-semibold'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                <span>{amenity}</span>
                {isChecked ? <CheckSquare className="w-4 h-4 text-sky-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Sort Dropdown */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Sort Stays By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
        >
          <option value="cheapest">Cheapest (Price: Low to High)</option>
          <option value="rating">Highest Rated</option>
          <option value="closest">Closest to Attractions</option>
        </select>
      </div>

    </aside>
  );
}
