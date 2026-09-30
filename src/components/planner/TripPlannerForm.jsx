import React, { useState } from 'react';
import { MapPin, Calendar, Users, IndianRupee, Sparkles, Check, Flame } from 'lucide-react';
import LocationSearchBar from '../location/LocationSearchBar';

export default function TripPlannerForm({ onSubmitForm, initialDestination = '', userPreferences = null }) {
  const [destination, setDestination] = useState(initialDestination || userPreferences?.homeCity || 'Mussoorie');
  const [selectedLocationObj, setSelectedLocationObj] = useState(null);
  const [days, setDays] = useState(userPreferences?.defaultDays || 3);
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(todayStr);
  const [travelers, setTravelers] = useState(userPreferences?.defaultTravelers || 2);
  const [travelType, setTravelType] = useState(userPreferences?.defaultTravelType || 'Friends');
  const [budget, setBudget] = useState(userPreferences?.defaultBudget || 10000);
  const [selectedInterests, setSelectedInterests] = useState(userPreferences?.interests || ['Nature', 'Adventure', 'Food']);
  const [pace, setPace] = useState(userPreferences?.pace || 'Balanced');

  const travelTypes = [
    { label: 'Solo', icon: '👤', desc: 'Independent exploration' },
    { label: 'Couple', icon: '👩‍❤️‍👨', desc: 'Romantic & scenic' },
    { label: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'Kid-friendly & relaxed' },
    { label: 'Friends', icon: '👯', desc: 'Social & adventurous' },
  ];

  const interestOptions = [
    { label: 'Nature', icon: '🌲', color: 'emerald' },
    { label: 'Adventure', icon: '🧗‍♂️', color: 'sky' },
    { label: 'History', icon: '🏛️', color: 'amber' },
    { label: 'Culture', icon: '⛩️', color: 'cyan' },
    { label: 'Food', icon: '🍜', color: 'rose' },
    { label: 'Shopping', icon: '🛍️', color: 'purple' },
    { label: 'Photography', icon: '📸', color: 'indigo' },
    { label: 'Nightlife', icon: '🌙', color: 'violet' },
  ];

  const paceOptions = [
    { label: 'Relaxed', desc: '2-3 activities / day • Slow morning pace', color: 'emerald' },
    { label: 'Balanced', desc: '3-4 activities / day • Standard sight-seeing', color: 'sky' },
    { label: 'Fast-paced', desc: '5+ activities / day • Action packed schedule', color: 'amber' },
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm({
      destination: selectedLocationObj?.name || destination,
      fullDestination: selectedLocationObj?.fullName || destination,
      lat: selectedLocationObj?.lat || 30.4598,
      lng: selectedLocationObj?.lng || 78.0644,
      days: Number(days),
      startDate,
      travelers: Number(travelers),
      travelType,
      budget: Number(budget),
      interests: selectedInterests,
      pace
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 shadow-2xl">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            AI Trip Preferences
          </h2>
          <p className="text-xs text-slate-400">
            Customize your trip parameters to generate a personalized Gemini AI itinerary.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
          Step 1 of 2
        </span>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Destination Autocomplete Input (Part 9 & 10 Spec) */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sky-400" /> Destination
          </label>
          <LocationSearchBar
            selectedDestination={destination}
            onSelectLocation={(locObj) => {
              setDestination(locObj.fullName || locObj.name);
              setSelectedLocationObj(locObj);
            }}
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Mussoorie', 'Manali', 'Goa', 'Jaipur', 'Rishikesh', 'Ooty'].map((city) => (
              <button
                type="button"
                key={city}
                onClick={() => setDestination(city)}
                className={`text-[10px] px-2 py-0.5 rounded-md border ${destination === city ? 'bg-sky-500/20 border-sky-500/50 text-sky-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-sky-300'}`}
              >
                + {city}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Number of Days & Travelers */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" /> Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-sky-500 font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" /> Travelers
            </label>
            <input
              type="number"
              min="1"
              max="15"
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-sky-500 font-medium"
              required
            />
          </div>
        </div>

      </div>

      {/* Travel Start Date */}
      <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-sky-400" /> Travel Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500 font-medium"
          required
        />
      </div>

      {/* 3. Travel Type Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Travel Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {travelTypes.map((type) => {
            const isSelected = travelType === type.label;
            return (
              <button
                type="button"
                key={type.label}
                onClick={() => setTravelType(type.label)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected 
                    ? 'bg-sky-500/20 text-white border-sky-500/50 shadow-md font-semibold' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <div className="text-xl mb-1">{type.icon}</div>
                <div className="text-xs font-bold text-white">{type.label}</div>
                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{type.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Total Target Budget (INR) */}
      <div className="space-y-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-emerald-400" /> Total Budget (INR)
          </span>
          <span className="text-emerald-400 text-base font-extrabold">₹{budget.toLocaleString('en-IN')} INR</span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min="2000"
            max="100000"
            step="1000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-32 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white text-right font-bold focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex justify-between text-[10px] text-slate-500">
          <span>₹2,000 (Budget)</span>
          <span>₹25,000 (Standard)</span>
          <span>₹1,00,000+ (Luxury)</span>
        </div>
      </div>

      {/* 5. Interests Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Interests (Select 1 or more)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {interestOptions.map((opt) => {
            const isSelected = selectedInterests.includes(opt.label);
            return (
              <button
                type="button"
                key={opt.label}
                onClick={() => toggleInterest(opt.label)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Travel Pace */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-400" /> Preferred Travel Pace
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {paceOptions.map((p) => {
            const isSelected = pace === p.label;
            return (
              <button
                type="button"
                key={p.label}
                onClick={() => setPace(p.label)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 text-white border-amber-500/50 font-semibold shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">{p.label}</div>
                <div className="text-[10px] text-slate-400 mt-1">{p.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        <span>Generate Personalized Itinerary with Gemini AI</span>
      </button>

    </form>
  );
}

