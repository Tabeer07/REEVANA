import React from 'react';
import { DollarSign, Calendar, Users, MapPin, Hotel, Utensils, Navigation, Compass, Sparkles, RefreshCw } from 'lucide-react';
import { RATES } from '../../utils/budgetCalculator';

export default function BudgetPlannerForm({
  totalBudget,
  setTotalBudget,
  days,
  setDays,
  travelers,
  setTravelers,
  destination,
  setDestination,
  currencySymbol,
  setCurrencySymbol,
  accommodationPref,
  setAccommodationPref,
  foodPref,
  setFoodPref,
  transportPref,
  setTransportPref,
  activitiesPref,
  setActivitiesPref,
}) {
  const currencies = [
    { symbol: '$', code: 'USD', name: 'US Dollar ($)' },
    { symbol: '₹', code: 'INR', name: 'Indian Rupee (₹)' },
    { symbol: '€', code: 'EUR', name: 'Euro (€)' },
    { symbol: '£', code: 'GBP', name: 'British Pound (£)' },
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">Trip Budget Inputs</h3>
            <p className="text-xs text-slate-400">Customize spending tiers & preference choices</p>
          </div>
        </div>

        {/* Currency Switcher */}
        <select
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
        >
          {currencies.map(c => (
            <option key={c.code} value={c.symbol}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Row 1: Target Budget, Days, Travelers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Budget */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Total Budget Target
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm font-bold text-emerald-400">{currencySymbol}</span>
            <input
              type="number"
              min="100"
              max="50000"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 pl-8 pr-3 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Days */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" /> Trip Days
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-3 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Travelers */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-sky-400" /> Travelers
          </label>
          <input
            type="number"
            min="1"
            max="12"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-3 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
          />
        </div>

      </div>

      {/* Destination Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-sky-400" /> Destination City
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g. Kyoto, Japan"
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-3.5 text-xs text-white font-medium focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Preferences Section */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        
        {/* 1. Accommodation Preference */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1"><Hotel className="w-3.5 h-3.5 text-sky-400" /> Accommodation Preference</span>
            <span className="text-[11px] text-sky-400 font-bold">{accommodationPref}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.keys(RATES.accommodation).map((acc) => (
              <button
                key={acc}
                type="button"
                onClick={() => setAccommodationPref(acc)}
                className={`py-2 px-3 rounded-xl border text-xs text-left font-medium transition-all ${
                  accommodationPref === acc
                    ? 'bg-sky-500/20 border-sky-500/50 text-white font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {acc}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Food Preference */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1"><Utensils className="w-3.5 h-3.5 text-rose-400" /> Food & Dining Preference</span>
            <span className="text-[11px] text-rose-400 font-bold">{foodPref}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.keys(RATES.food).map((fd) => (
              <button
                key={fd}
                type="button"
                onClick={() => setFoodPref(fd)}
                className={`py-2 px-3 rounded-xl border text-xs text-left font-medium transition-all ${
                  foodPref === fd
                    ? 'bg-rose-500/20 border-rose-500/50 text-white font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {fd}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Transportation Preference */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1"><Navigation className="w-3.5 h-3.5 text-emerald-400" /> Transportation Preference</span>
            <span className="text-[11px] text-emerald-400 font-bold">{transportPref}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.keys(RATES.transportation).map((tr) => (
              <button
                key={tr}
                type="button"
                onClick={() => setTransportPref(tr)}
                className={`py-2 px-3 rounded-xl border text-xs text-left font-medium transition-all ${
                  transportPref === tr
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-white font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Activities Preference */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-amber-400" /> Activities & Tours</span>
            <span className="text-[11px] text-amber-400 font-bold">{activitiesPref}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.keys(RATES.activities).map((act) => (
              <button
                key={act}
                type="button"
                onClick={() => setActivitiesPref(act)}
                className={`py-2 px-3 rounded-xl border text-xs text-left font-medium transition-all ${
                  activitiesPref === act
                    ? 'bg-amber-500/20 border-amber-500/50 text-white font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
