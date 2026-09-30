import React, { useState } from 'react';
import { Search, MapPin, Navigation, Compass, AlertCircle, Check } from 'lucide-react';
import { DESTINATION_SUGGESTIONS } from '../../data/locationDatabase';

/**
 * Location Search Autocomplete & Geolocation Component (Parts 9 & 10 Spec)
 */
export default function LocationSearchBar({
  selectedDestination = 'Mussoorie, Uttarakhand',
  onSelectLocation,
  placeholder = "Search destination (e.g. Mussoorie, Dehradun, Manali)...",
  className = ""
}) {
  const [query, setQuery] = useState(selectedDestination);
  const [isOpen, setIsOpen] = useState(false);
  const [geoStatus, setGeoStatus] = useState(null); // null, 'loading', 'success', 'denied'
  const [geoErrorMessage, setGeoErrorMessage] = useState('');

  // Filter suggestions
  const filteredSuggestions = DESTINATION_SUGGESTIONS.filter(item => 
    item.fullName.toLowerCase().includes(query.toLowerCase()) ||
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.city.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (destObj) => {
    setQuery(destObj.fullName || destObj.name);
    setIsOpen(false);
    setGeoStatus(null);
    if (onSelectLocation) {
      onSelectLocation(destObj);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('denied');
      setGeoErrorMessage("Location access is unavailable in your browser. Please search manually.");
      return;
    }

    setGeoStatus('loading');
    setGeoErrorMessage('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocationObj = {
          id: 'user-location',
          name: 'Current Location',
          city: 'Your Nearby Area',
          state: '',
          country: 'India',
          fullName: `Current Location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`,
          lat: latitude,
          lng: longitude,
          isUserLocation: true
        };
        setQuery(currentLocationObj.fullName);
        setGeoStatus('success');
        setIsOpen(false);
        if (onSelectLocation) {
          onSelectLocation(currentLocationObj);
        }
      },
      (error) => {
        setGeoStatus('denied');
        setGeoErrorMessage("Location access is unavailable. Please search for your current location manually.");
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className={`relative w-full space-y-2 ${className}`}>
      
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <MapPin className="w-5 h-5 text-sky-400 absolute left-4 pointer-events-none z-10" />
        
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-slate-900/90 border border-slate-800 focus:border-sky-500 rounded-2xl py-3.5 pl-12 pr-28 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner font-medium"
        />

        {/* Use My Location Button */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="absolute right-2 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          title="Use browser GPS location"
        >
          <Navigation className={`w-3.5 h-3.5 ${geoStatus === 'loading' ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Near Me</span>
        </button>
      </div>

      {/* Geolocation Denied / Warning Message */}
      {geoStatus === 'denied' && (
        <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{geoErrorMessage}</span>
        </div>
      )}

      {/* Autocomplete Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-800/80 animate-fade-in max-h-72 overflow-y-auto">
            
            {/* Quick GPS Trigger Item */}
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="w-full p-3.5 text-left bg-gradient-to-r from-sky-950/40 to-slate-900 hover:from-sky-900/60 flex items-center gap-3 transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-sky-300 group-hover:text-white">Use My Current Location</div>
                <div className="text-[10px] text-slate-400">Request browser GPS coordinates</div>
              </div>
            </button>

            {/* Filtered Suggestions */}
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full p-3 text-left hover:bg-slate-800/80 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-sky-400">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-sky-300">
                        {item.fullName}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.popular && (
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-semibold">
                      Popular
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching preset destinations found. Press Enter to use <strong>"{query}"</strong>.
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}
