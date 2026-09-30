import React, { useState, useMemo } from 'react';
import FilterSidebar from '../components/explore/FilterSidebar';
import AttractionCard from '../components/explore/AttractionCard';
import PlaceDetailsModal from '../components/explore/PlaceDetailsModal';
import InteractiveMapView from '../components/explore/InteractiveMapView';
import HiddenGemsExploreSection from '../components/explore/HiddenGemsExploreSection';
import { EXPLORE_ATTRACTIONS } from '../data/exploreData';
import { Compass, Map, Grid, Sparkles, Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

export default function ExplorePage({ onOpenPlanner }) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('All Destinations');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxBudget, setMaxBudget] = useState(100);
  const [maxDistance, setMaxDistance] = useState(30);
  const [minRating, setMinRating] = useState(0);
  const [selectedCrowd, setSelectedCrowd] = useState('All');

  // UI States
  const [viewMode, setViewMode] = useState('split'); // 'grid', 'map', 'split'
  const [selectedPlaceForModal, setSelectedPlaceForModal] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter Logic
  const filteredAttractions = useMemo(() => {
    return EXPLORE_ATTRACTIONS.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCity = item.destinationCity.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesDesc && !matchesCategory) return false;
      }

      // 2. Destination Selector
      if (selectedDestination !== 'All Destinations') {
        if (item.destinationCity.toLowerCase() !== selectedDestination.toLowerCase()) return false;
      }

      // 3. Category Filter
      if (selectedCategory !== 'All') {
        if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }

      // 4. Budget Filter
      if (maxBudget < 100 && maxBudget > 0) {
        if (item.cost > maxBudget) return false;
      } else if (maxBudget === 0) {
        if (item.cost > 0) return false;
      }

      // 5. Distance Filter
      if (maxDistance < 30) {
        if (item.distanceKm > maxDistance) return false;
      }

      // 6. Rating Filter
      if (minRating > 0) {
        if (item.rating < minRating) return false;
      }

      // 7. Crowd Level Filter
      if (selectedCrowd !== 'All') {
        if (item.crowdLevel.toLowerCase() !== selectedCrowd.toLowerCase()) return false;
      }

      return true;
    });
  }, [searchQuery, selectedDestination, selectedCategory, maxBudget, maxDistance, minRating, selectedCrowd]);

  const hiddenGemsList = useMemo(() => {
    return EXPLORE_ATTRACTIONS.filter(item => item.isHiddenGem);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDestination('All Destinations');
    setSelectedCategory('All');
    setMaxBudget(100);
    setMaxDistance(30);
    setMinRating(0);
    setSelectedCrowd('All');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-12">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Smart Tourism Explorer</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Discover Attractions & Hidden Gems
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Search by destination, filter by real-time crowd level, budget, and travel interests to build your ideal travel experiences.
            </p>
          </div>

          {/* View Mode Switcher Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold"
            >
              <Filter className="w-4 h-4 text-sky-400" />
              <span>Filters ({filteredAttractions.length})</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  viewMode === 'split' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Split View</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  viewMode === 'map' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map Only</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters Drawer Modal */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-heading">Explore Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-slate-400 text-sm font-bold">Done ✕</button>
            </div>
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              maxDistance={maxDistance}
              setMaxDistance={setMaxDistance}
              minRating={minRating}
              setMinRating={setMinRating}
              selectedCrowd={selectedCrowd}
              setSelectedCrowd={setSelectedCrowd}
              onResetFilters={handleResetFilters}
              totalResultsCount={filteredAttractions.length}
            />
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar (1 col) */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              maxDistance={maxDistance}
              setMaxDistance={setMaxDistance}
              minRating={minRating}
              setMinRating={setMinRating}
              selectedCrowd={selectedCrowd}
              setSelectedCrowd={setSelectedCrowd}
              onResetFilters={handleResetFilters}
              totalResultsCount={filteredAttractions.length}
            />
          </div>

          {/* Cards & Map Area (3 cols) */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Active Filter Chips Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              <span className="font-semibold text-slate-300">Active Criteria:</span>
              
              {selectedDestination !== 'All Destinations' && (
                <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  📍 {selectedDestination}
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  🏷️ {selectedCategory}
                </span>
              )}

              {selectedCrowd !== 'All' && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  👥 {selectedCrowd} Crowd
                </span>
              )}

              {maxBudget < 100 && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  💵 &le; ₹{maxBudget}
                </span>
              )}

              {(selectedDestination !== 'All Destinations' || selectedCategory !== 'All' || selectedCrowd !== 'All' || maxBudget < 100 || searchQuery) ? (
                <button 
                  onClick={handleResetFilters}
                  className="text-sky-400 underline font-semibold ml-auto hover:text-sky-300"
                >
                  Clear All
                </button>
              ) : (
                <span className="text-slate-500 text-[11px]">Showing all curated destinations</span>
              )}
            </div>

            {/* Results Grid / Map Switcher */}
            {filteredAttractions.length === 0 ? (
              
              /* No Results State */
              <div className="glass-panel p-12 rounded-3xl text-center space-y-4 border border-slate-800">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">No attractions match your current filters</h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                  Try adjusting your budget slider, expanding the distance radius, or clearing category filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Filters
                </button>
              </div>

            ) : viewMode === 'map' ? (
              
              /* Map Only View */
              <InteractiveMapView 
                attractions={filteredAttractions}
                onSelectAttraction={(attr) => setSelectedPlaceForModal(attr)}
                onAddToTrip={(place) => onOpenPlanner && onOpenPlanner(place)}
              />

            ) : viewMode === 'split' ? (
              
              /* Split Cards + Map View */
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAttractions.map((attr) => (
                    <AttractionCard 
                      key={attr.id}
                      attraction={attr}
                      onViewDetails={(place) => setSelectedPlaceForModal(place)}
                      onAddToTrip={(place) => onOpenPlanner && onOpenPlanner(place)}
                    />
                  ))}
                </div>

                {/* Map Section under Cards */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                    <Map className="w-5 h-5 text-sky-400" /> Interactive Location Map
                  </h3>
                  <InteractiveMapView 
                    attractions={filteredAttractions}
                    onSelectAttraction={(attr) => setSelectedPlaceForModal(attr)}
                    onAddToTrip={(place) => onOpenPlanner && onOpenPlanner(place)}
                  />
                </div>
              </div>

            ) : (
              
              /* Grid Only View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAttractions.map((attr) => (
                  <AttractionCard 
                    key={attr.id}
                    attraction={attr}
                    onViewDetails={(place) => setSelectedPlaceForModal(place)}
                    onAddToTrip={(place) => onOpenPlanner && onOpenPlanner(place)}
                  />
                ))}
              </div>

            )}

            {/* Dedicated Hidden Gems Section */}
            <HiddenGemsExploreSection 
              hiddenGems={hiddenGemsList}
              onViewDetails={(gem) => setSelectedPlaceForModal(gem)}
            />

          </div>

        </div>

      </div>

      {/* Place Details Modal Popup */}
      <PlaceDetailsModal 
        place={selectedPlaceForModal}
        onClose={() => setSelectedPlaceForModal(null)}
        onPlanTrip={(place) => {
          setSelectedPlaceForModal(null);
          if (onOpenPlanner) onOpenPlanner(place);
        }}
      />

    </div>
  );
}
