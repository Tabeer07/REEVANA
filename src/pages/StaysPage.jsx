import React, { useState, useMemo } from 'react';
import StayFilterSidebar from '../components/stays/StayFilterSidebar';
import StayCard from '../components/stays/StayCard';
import StayDetailsModal from '../components/stays/StayDetailsModal';
import InteractiveMapView from '../components/map/InteractiveMapView';
import { STAYS_DATA } from '../data/staysData';
import { Hotel, Search, RotateCcw, Filter, Map, MapPin } from 'lucide-react';

export default function StaysPage({ onAddStayToTrip }) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [maxPrice, setMaxPrice] = useState(25000);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [checkInDate, setCheckInDate] = useState('2026-10-10');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-13');
  const [guestsCount, setGuestsCount] = useState(2);

  // UI States
  const [selectedStay, setSelectedStay] = useState(null);
  const [showMapView, setShowMapView] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter & Sort Logic
  const filteredStays = useMemo(() => {
    let result = STAYS_DATA.filter((stay) => {
      // 1. Search Query (Destination / Name)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = stay.name.toLowerCase().includes(q);
        const matchesCity = stay.destinationCity.toLowerCase().includes(q);
        const matchesAddr = stay.address.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesAddr) return false;
      }

      // 2. Type Filter
      if (selectedType !== 'All Types') {
        if (stay.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      }

      // 3. Price Filter (in INR ₹)
      if (stay.pricePerNight && stay.pricePerNight > maxPrice) {
        return false;
      }

      // 4. Rating Filter
      if (minRating > 0) {
        if (stay.rating < minRating) return false;
      }

      // 5. Amenities Filter
      if (selectedAmenities.length > 0) {
        const hasAllSelected = selectedAmenities.every(a => stay.amenities.includes(a));
        if (!hasAllSelected) return false;
      }

      return true;
    });

    // Sort Logic
    return result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return (a.distanceFromAttractionsKm || 1) - (b.distanceFromAttractionsKm || 1);
      if (sortBy === 'price-low') return (a.pricePerNight || 0) - (b.pricePerNight || 0);
      if (sortBy === 'price-high') return (b.pricePerNight || 0) - (a.pricePerNight || 0);
      return 0;
    });
  }, [searchQuery, selectedType, maxPrice, minRating, selectedAmenities, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setMaxPrice(25000);
    setMinRating(0);
    setSelectedAmenities([]);
    setSortBy('rating');
  };

  const handleToggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <Hotel className="w-3.5 h-3.5" />
              <span>Smart Accommodation Finder</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Smart Stay & Hotel Finder
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Discover hotels, luxury resorts, homestays, and hostels evaluated with dynamic Hotel Location Scores and INR (₹) rates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMapView(!showMapView)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                showMapView 
                  ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20' 
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
              <Filter className="w-4 h-4 text-sky-400" />
              <span>Filters ({filteredStays.length})</span>
            </button>
          </div>
        </div>

        {/* Interactive Map View Overlay */}
        {showMapView && (
          <div className="glass-panel p-4 rounded-3xl border border-sky-500/30 space-y-3 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                Stay Finder Map ({filteredStays.length} Stays)
              </h3>
              <span className="text-xs text-slate-400">Click marker to view hotel details</span>
            </div>
            <InteractiveMapView
              selectedDestination="Mussoorie"
              routeSequence={filteredStays.map(s => ({ place: s.name, lat: s.lat || 30.468, lng: s.lng || 78.042 }))}
              height="380px"
            />
          </div>
        )}

        {/* Mobile Filters Drawer Modal */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-heading">Stay Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-slate-400 text-sm font-bold">Done ✕</button>
            </div>
            <StayFilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              selectedAmenities={selectedAmenities}
              onToggleAmenity={handleToggleAmenity}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
              resultsCount={filteredStays.length}
            />
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <StayFilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              selectedAmenities={selectedAmenities}
              onToggleAmenity={handleToggleAmenity}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
              resultsCount={filteredStays.length}
            />
          </div>

          {/* Cards Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Active Filters Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              <span className="font-semibold text-slate-300">Active Filters:</span>

              {selectedType !== 'All Types' && (
                <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold">
                  🏨 {selectedType}
                </span>
              )}

              {maxPrice < 25000 && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  💵 Up to ₹{maxPrice.toLocaleString('en-IN')}/night
                </span>
              )}

              {selectedAmenities.length > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                  ✨ {selectedAmenities.length} Amenities
                </span>
              )}

              {(selectedType !== 'All Types' || maxPrice < 25000 || selectedAmenities.length > 0 || searchQuery) ? (
                <button 
                  onClick={handleResetFilters}
                  className="text-sky-400 underline font-semibold ml-auto hover:text-sky-300"
                >
                  Clear All
                </button>
              ) : (
                <span className="text-slate-500 text-[11px]">Showing all curated accommodations</span>
              )}
            </div>

            {/* Results Grid */}
            {filteredStays.length === 0 ? (
              
              <div className="glass-panel p-12 rounded-3xl text-center space-y-4 border border-slate-800">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8 text-sky-400" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">No stays match your criteria</h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                  Try adjusting your price ceiling or removing some amenity filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Stay Filters
                </button>
              </div>

            ) : (
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStays.map((stay) => (
                  <StayCard 
                    key={stay.id}
                    stay={stay}
                    onViewDetails={(s) => setSelectedStay(s)}
                    onOpenMap={() => setShowMapView(true)}
                    onAddToTrip={(s) => setSelectedStay(s)}
                  />
                ))}
              </div>

            )}

          </div>

        </div>

      </div>

      {/* Stay Details Modal */}
      <StayDetailsModal 
        stay={selectedStay}
        onClose={() => setSelectedStay(null)}
        onAddStayToTrip={onAddStayToTrip}
      />

    </div>
  );
}
