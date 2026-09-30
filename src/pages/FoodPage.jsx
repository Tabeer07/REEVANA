import React, { useState, useMemo } from 'react';
import FoodFilterSidebar from '../components/food/FoodFilterSidebar';
import RestaurantCard from '../components/food/RestaurantCard';
import RestaurantDetailsModal from '../components/food/RestaurantDetailsModal';
import AddToTripModal from '../components/food/AddToTripModal';
import InteractiveMapView from '../components/map/InteractiveMapView';
import { RESTAURANTS_DATA } from '../data/foodData';
import { Utensils, Search, RotateCcw, Filter, Sparkles, MapPin, Map } from 'lucide-react';

export default function FoodPage({ onAddToTrip }) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(10);
  const [sortBy, setSortBy] = useState('rating');

  // UI States
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [addToTripRestaurant, setAddToTripRestaurant] = useState(null);
  const [mapRestaurant, setMapRestaurant] = useState(null);
  const [showMapView, setShowMapView] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter & Sort Logic
  const filteredRestaurants = useMemo(() => {
    let result = RESTAURANTS_DATA.filter((rest) => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = rest.name.toLowerCase().includes(q);
        const matchesCuisine = rest.cuisine.toLowerCase().includes(q);
        const matchesCity = (rest.destinationCity || '').toLowerCase().includes(q);
        const matchesDishes = rest.popularDishes.some(d => d.toLowerCase().includes(q));
        if (!matchesName && !matchesCuisine && !matchesCity && !matchesDishes) return false;
      }

      // 2. Dietary Filter
      if (selectedDietary !== 'All') {
        if (!rest.dietary.includes(selectedDietary)) return false;
      }

      // 3. Type Filter
      if (selectedType !== 'All Types') {
        if (rest.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      }

      // 4. Price Filter
      if (selectedPrice !== 'All') {
        if (rest.priceRange !== selectedPrice) return false;
      }

      // 5. Rating Filter
      if (minRating > 0) {
        if (rest.rating < minRating) return false;
      }

      // 6. Distance Filter
      if (maxDistance < 10) {
        if (rest.distanceKm > maxDistance) return false;
      }

      return true;
    });

    // Sort Logic
    return result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'price-low') return a.avgCostPerPerson - b.avgCostPerPerson;
      if (sortBy === 'price-high') return b.avgCostPerPerson - a.avgCostPerPerson;
      return 0;
    });
  }, [searchQuery, selectedDietary, selectedType, selectedPrice, minRating, maxDistance, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDietary('All');
    setSelectedType('All Types');
    setSelectedPrice('All');
    setMinRating(0);
    setMaxDistance(10);
    setSortBy('rating');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5" />
              <span>Smart Culinary Finder</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Smart Food & Dining Finder
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Filter by dietary options (Veg, Non-veg, Vegan), dining atmosphere, price in INR (₹), and distance with verified Google Place indicators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMapView(!showMapView)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                showMapView 
                  ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>{showMapView ? 'Hide Map View' : 'Show Interactive Map'}</span>
            </button>

            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold"
            >
              <Filter className="w-4 h-4 text-rose-400" />
              <span>Filters ({filteredRestaurants.length})</span>
            </button>
          </div>
        </div>

        {/* Interactive Map View Overlay */}
        {showMapView && (
          <div className="glass-panel p-4 rounded-3xl border border-rose-500/30 space-y-3 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                Food Finder Map ({filteredRestaurants.length} Restaurants)
              </h3>
              <span className="text-xs text-slate-400">Click marker to inspect restaurant details</span>
            </div>
            <InteractiveMapView
              selectedDestination="Mussoorie"
              routeSequence={filteredRestaurants.map(r => ({ place: r.name, lat: r.lat, lng: r.lng }))}
              height="380px"
            />
          </div>
        )}

        {/* Mobile Filters Drawer Modal */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-heading">Food Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-slate-400 text-sm font-bold">Done ✕</button>
            </div>
            <FoodFilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDietary={selectedDietary}
              setSelectedDietary={setSelectedDietary}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              maxDistance={maxDistance}
              setMaxDistance={setMaxDistance}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
              resultsCount={filteredRestaurants.length}
            />
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FoodFilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDietary={selectedDietary}
              setSelectedDietary={setSelectedDietary}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              maxDistance={maxDistance}
              setMaxDistance={setMaxDistance}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
              resultsCount={filteredRestaurants.length}
            />
          </div>

          {/* Cards Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Active Filters Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              <span className="font-semibold text-slate-300">Active Filters:</span>
              
              {selectedDietary !== 'All' && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  🥗 {selectedDietary}
                </span>
              )}

              {selectedType !== 'All Types' && (
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                  🍽️ {selectedType}
                </span>
              )}

              {selectedPrice !== 'All' && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  💵 {selectedPrice}
                </span>
              )}

              {(selectedDietary !== 'All' || selectedType !== 'All Types' || selectedPrice !== 'All' || searchQuery) ? (
                <button 
                  onClick={handleResetFilters}
                  className="text-rose-400 underline font-semibold ml-auto hover:text-rose-300"
                >
                  Clear All
                </button>
              ) : (
                <span className="text-slate-500 text-[11px]">Showing all curated dining options</span>
              )}
            </div>

            {/* Results Grid */}
            {filteredRestaurants.length === 0 ? (
              
              <div className="glass-panel p-12 rounded-3xl text-center space-y-4 border border-slate-800">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">No restaurants match your food criteria</h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                  Try broadening your dietary filter or expanding the distance radius.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-500/20 hover:bg-rose-400 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Food Filters
                </button>
              </div>

            ) : (
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((rest) => (
                  <RestaurantCard 
                    key={rest.id}
                    restaurant={rest}
                    onViewDetails={(r) => setSelectedRestaurant(r)}
                    onOpenMap={(r) => {
                      setMapRestaurant(r);
                      setShowMapView(true);
                    }}
                    onAddToTrip={(r) => setAddToTripRestaurant(r)}
                  />
                ))}
              </div>

            )}

          </div>

        </div>

      </div>

      {/* Restaurant Details Modal Popup */}
      <RestaurantDetailsModal 
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onAddToTrip={(r) => {
          setSelectedRestaurant(null);
          setAddToTripRestaurant(r);
        }}
      />

      {/* Add To Trip Selection Modal */}
      <AddToTripModal
        isOpen={Boolean(addToTripRestaurant)}
        item={addToTripRestaurant}
        itemType="restaurant"
        onClose={() => setAddToTripRestaurant(null)}
        onAddToTrip={onAddToTrip}
      />

    </div>
  );
}
