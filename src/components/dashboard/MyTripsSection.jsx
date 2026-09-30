import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Clock, MapPin, Eye, Edit3, Trash2, ArrowRight, Sparkles, Plus, AlertCircle, Loader2 } from 'lucide-react';
import { MOCK_UPCOMING_TRIPS } from '../../data/dashboardData';
import { fetchUserTrips, deleteTrip } from '../../services/tripService';

export default function MyTripsSection({ onOpenPlanner, onViewTrip }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTripModal, setSelectedTripModal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const loadTrips = async () => {
    setLoading(true);
    try {
      const data = await fetchUserTrips();
      if (data && data.allTrips && data.allTrips.length > 0) {
        setTrips(data.allTrips);
      } else {
        // Fallback to mock trips for demonstration if database is empty
        setTrips(MOCK_UPCOMING_TRIPS);
      }
    } catch (err) {
      console.warn('Using fallback mock trips:', err);
      setTrips(MOCK_UPCOMING_TRIPS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to remove this trip itinerary from your dashboard?')) {
      try {
        await deleteTrip(tripId);
        setTrips((prev) => prev.filter((t) => t.id !== tripId));
      } catch (err) {
        // Fallback local deletion
        setTrips((prev) => prev.filter((t) => t.id !== tripId));
      }
    }
  };

  const handleEditTrip = (trip) => {
    onOpenPlanner(trip.destination);
  };

  const filteredTrips = trips.filter(trip => {
    if (activeFilter === 'upcoming') return trip.status === 'upcoming' || trip.status === 'Confirmed' || !trip.status;
    if (activeFilter === 'draft') return trip.status === 'draft' || trip.status === 'Draft';
    if (activeFilter === 'past') return trip.status === 'past' || trip.status === 'Completed';
    return true;
  });

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-400" />
            <span>My Trips & Saved Itineraries</span>
          </h3>
          <p className="text-xs text-slate-400">
            Manage your upcoming vacations, edit schedules, and track budgets
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            {['all', 'upcoming', 'draft', 'past'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1 rounded-xl font-semibold capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenPlanner()}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20 hover:scale-102 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Plan New Trip</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Fetching your saved trip itineraries...</p>
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="py-12 px-4 rounded-3xl bg-slate-900/60 border border-slate-800 border-dashed text-center space-y-4">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">No Trips Found</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              You haven't saved any {activeFilter !== 'all' ? activeFilter : ''} trip itineraries yet. Click below to start planning with AI!
            </p>
          </div>
          <button
            onClick={() => onOpenPlanner()}
            className="px-5 py-2.5 rounded-2xl bg-sky-500 text-slate-950 font-extrabold text-xs inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Plan Your First Trip</span>
          </button>
        </div>
      ) : (
        /* Trips Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTrips.map((trip) => {
            const spendingPercent = Math.min(100, Math.round(((trip.currentSpending || 0) / (trip.budget || 1)) * 100));

            return (
              <div
                key={trip.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between group transition-all shadow-xl"
              >
                
                {/* Card Header Banner */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={trip.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-bold text-sky-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{trip.destination}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold uppercase">
                    {trip.status || 'Upcoming'}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <span className="font-semibold">{trip.dates || 'Flexible Dates'}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-amber-300 text-[11px] font-bold">
                      {trip.days || 3} Days
                    </span>
                  </div>
                </div>

                {/* Body: Budget Metrics & Itinerary Preview */}
                <div className="p-5 space-y-4 flex-1">
                  
                  {/* Budget & Spending Progress */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Trip Budget Tracker</span>
                      <span className="font-extrabold text-white">
                        ₹{(trip.currentSpending || 0).toLocaleString()} / <span className="text-emerald-400">₹{(trip.budget || 0).toLocaleString()}</span>
                      </span>
                    </div>

                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          spendingPercent > 90 ? 'bg-rose-500' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${spendingPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Saved Itinerary Preview */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Saved Itinerary Highlights:
                    </span>
                    <ul className="space-y-1">
                      {(trip.itineraryPreview || [
                        "Day 1: Arrival & Exploration - Mall Road walk, local cafe dining.",
                        "Day 2: Adventure & Sightseeing - Lal Tibba view, Kempty Falls.",
                        "Day 3: Souvenirs & Departure."
                      ]).slice(0, 3).map((day, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-sky-400 font-bold">•</span>
                          <span className="truncate">{day}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Action Buttons Footer (4 Buttons: View, Edit, Delete, Continue) */}
                <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  
                  {/* 1. View Trip */}
                  <button
                    onClick={() => onViewTrip ? onViewTrip(trip) : setSelectedTripModal(trip)}
                    className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>View</span>
                  </button>

                  {/* 2. Edit Trip */}
                  <button
                    onClick={() => handleEditTrip(trip)}
                    className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Edit</span>
                  </button>

                  {/* 3. Delete Trip */}
                  <button
                    onClick={() => handleDeleteTrip(trip.id)}
                    className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/50 border border-slate-800 hover:border-rose-800/50 text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Delete</span>
                  </button>

                  {/* 4. Continue Planning */}
                  <button
                    onClick={() => onOpenPlanner(trip.destination)}
                    className="py-2 px-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500 border border-sky-500/40 text-sky-300 hover:text-slate-950 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* View Details Quick Modal Overlay */}
      {selectedTripModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-sky-400 font-bold uppercase">{selectedTripModal.status || 'Upcoming'} Itinerary</span>
                <h3 className="text-2xl font-bold text-white font-heading">{selectedTripModal.destination}</h3>
                <p className="text-xs text-slate-400">{selectedTripModal.dates} ({selectedTripModal.days || 3} Days)</p>
              </div>
              
              <button
                onClick={() => setSelectedTripModal(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Full Saved Itinerary:</h4>
              <div className="space-y-2">
                {(selectedTripModal.itineraryPreview || []).map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedTripModal(null);
                  onOpenPlanner(selectedTripModal.destination);
                }}
                className="px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Open in AI Trip Planner</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
