import React, { useState, useMemo } from 'react';
import BudgetPlannerForm from '../components/budget/BudgetPlannerForm';
import BudgetSummaryMetrics from '../components/budget/BudgetSummaryMetrics';
import CategoryBreakdownCards from '../components/budget/CategoryBreakdownCards';
import CheaperAlternativesCard from '../components/budget/CheaperAlternativesCard';
import { calculateBudget } from '../utils/budgetCalculator';
import { Wallet, Sparkles, RefreshCw } from 'lucide-react';

export default function BudgetPage({ onOpenPlanner }) {
  const [totalBudget, setTotalBudget] = useState(15000);
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [destination, setDestination] = useState('Mussoorie, Uttarakhand');
  const [currencySymbol, setCurrencySymbol] = useState('₹');

  // Preferences
  const [accommodationPref, setAccommodationPref] = useState('Mid-range Hotel');
  const [foodPref, setFoodPref] = useState('Casual Dining & Cafes');
  const [transportPref, setTransportPref] = useState('Public Metro / Bus');
  const [activitiesPref, setActivitiesPref] = useState('Standard Museums & Passes');

  // Calculate dynamic budget data on every change
  const budgetData = useMemo(() => {
    return calculateBudget({
      totalBudget,
      days,
      travelers,
      currencySymbol,
      accommodationPref,
      foodPref,
      transportPref,
      activitiesPref,
    });
  }, [totalBudget, days, travelers, currencySymbol, accommodationPref, foodPref, transportPref, activitiesPref]);

  const handleApplyAlternative = (type, targetVal) => {
    if (type === 'accommodation') setAccommodationPref(targetVal);
    if (type === 'food') setFoodPref(targetVal);
    if (type === 'transportation') setTransportPref(targetVal);
    if (type === 'activities') setActivitiesPref(targetVal);
  };

  const handleReset = () => {
    setTotalBudget(15000);
    setDays(3);
    setTravelers(2);
    setDestination('Mussoorie, Uttarakhand');
    setAccommodationPref('Mid-range Hotel');
    setFoodPref('Casual Dining & Cafes');
    setTransportPref('Public Metro / Bus');
    setActivitiesPref('Standard Museums & Passes');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Wallet className="w-3.5 h-3.5" />
              <span>Smart Travel Expense Engine</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Smart Budget Planner
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Calculate total trip costs across 6 itemized categories, monitor overspend warnings, and discover cheaper alternative options in real-time.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Budget Inputs</span>
          </button>
        </div>

        {/* Top 4 Metrics & Deficit Warning Alert */}
        <BudgetSummaryMetrics 
          budgetData={budgetData}
        />

        {/* 6 Category Breakdown Progress Cards */}
        <CategoryBreakdownCards 
          categories={budgetData.categories}
          currencySymbol={currencySymbol}
        />

        {/* Cheaper Alternatives Section */}
        <CheaperAlternativesCard 
          cheaperAlternatives={budgetData.cheaperAlternatives}
          currencySymbol={currencySymbol}
          onApplyAlternative={handleApplyAlternative}
        />

        {/* Budget Form Inputs */}
        <BudgetPlannerForm 
          totalBudget={totalBudget}
          setTotalBudget={setTotalBudget}
          days={days}
          setDays={setDays}
          travelers={travelers}
          setTravelers={setTravelers}
          destination={destination}
          setDestination={setDestination}
          currencySymbol={currencySymbol}
          setCurrencySymbol={setCurrencySymbol}
          accommodationPref={accommodationPref}
          setAccommodationPref={setAccommodationPref}
          foodPref={foodPref}
          setFoodPref={setFoodPref}
          transportPref={transportPref}
          setTransportPref={setTransportPref}
          activitiesPref={activitiesPref}
          setActivitiesPref={setActivitiesPref}
        />

        {/* Action CTA: Generate AI Itinerary using calculated budget */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white font-heading flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Turn This ₹{totalBudget.toLocaleString('en-IN')} Budget Into A Complete Itinerary</span>
            </h4>
            <p className="text-xs text-slate-300">
              Let REEVANA AI automatically map out day-by-day activities, stays, and dining matched to your target budget.
            </p>
          </div>

          <button
            onClick={() => onOpenPlanner && onOpenPlanner(destination)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-sky-500/25 hover:scale-105 transition-all whitespace-nowrap shrink-0"
          >
            Launch AI Trip Planner
          </button>
        </div>

      </div>

    </div>
  );
}
