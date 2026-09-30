import React from 'react';
import { Search, Utensils, SlidersHorizontal, DollarSign, Star, Navigation, RotateCcw, Leaf } from 'lucide-react';
import { CUISINE_TYPES, DIETARY_OPTIONS } from '../../data/foodData';

export default function FoodFilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedDietary,
  setSelectedDietary,
  selectedType,
  setSelectedType,
  selectedPrice,
  setSelectedPrice,
  minRating,
  setMinRating,
  maxDistance,
  setMaxDistance,
  sortBy,
  setSortBy,
  onResetFilters,
  resultsCount
}) {
  return (
    <aside className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 sticky top-28 shadow-xl">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-rose-400" />
          <h3 className="text-lg font-bold text-white font-heading">Food Filters</h3>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
            {resultsCount}
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Search Bar */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Search Food / Dish
        </label>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ramen, sushi, vegan..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-medium"
          />
        </div>
      </div>

      {/* 2. Dietary Preference Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Dietary Preference
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {DIETARY_OPTIONS.map((diet) => (
            <button
              key={diet}
              type="button"
              onClick={() => setSelectedDietary(diet)}
              className={`py-2 px-2.5 rounded-xl border text-center font-medium transition-all ${
                selectedDietary === diet
                  ? diet === 'Vegan' || diet === 'Vegetarian'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {diet === 'Vegan' ? '🌱 Vegan' : diet === 'Vegetarian' ? '🥦 Veg' : diet === 'Non-vegetarian' ? '🍖 Non-Veg' : 'All Diets'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Venue Category Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Dining Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CUISINE_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedType === type
                  ? 'bg-rose-500 text-white font-semibold shadow-md shadow-rose-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Price Tier Selector */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Price Range
        </label>
        <div className="grid grid-cols-5 gap-1 text-[11px]">
          {['All', '₹', '₹₹', '₹₹₹', '₹₹₹₹'].map((price) => (
            <button
              key={price}
              type="button"
              onClick={() => setSelectedPrice(price)}
              className={`py-1.5 rounded-xl border text-center font-bold transition-all ${
                selectedPrice === price
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Rating Filter */}
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
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {rating === 0 ? 'All' : `★ ${rating}+`}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Distance Range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-sky-400" /> Max Distance
          </span>
          <span className="text-sky-400 font-bold">
            {maxDistance >= 10 ? 'Any Distance' : `< ${maxDistance} km`}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full accent-sky-400 cursor-pointer"
        />
      </div>

      {/* 7. Sorting Dropdown */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Sort Results By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500 font-medium cursor-pointer"
        >
          <option value="rating">Highest Rating</option>
          <option value="distance">Nearest Distance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

    </aside>
  );
}
