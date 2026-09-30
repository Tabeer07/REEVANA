import React, { useState } from 'react';
import { Star, Sparkles, ThumbsUp, ThumbsDown, MessageSquarePlus, Filter, Calendar, User, Check, X, ShieldCheck } from 'lucide-react';
import { getMockAISummary, calculateReviewStats } from '../../data/reviewsData';

export default function ReviewSection({
  targetId,
  targetName,
  targetType = 'place', // 'place' | 'restaurant' | 'hotel' | 'activity'
  category = 'Tourist place',
  initialReviews = [],
  baseRating = 4.8,
  baseCount = 120
}) {
  // Local state for reviews list and active filters
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedStarFilter, setSelectedStarFilter] = useState('ALL');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New Review Form State
  const [newUserName, setNewUserName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newWrittenReview, setNewWrittenReview] = useState('');
  const [selectedPositives, setSelectedPositives] = useState([]);
  const [selectedNegatives, setSelectedNegatives] = useState([]);
  const [formSubmittedSuccess, setFormSubmittedSuccess] = useState(false);

  // Available sample positive & negative tags for selection
  const POSITIVE_OPTIONS = ['Location & Scenery', 'Atmosphere', 'Friendly Staff', 'Cleanliness', 'Authentic Food', 'Great Value', 'Easy Access'];
  const NEGATIVE_OPTIONS = ['Parking Availability', 'Peak Hour Crowds', 'Steep Stairs', 'High Price', 'Long Waiting Time', 'Noisy Environment'];

  // Calculate current statistics dynamically from state
  const stats = calculateReviewStats(reviews, baseRating, baseCount);
  const aiSummary = getMockAISummary(targetId, targetName, category);

  // Filter reviews by selected star rating
  const filteredReviews = reviews.filter(r => {
    if (selectedStarFilter === 'ALL') return true;
    return Math.round(r.rating) === Number(selectedStarFilter);
  });

  // Handle adding a new user review
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newWrittenReview.trim()) {
      alert('Please enter your name and write a review before submitting.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const createdReview = {
      id: `rev-user-${Date.now()}`,
      targetId,
      targetType,
      targetName,
      category,
      rating: newRating,
      userName: newUserName.trim(),
      userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newUserName)}`,
      date: today,
      writtenReview: newWrittenReview.trim(),
      positives: selectedPositives,
      negatives: selectedNegatives
    };

    setReviews([createdReview, ...reviews]);
    setFormSubmittedSuccess(true);

    // Reset Form after brief timeout
    setTimeout(() => {
      setFormSubmittedSuccess(false);
      setIsWriteModalOpen(false);
      setNewUserName('');
      setNewRating(5);
      setNewWrittenReview('');
      setSelectedPositives([]);
      setSelectedNegatives([]);
    }, 1200);
  };

  const togglePositiveTag = (tag) => {
    if (selectedPositives.includes(tag)) {
      setSelectedPositives(selectedPositives.filter(t => t !== tag));
    } else {
      setSelectedPositives([...selectedPositives, tag]);
    }
  };

  const toggleNegativeTag = (tag) => {
    if (selectedNegatives.includes(tag)) {
      setSelectedNegatives(selectedNegatives.filter(t => t !== tag));
    } else {
      setSelectedNegatives([...selectedNegatives, tag]);
    }
  };

  return (
    <div className="space-y-8 text-slate-100">
      
      {/* 1. Header & AI Summary Banner */}
      <div className="space-y-6">
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          
          {/* Rating Big Badge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-800 text-center space-y-2">
            <div className="text-5xl font-black text-white font-heading flex items-baseline justify-center gap-1">
              <span>{stats.averageRating}</span>
              <span className="text-sm font-semibold text-slate-400">/ 5</span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(stats.averageRating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Based on <strong className="text-slate-200">{stats.totalReviews.toLocaleString()}</strong> verified reviews
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="mt-3 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02]"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Rating Distribution Progress Bars */}
          <div className="md:col-span-8 space-y-2 flex flex-col justify-center">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 font-heading">
              Rating Distribution
            </h4>
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = stats.distributionPercentages[star] || 0;
              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <div className="w-12 text-slate-400 font-semibold flex items-center gap-1 shrink-0">
                    <span>{star}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
                  </div>
                  <div className="flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-slate-400 font-mono text-[11px]">
                    {pct}%
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Mock AI Review Summary Box */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/30 shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Sparkles className="w-24 h-24 text-sky-400" />
          </div>
          
          <div className="flex items-start gap-3 relative z-10">
            <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-heading">
                  AI Review Insight Summary
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-semibold">
                  Mock AI Analysis
                </span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed italic">
                "{aiSummary}"
              </p>
            </div>
          </div>
        </div>

        {/* Most Mentioned Positives & Negatives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Positives */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-heading flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-emerald-400" /> Most Mentioned Positives
            </h5>
            <div className="flex flex-wrap gap-2">
              {stats.topPositives.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
                >
                  <span>{item.name}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-200 text-[10px] font-bold">
                    +{item.count}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Negatives */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/20 space-y-3">
            <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider font-heading flex items-center gap-1.5">
              <ThumbsDown className="w-4 h-4 text-rose-400" /> Most Mentioned Negatives
            </h5>
            <div className="flex flex-wrap gap-2">
              {stats.topNegatives.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-medium"
                >
                  <span>{item.name}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-200 text-[10px] font-bold">
                    {item.count}
                  </span>
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 2. Written Reviews Section & Star Filter */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
            <Filter className="w-4 h-4 text-sky-400" /> Verified Guest Reviews ({filteredReviews.length})
          </h4>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['ALL', '5', '4', '3', '2', '1'].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedStarFilter(star)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedStarFilter === star
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {star === 'ALL' ? 'All Reviews' : `${star} ★`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Cards List */}
        {filteredReviews.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <p className="text-slate-400 text-sm">No reviews found matching the selected star filter.</p>
            <button
              onClick={() => setSelectedStarFilter('ALL')}
              className="text-xs font-bold text-sky-400 hover:underline"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                {/* User Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(rev.userName)}`}
                      alt={rev.userName}
                      className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white">{rev.userName}</span>
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <ShieldCheck className="w-3 h-3" /> Verified Visitor
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>

                {/* Written Review Content */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  "{rev.writtenReview}"
                </p>

                {/* Selected Positive / Negative Tags */}
                {((rev.positives && rev.positives.length > 0) || (rev.negatives && rev.negatives.length > 0)) && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.positives?.map((pos, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950/50 text-emerald-300 border border-emerald-500/20">
                        👍 {pos}
                      </span>
                    ))}
                    {rev.negatives?.map((neg, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-rose-950/50 text-rose-300 border border-rose-500/20">
                        👎 {neg}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

      {/* 3. Write a Review Modal / Form Overlay */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <MessageSquarePlus className="w-5 h-5 text-sky-400" /> Write a Review
                </h3>
                <p className="text-xs text-slate-400">
                  Sharing feedback for <span className="text-sky-300 font-semibold">{targetName}</span>
                </p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formSubmittedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Review Submitted Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for contributing! Your rating and feedback have updated the review system.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-5">
                
                {/* User Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Rating Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Overall Rating (1 - 5 Stars)
                  </label>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-300 ml-2">
                      {newRating} / 5
                    </span>
                  </div>
                </div>

                {/* Written Review */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Written Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your experience, scenery, service, accessibility, or any tips for future visitors..."
                    value={newWrittenReview}
                    onChange={(e) => setNewWrittenReview(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 leading-relaxed"
                  />
                </div>

                {/* Positives Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" /> What did you love? (Optional)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {POSITIVE_OPTIONS.map((tag) => {
                      const isSel = selectedPositives.includes(tag);
                      return (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => togglePositiveTag(tag)}
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                            isSel
                              ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Negatives Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                    <ThumbsDown className="w-3.5 h-3.5" /> Any complaints? (Optional)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {NEGATIVE_OPTIONS.map((tag) => {
                      const isSel = selectedNegatives.includes(tag);
                      return (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => toggleNegativeTag(tag)}
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                            isSel
                              ? 'bg-rose-500 text-white font-bold border-rose-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition-all"
                >
                  Submit My Review
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
