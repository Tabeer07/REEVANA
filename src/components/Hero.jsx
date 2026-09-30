import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Compass, ShieldCheck, Wallet, ArrowRight, TrendingUp } from 'lucide-react';

export default function Hero({ onSearchSubmit, onOpenPlanner }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { label: 'All Destinations', icon: Compass },
    { label: 'Hidden Gems', icon: Sparkles },
    { label: 'Cultural', icon: MapPin },
    { label: 'Budget Friendly', icon: Wallet },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery, selectedCategory);
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      
      {/* Background Graphic & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop" 
          alt="REEVANA Hero Background" 
          className="w-full h-full object-cover opacity-25 scale-105 transform animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950"></div>
        <div className="absolute inset-0 gradient-hero-bg"></div>
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-md text-sky-300 text-xs font-semibold tracking-wide animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>Smart Tourism Platform for Modern Travelers</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
        </div>

        {/* Main Headings */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-heading leading-none">
            Explore More. <br />
            <span className="gradient-text-sky">Worry Less.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Your smart travel companion for planning unforgettable trips. 
            Overcome language barriers, budget confusion, overcrowded spots, and unpredictable weather in one seamless app.
          </p>
        </div>

        {/* Large Destination Search Box */}
        <div className="max-w-3xl mx-auto pt-2">
          <form onSubmit={handleSubmit} className="glass-panel p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/60 transition-all focus-within:border-sky-500/50">
            <div className="flex flex-col md:flex-row items-center gap-2">
              
              {/* Input Field */}
              <div className="relative flex-1 w-full flex items-center pl-4">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to go? (e.g. Kyoto, Paris, Bali...)"
                  className="w-full bg-transparent py-3 px-3 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none font-medium"
                />
              </div>

              {/* Category Dropdown Pill */}
              <div className="w-full md:w-auto flex items-center gap-1.5 px-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.label;
                  return (
                    <button
                      type="button"
                      key={cat.label}
                      onClick={() => setSelectedCategory(cat.label)}
                      className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected 
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' 
                          : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={onOpenPlanner}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </form>

          {/* Quick Trending Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Trending:
            </span>
            {['Kyoto, Japan', 'Santorini, Greece', 'Banff, Canada', 'Interlaken'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSearchQuery(city.split(',')[0])}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-sky-300 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlight Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto">
          <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3 text-left border border-slate-800/80">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">AI Itinerary</div>
              <div className="text-[11px] text-slate-400">Auto-tailored plans</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3 text-left border border-slate-800/80">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Budget Guard</div>
              <div className="text-[11px] text-slate-400">Expense tracking</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3 text-left border border-slate-800/80">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Hidden Gems</div>
              <div className="text-[11px] text-slate-400">Low-crowd spots</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3 text-left border border-slate-800/80">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Tourist SOS</div>
              <div className="text-[11px] text-slate-400">Emergency support</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
