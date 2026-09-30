import React from 'react';
import DashboardMetricsHeader from '../components/dashboard/DashboardMetricsHeader';
import MyTripsSection from '../components/dashboard/MyTripsSection';
import SavedItemsSection from '../components/dashboard/SavedItemsSection';
import RecentActivityFeed from '../components/dashboard/RecentActivityFeed';
import { User } from 'lucide-react';

export default function DashboardPage({ onOpenPlanner, onViewTrip }) {
  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <User className="w-3.5 h-3.5" />
              <span>Personal Traveler Command Center</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              User Dashboard
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Track your upcoming trip itineraries, saved bookmarks, spending budgets, and recent travel planning activities.
            </p>
          </div>
        </div>

        {/* 1. User Profile & Metrics Summary Header */}
        <DashboardMetricsHeader />

        {/* 2. My Trips Section */}
        <MyTripsSection onOpenPlanner={onOpenPlanner} onViewTrip={onViewTrip} />

        {/* 3. Saved Items (Destinations, Restaurants, Hotels) */}
        <SavedItemsSection />

        {/* 4. Recent Activity Log */}
        <RecentActivityFeed />

      </div>

    </div>
  );
}
