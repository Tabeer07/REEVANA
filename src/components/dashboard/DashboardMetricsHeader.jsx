import React from 'react';
import { User, MapPin, Calendar, Wallet, Bookmark, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { MOCK_USER_PROFILE, MOCK_BUDGET_SUMMARY } from '../../data/dashboardData';

export default function DashboardMetricsHeader({ tripsCount = 3, savedCount = 7 }) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/20">

      {/* Profile Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">

        {/* Avatar & User Details */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img
              src={MOCK_USER_PROFILE.avatar}
              alt={MOCK_USER_PROFILE.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-sky-400 shadow-xl shadow-sky-500/20"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {MOCK_USER_PROFILE.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-extrabold uppercase">
                {MOCK_USER_PROFILE.tier}
              </span>
            </div>

            <p className="text-xs text-slate-400 flex items-center gap-3 flex-wrap">
              <span>{MOCK_USER_PROFILE.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {MOCK_USER_PROFILE.homeCity}
              </span>
              <span>•</span>
              <span className="text-slate-400">Member since {MOCK_USER_PROFILE.memberSince}</span>
            </p>
          </div>
        </div>

        {/* Membership Badge CTA */}
        <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Traveler Passport</span>
        </div>

      </div>

      {/* 4 Stat Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Metric 1: Total Upcoming Trips */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Upcoming Trips</span>
            <Calendar className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            {tripsCount} Active
          </div>
          <p className="text-[11px] text-sky-400 font-medium">Kyoto, Paris, Rome</p>
        </div>

        {/* Metric 2: Total Allocated Budget */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Trip Budget</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-heading">
            ${MOCK_BUDGET_SUMMARY.totalAllocated.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Across all planned trips</p>
        </div>

        {/* Metric 3: Total Spent & Progress */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Spent</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-heading">
            ₹{MOCK_BUDGET_SUMMARY.totalSpent.toLocaleString('en-IN')}
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full"
              style={{ width: `${MOCK_BUDGET_SUMMARY.spendingPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Metric 4: Saved Bookmarks */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Saved Bookmarks</span>
            <Bookmark className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-300 font-heading">
            {savedCount} Saved
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Stays, Dining & Gems</p>
        </div>

      </div>

    </div>
  );
}
