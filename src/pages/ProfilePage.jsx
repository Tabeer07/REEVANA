import React, { useState } from 'react';
import { User, Mail, Sparkles, Heart, Wallet, Navigation, Utensils, Check, Save, RotateCcw, ShieldCheck } from 'lucide-react';
import { updateProfile } from '../services/authService';

export default function ProfilePage({ user, onProfileUpdated, onUpdateProfile }) {
  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  const [travelStyle, setTravelStyle] = useState(user?.travelStyle || 'Budget');
  const [interests, setInterests] = useState(user?.interests || ['Nature', 'Food']);
  const [defaultBudget, setDefaultBudget] = useState(user?.defaultBudget || 10000);
  const [preferredTransport, setPreferredTransport] = useState(user?.preferredTransport || 'Public Metro / Bus');
  const [foodPref, setFoodPref] = useState(user?.foodPref || 'Vegetarian');

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const allInterests = ['Nature', 'Adventure', 'History', 'Culture', 'Food', 'Shopping', 'Photography', 'Nightlife'];

  const toggleInterest = (interest) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    try {
      const updatedUser = await updateProfile({
        name,
        avatar,
        travelStyle,
        interests,
        defaultBudget,
        preferredTransport,
        foodPref
      });

      setSaving(false);
      setSuccessMessage('Profile and AI travel preferences saved!');

      if (onUpdateProfile) {
        onUpdateProfile(updatedUser);
      } else if (onProfileUpdated) {
        onProfileUpdated(updatedUser);
      }

      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setSaving(false);
      alert(err.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <User className="w-3.5 h-3.5" />
              <span>Personal Traveler Profile</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              User Profile & AI Preferences
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Configure your personal travel preferences. Gemini AI Trip Planner uses these preferences automatically to tailor your itineraries.
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <form onSubmit={handleSave} className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-2xl">
          
          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* User Info Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-800/80">
            <div className="relative group">
              <img 
                src={avatar} 
                alt={name} 
                className="w-24 h-24 rounded-full object-cover border-2 border-sky-400 p-1 bg-slate-900 shadow-xl"
              />
              <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-sky-500 text-slate-950 border border-slate-900">
                <Sparkles className="w-4 h-4 fill-slate-950" />
              </span>
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="space-y-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-2xl font-bold text-white bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500 font-heading"
                />
                <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{user?.email || 'alex.morgan@reevana.com'}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>REEVANA Passport Member</span>
              </div>
            </div>
          </div>

          {/* AI Travel Preferences Section (Part 4 & PART 18 Specs) */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                AI Travel Preferences Sync
              </h3>
              <p className="text-xs text-slate-400">
                These preferences automatically prefill your AI Trip Planner and tailor Gemini itinerary generation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* 1. Travel Style */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400" /> Preferred Travel Style
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-500 font-medium"
                >
                  {['Budget', 'Balanced', 'Luxury', 'Backpacker', 'Family-Friendly'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* 2. Default Budget */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-emerald-400" /> Default Trip Budget (INR ₹)
                </label>
                <input
                  type="number"
                  value={defaultBudget}
                  onChange={(e) => setDefaultBudget(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>

              {/* 3. Preferred Transportation */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-sky-400" /> Preferred Transportation
                </label>
                <select
                  value={preferredTransport}
                  onChange={(e) => setPreferredTransport(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-500 font-medium"
                >
                  {['Public Metro / Bus', 'Private Taxi / Auto', 'Rental Scooter', 'Walking / Pedestrian'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* 4. Food Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-rose-400" /> Food & Dietary Preference
                </label>
                <select
                  value={foodPref}
                  onChange={(e) => setFoodPref(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-500 font-medium"
                >
                  {['Vegetarian', 'Non-vegetarian', 'Vegan', 'Local Street Food', 'Fine Dining'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* 5. Favorite Interests Chips */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <label className="text-xs font-bold text-slate-300 block">
                Favorite Travel Interests:
              </label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map(interest => {
                  const selected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        selected
                          ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '} {interest}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800/80 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold text-xs shadow-lg shadow-sky-500/20 hover:scale-102 transition-all inline-flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving Preferences...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile Preferences</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
