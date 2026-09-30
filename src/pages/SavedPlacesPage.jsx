import React, { useState, useEffect } from 'react';
import { Bookmark, MapPin, Trash2, Plus, Utensils, Hotel, Compass, Star, ExternalLink, Calendar, Search } from 'lucide-react';
import { fetchSavedItems, deleteSavedItem, addSavedItemToTrip } from '../services/savedService';
import { fetchUserTrips } from '../services/tripService';

export default function SavedPlacesPage({ onNavigateExplore, onNavigatePlanner, onOpenPlanner }) {
  const handleOpenPlannerAction = onOpenPlanner || onNavigatePlanner;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedData, setSavedData] = useState({ savedItems: [], counts: { total: 0, places: 0, restaurants: 0, hotels: 0, activities: 0 } });
  const [loading, setLoading] = useState(true);
  
  // Add to Trip Modal State
  const [addToTripItem, setAddToTripItem] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [addStatus, setAddStatus] = useState('');

  useEffect(() => {
    loadSaved();
    loadTrips();
  }, [selectedCategory]);

  const loadSaved = async () => {
    setLoading(true);
    try {
      const data = await fetchSavedItems(selectedCategory);
      setSavedData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const loadTrips = async () => {
    try {
      const data = await fetchUserTrips();
      const trips = data.allTrips || [];
      setUserTrips(trips);
      if (trips.length > 0) setSelectedTripId(trips[0].id);
    } catch (e) {}
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this item from your saved collection?')) {
      try {
        await deleteSavedItem(id);
        loadSaved();
      } catch (err) {
        alert(err.message || 'Failed to remove item.');
      }
    }
  };

  const handleConfirmAddToTrip = async (e) => {
    e.preventDefault();
    if (!selectedTripId || !addToTripItem) return;

    try {
      setAddStatus('Adding to trip...');
      const res = await addSavedItemToTrip(addToTripItem.id, selectedTripId, selectedDay, selectedTime);
      setAddStatus(res.message || 'Item added to trip!');
      setTimeout(() => {
        setAddStatus('');
        setAddToTripItem(null);
      }, 1500);
    } catch (err) {
      setAddStatus(err.message || 'Failed to add item to trip.');
    }
  };

  const categories = [
    { name: 'All', count: savedData.counts.total },
    { name: 'Places', count: savedData.counts.places },
    { name: 'Restaurants', count: savedData.counts.restaurants },
    { name: 'Hotels', count: savedData.counts.hotels },
    { name: 'Activities', count: savedData.counts.activities }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Personal Bookmarks Collection</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Saved Places & Recommendations
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Access your bookmarked tourist spots, restaurants, and hotels. Add saved items directly to any trip itinerary.
            </p>
          </div>

          <button
            onClick={onNavigateExplore}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 self-start md:self-auto"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Explore Destinations</span>
          </button>
        </div>

        {/* Category Filters Pill Bar (PART 11 Spec) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.name
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{cat.name}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-slate-950/40 text-[10px] font-bold">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Items Grid / Empty State (PART 17 Spec) */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-xs font-semibold">
            Loading your saved collection...
          </div>
        ) : savedData.savedItems.length === 0 ? (
          
          <div className="glass-panel p-12 sm:p-16 rounded-3xl text-center space-y-4 border border-slate-800 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400">
              <Bookmark className="w-8 h-8 fill-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">No Saved Places Yet</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Save places you love while exploring destinations and find them here later to build your itinerary.
            </p>
            <button
              onClick={onNavigateExplore}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-extrabold shadow-lg shadow-sky-500/20 inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Destinations</span>
            </button>
          </div>

        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedData.savedItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/40 flex flex-col justify-between group transition-all duration-300 shadow-lg"
              >
                
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <Bookmark className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.category || item.itemType}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-bold truncate">{item.city}</span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold bg-slate-950/90 px-2 py-0.5 rounded-md border border-slate-800 text-[11px]">
                      <Star className="w-3 h-3 fill-amber-400" /> {item.rating}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h4>
                    {item.address && (
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{item.address}</span>
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setAddToTripItem(item)}
                      className="py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 text-amber-300 hover:text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add to Trip</span>
                    </button>

                    <button
                      onClick={onNavigatePlanner}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>Planner</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        )}

      </div>

      {/* Add Saved Item To Trip Modal (PART 12 Spec) */}
      {addToTripItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md glass-panel p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">Add Saved Item to Trip</h3>
              <button onClick={() => setAddToTripItem(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            {addStatus ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">
                {addStatus}
              </div>
            ) : userTrips.length === 0 ? (
              <div className="text-center space-y-3 py-4">
                <p className="text-xs text-slate-300">You don't have any active saved trips yet.</p>
                <button
                  onClick={() => {
                    setAddToTripItem(null);
                    handleOpenPlannerAction && handleOpenPlannerAction();
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs"
                >
                  Create Trip First
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmAddToTrip} className="space-y-4">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white">
                  <strong>{addToTripItem.name}</strong> ({addToTripItem.category})
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-300">Select Trip</label>
                  <select
                    value={selectedTripId}
                    onChange={(e) => setSelectedTripId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    {userTrips.map(t => (
                      <option key={t.id} value={t.id}>{t.destination} ({t.days} Days)</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Day</label>
                    <select
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      {[1, 2, 3, 4, 5].map(d => (
                        <option key={d} value={d}>Day {d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Time Slot</label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20"
                >
                  Confirm Add to Itinerary
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
