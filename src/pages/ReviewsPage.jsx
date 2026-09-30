import React, { useState } from 'react';
import { Star, Sparkles, MapPin, Search, Filter, MessageSquare, ThumbsUp, ThumbsDown, ArrowRight, Utensils, Hotel, Compass, Activity } from 'lucide-react';
import { EXPLORE_ATTRACTIONS } from '../data/exploreData';
import { RESTAURANTS_DATA } from '../data/foodData';
import { STAYS_DATA } from '../data/staysData';
import { getMockAISummary, calculateReviewStats } from '../data/reviewsData';
import ReviewModal from '../components/reviews/ReviewModal';

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL' | 'PLACE' | 'RESTAURANT' | 'HOTEL' | 'ACTIVITY'
  const [searchQuery, setSearchQuery] = useState('');
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [selectedItemForReview, setSelectedItemForReview] = useState(null);

  // Combine items across the 4 required types
  // 1. Tourist Places (non-activity attractions)
  const touristPlaces = EXPLORE_ATTRACTIONS.filter(
    a => !['Adventure', 'Nature'].includes(a.category)
  ).map(p => ({
    ...p,
    reviewType: 'PLACE',
    categoryName: 'Tourist Place'
  }));

  // 2. Restaurants
  const restaurants = RESTAURANTS_DATA.map(r => ({
    ...r,
    reviewType: 'RESTAURANT',
    categoryName: 'Restaurant',
    destinationCity: r.address ? r.address.split(',').pop().trim() : 'Kyoto, Japan'
  }));

  // 3. Hotels
  const hotels = STAYS_DATA.map(s => ({
    ...s,
    reviewType: 'HOTEL',
    categoryName: 'Hotel',
  }));

  // 4. Activities (Activity attractions like Moraine Lake Canoeing, Johnston Canyon Cave, Rice Terraces)
  const activities = EXPLORE_ATTRACTIONS.filter(
    a => ['Adventure', 'Nature', 'Food'].includes(a.category)
  ).map(act => ({
    ...act,
    reviewType: 'ACTIVITY',
    categoryName: 'Activity'
  }));

  const allItems = [...touristPlaces, ...restaurants, ...hotels, ...activities];

  // Filter items based on activeCategory, searchQuery, and minRatingFilter
  const filteredItems = allItems.filter(item => {
    if (activeCategory !== 'ALL' && item.reviewType !== activeCategory) {
      return false;
    }
    if (minRatingFilter > 0 && (item.rating || 0) < minRatingFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(q);
      const locMatch = (item.destinationCity || item.location || '').toLowerCase().includes(q);
      const catMatch = (item.categoryName || item.category || '').toLowerCase().includes(q);
      return nameMatch || locMatch || catMatch;
    }
    return true;
  });

  const categoryTabs = [
    { id: 'ALL', label: 'All Reviews', icon: Star },
    { id: 'PLACE', label: 'Tourist Places', icon: Compass },
    { id: 'RESTAURANT', label: 'Restaurants', icon: Utensils },
    { id: 'HOTEL', label: 'Hotels', icon: Hotel },
    { id: 'ACTIVITY', label: 'Activities', icon: Activity }
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-fade-in text-slate-100">
      
      {/* Hero Header */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-sky-950/60 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Smart Review & Sentiment Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight leading-tight">
            Community & AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Review Hub</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Read verified reviews, star distributions, sentiment highlights, and instant AI review summaries across tourist places, dining spots, accommodations, and local activities.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search Filter Controls */}
      <div className="space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Rating Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          
          {/* Search Box */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search places, restaurants, hotels, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 shadow-inner"
            />
          </div>

          {/* Rating Dropdown Filter */}
          <div className="sm:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilter(Number(e.target.value))}
              className="w-full py-3 px-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
            >
              <option value={0}>All Star Ratings</option>
              <option value={4.8}>4.8★ and above</option>
              <option value={4.5}>4.5★ and above</option>
              <option value={4.0}>4.0★ and above</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid of Reviewed Items */}
      {filteredItems.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <p className="text-slate-400 text-sm">No reviewable items found matching your filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('ALL');
              setMinRatingFilter(0);
            }}
            className="text-xs font-bold text-sky-400 hover:underline"
          >
            Clear all search filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const aiSummary = getMockAISummary(item.id, item.name, item.categoryName);
            const stats = calculateReviewStats([], item.rating || 4.8, item.reviewsCount || 100);

            return (
              <div
                key={`${item.reviewType}-${item.id}`}
                className="group p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  
                  {/* Card Thumbnail Image Header */}
                  <div className="relative h-44 rounded-2xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-sky-400 text-[10px] font-extrabold uppercase tracking-wider">
                      {item.categoryName}
                    </span>

                    {/* Rating Pill */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/90 border border-amber-500/40 text-amber-300 text-xs font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating || 4.8}</span>
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h3 className="text-base font-bold text-white font-heading group-hover:text-sky-300 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{item.destinationCity || item.location}</span>
                    </p>
                  </div>

                  {/* Mock AI Summary Snippet Box */}
                  <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-sky-400 text-[10px] font-bold uppercase">
                      <Sparkles className="w-3 h-3" /> AI Summary Highlight
                    </div>
                    <p className="text-slate-300 text-[11px] italic leading-snug line-clamp-2">
                      "{aiSummary}"
                    </p>
                  </div>

                  {/* Top Mentioned Tags preview */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {stats.topPositives.slice(0, 2).map((pos, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/20">
                        👍 {pos.name}
                      </span>
                    ))}
                    {stats.topNegatives.slice(0, 1).map((neg, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-500/20">
                        👎 {neg.name}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => setSelectedItemForReview(item)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-sky-500 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>View Breakdown & Reviews ({item.reviewsCount || 120})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal Dialog */}
      <ReviewModal
        item={selectedItemForReview}
        isOpen={Boolean(selectedItemForReview)}
        onClose={() => setSelectedItemForReview(null)}
      />

    </div>
  );
}
