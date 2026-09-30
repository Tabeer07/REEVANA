import React from 'react';
import { Hotel, Utensils, Compass, Navigation, Wallet, PiggyBank, Tag, AlertTriangle, Lightbulb } from 'lucide-react';

export default function BudgetSummaryCard({ costBreakdown, estimatedTotalCost = 0, userBudget = 0, tips = [], budgetSummary, budgetStatus }) {
  // Extract values either from direct props or legacy budgetSummary prop
  const accommodation = costBreakdown?.accommodation ?? budgetSummary?.stayCost ?? 0;
  const food = costBreakdown?.food ?? budgetSummary?.foodCost ?? 0;
  const transportation = costBreakdown?.transportation ?? budgetSummary?.transportCost ?? 0;
  const activities = costBreakdown?.activities ?? budgetSummary?.activityCost ?? 0;
  const miscellaneous = costBreakdown?.miscellaneous ?? budgetSummary?.miscCost ?? 0;

  const totalEstCost = estimatedTotalCost || budgetSummary?.totalEstimatedCost || (accommodation + food + transportation + activities + miscellaneous);
  const targetUserBudget = userBudget || budgetSummary?.userBudget || totalEstCost;
  const remainingAmount = targetUserBudget - totalEstCost;
  const isExceeded = totalEstCost > targetUserBudget || budgetStatus === 'Exceeds Budget';

  const validTotal = totalEstCost > 0 ? totalEstCost : 1;

  const items = [
    { label: 'Accommodation', amount: accommodation, icon: Hotel, barColor: 'bg-sky-400', textColor: 'text-sky-400' },
    { label: 'Food', amount: food, icon: Utensils, barColor: 'bg-rose-400', textColor: 'text-rose-400' },
    { label: 'Transportation', amount: transportation, icon: Navigation, barColor: 'bg-emerald-400', textColor: 'text-emerald-400' },
    { label: 'Activities', amount: activities, icon: Compass, barColor: 'bg-amber-400', textColor: 'text-amber-400' },
    { label: 'Miscellaneous', amount: miscellaneous, icon: Tag, barColor: 'bg-purple-400', textColor: 'text-purple-400' },
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Wallet className="w-3.5 h-3.5" />
            <span>Budget Management</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">
            Visual Budget Breakdown
          </h3>
        </div>

        {/* 3 Metric Badges: Estimated Total, User Budget, Remaining */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-slate-800">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Estimated Cost</div>
            <div className="text-base font-extrabold text-emerald-400 font-heading">
              ₹{totalEstCost.toLocaleString('en-IN')} INR
            </div>
          </div>

          <div className="bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-slate-800">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">User's Budget</div>
            <div className="text-base font-extrabold text-sky-400 font-heading">
              ₹{targetUserBudget.toLocaleString('en-IN')} INR
            </div>
          </div>

          <div className={`px-3.5 py-2 rounded-2xl border ${isExceeded ? 'bg-rose-950/40 border-rose-500/30' : 'bg-emerald-950/40 border-emerald-500/30'}`}>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">
              {isExceeded ? 'Exceeded By' : 'Remaining Amount'}
            </div>
            <div className={`text-base font-extrabold font-heading ${isExceeded ? 'text-rose-400' : 'text-emerald-400'}`}>
              ₹{Math.abs(remainingAmount).toLocaleString('en-IN')} INR
            </div>
          </div>
        </div>
      </div>

      {/* OVER-BUDGET ALERT BANNER */}
      {isExceeded && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 space-y-3 animate-fade-in">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>Your planned trip exceeds your budget.</span>
          </div>
          <p className="text-xs text-rose-300/90 leading-relaxed">
            The estimated total trip cost (₹{totalEstCost.toLocaleString('en-IN')}) is higher than your set budget (₹{targetUserBudget.toLocaleString('en-IN')}). Consider review of Gemini suggestions below to reduce expenses.
          </p>
        </div>
      )}

      {/* Grid of Itemized Cost Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {items.map((item) => {
          const IconComp = item.icon;
          const percentage = Math.round((item.amount / validTotal) * 100);
          return (
            <div key={item.label} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold text-slate-300 truncate text-xs">
                  <IconComp className={`w-3.5 h-3.5 ${item.textColor} shrink-0`} /> {item.label}
                </span>
                <span className={`${item.textColor} font-bold text-xs`}>{percentage}%</span>
              </div>
              <div className="text-lg font-extrabold text-white font-heading">
                ₹{item.amount.toLocaleString('en-IN')}
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div style={{ width: `${Math.max(percentage, 4)}%` }} className={`h-full ${item.barColor} rounded-full`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gemini Suggestions for Cost Reduction & Tips */}
      {tips && tips.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-sky-950/30 border border-sky-500/20 text-xs text-sky-200 space-y-3">
          <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Gemini AI Suggestions & Money Saving Tips</span>
          </div>

          <ul className="space-y-1.5 pl-5 list-disc text-slate-300 text-xs">
            {tips.map((tip, idx) => (
              <li key={idx} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

