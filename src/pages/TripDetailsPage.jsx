import React from 'react';
import { Calendar, MapPin, DollarSign, Clock, Users, Sparkles, ArrowLeft, Trash2, Edit3, CheckCircle2, ShieldCheck, Sun, Compass } from 'lucide-react';

export default function TripDetailsPage({ trip, onBack, onEditTrip, onDeleteTrip }) {
  if (!trip) {
    return (
      <div className="pt-32 pb-20 min-h-screen max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl font-bold text-white">No Trip Details Selected</h2>
        <p className="text-slate-400 text-sm">Please return to your dashboard or My Trips section to select a valid itinerary.</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-2xl bg-sky-500 text-slate-950 font-bold text-sm"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const spendingPercent = Math.min(100, Math.round((trip.currentSpending / (trip.budget || 1)) * 100));

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-8 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation & Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Trips</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEditTrip && onEditTrip(trip)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 text-amber-300 hover:text-slate-950 text-xs font-extrabold transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Itinerary</span>
            </button>

            {onDeleteTrip && (
              <button
                onClick={() => onDeleteTrip(trip.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-500/20 hover:bg-rose-500 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-extrabold transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Trip</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Section Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="h-64 sm:h-80 relative">
            <img
              src={trip.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"}
              alt={trip.destination}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-500/30 border border-sky-400/40 text-sky-300 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
                  {trip.status || 'Upcoming'} Trip
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold backdrop-blur-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved Itinerary
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
                {trip.destination}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>{trip.dates || 'Flexible Dates'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{trip.days || 3} Days Duration</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>{trip.travelers || 2} Travelers ({trip.travelType || 'Couple'})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Tracker & Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl md:col-span-2">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>INR Travel Budget Tracker</span>
            </h3>
            
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Est. Total Budget</span>
                <span className="text-2xl font-extrabold text-emerald-400">₹{(trip.budget || 0).toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Current Spending</span>
                <span className="text-lg font-bold text-slate-200">₹{(trip.currentSpending || 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    spendingPercent > 90 ? 'bg-rose-500' : 'bg-gradient-to-r from-sky-400 to-emerald-400'
                  }`}
                  style={{ width: `${spendingPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>{spendingPercent}% Budget Allocated</span>
                <span>₹{((trip.budget || 0) - (trip.currentSpending || 0)).toLocaleString()} Remaining</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Travel Assistant</span>
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Need to optimize weather plans or update food recommendations for {trip.destination}?
              </p>
            </div>

            <button
              onClick={() => onEditTrip && onEditTrip(trip)}
              className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 hover:scale-102 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Modify in Trip Planner</span>
            </button>
          </div>

        </div>

        {/* Saved Itinerary Timeline */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              <span>Detailed Day-by-Day Itinerary</span>
            </h3>
            <p className="text-xs text-slate-400">
              Curated itinerary details with timed activities and attraction highlights
            </p>
          </div>

          <div className="space-y-6">
            {(trip.itineraryPreview || [
              "Day 1: Arrival & Exploration - Mall Road walk, local cafe dining, scenic view points.",
              "Day 2: Adventure & Sightseeing - Lal Tibba view, Kempty Falls, local market shopping.",
              "Day 3: Relaxation & Departure - Company Garden walk, souvenirs, travel home."
            ]).map((item, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-sky-500/40 space-y-2 group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-slate-950 group-hover:scale-125 transition-transform"></div>
                
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                      Day {idx + 1} Plan
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-950 text-[10px] text-slate-400 border border-slate-800">
                      Scheduled
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
