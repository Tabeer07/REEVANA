import React, { useState } from 'react';
import { Bookmark, MapPin, Utensils, Hotel, Star, ExternalLink, Trash2 } from 'lucide-react';
import { MOCK_SAVED_DESTINATIONS, MOCK_SAVED_RESTAURANTS, MOCK_SAVED_HOTELS } from '../../data/dashboardData';

export default function SavedItemsSection() {
  const [activeTab, setActiveTab] = useState('destinations');
  const [destinations, setDestinations] = useState(MOCK_SAVED_DESTINATIONS);
  const [restaurants, setRestaurants] = useState(MOCK_SAVED_RESTAURANTS);
  const [hotels, setHotels] = useState(MOCK_SAVED_HOTELS);

  const tabs = [
    { id: 'destinations', label: 'Destinations', icon: MapPin, count: destinations.length },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils, count: restaurants.length },
    { id: 'hotels', label: 'Hotels & Stays', icon: Hotel, count: hotels.length }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-purple-400" />
            <span>Saved Travel Bookmarks</span>
          </h3>
          <p className="text-xs text-slate-400">Quick access to saved places, dining, and accommodations</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label} ({tab.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Saved Destinations Grid */}
      {activeTab === 'destinations' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 flex items-center gap-4 group transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-purple-400 font-bold uppercase">{item.category}</span>
                  <span className="text-xs text-amber-300 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-heading truncate group-hover:text-purple-300">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">📍 {item.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Saved Restaurants Grid */}
      {activeTab === 'restaurants' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 flex items-center gap-4 group transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-bold">{item.price}</span>
                  <span className="text-xs text-amber-300 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-heading truncate group-hover:text-purple-300">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">{item.cuisine} • {item.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Saved Hotels Grid */}
      {activeTab === 'hotels' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 flex items-center gap-4 group transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-sky-400 font-bold">{item.type}</span>
                  <span className="text-xs text-emerald-400 font-bold">{item.pricePerNight}/night</span>
                </div>
                <h4 className="text-sm font-bold text-white font-heading truncate group-hover:text-purple-300">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">📍 {item.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
