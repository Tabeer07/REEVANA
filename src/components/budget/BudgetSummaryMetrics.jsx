import React from 'react';
import { DollarSign, AlertTriangle, CheckCircle2, TrendingDown, Users, Calendar, Sparkles } from 'lucide-react';

export default function BudgetSummaryMetrics({ budgetData }) {
  if (!budgetData) return null;

  const {
    totalBudget,
    totalEstimatedCost,
    remainingBudget,
    isOverBudget,
    overAmount,
    perDayAvg,
    perPersonCost,
    currencySymbol
  } = budgetData;

  return (
    <div className="space-y-6">
      
      {/* Prominent Over-Budget Alert Banner if Exceeded */}
      {isOverBudget ? (
        <div className="p-5 rounded-3xl bg-rose-950/40 border-2 border-rose-500/80 text-rose-200 space-y-2 shadow-xl animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-white font-heading">
                Budget Deficit Warning
              </h4>
              <p className="text-sm font-bold text-rose-300">
                Your trip is <span className="underline text-white font-extrabold">{currencySymbol}{overAmount.toLocaleString()}</span> over budget.
              </p>
            </div>
          </div>
          <p className="text-xs text-rose-300/80 leading-relaxed pl-13">
            Your estimated costs ({currencySymbol}{totalEstimatedCost.toLocaleString()}) exceed your target budget limit ({currencySymbol}{totalBudget.toLocaleString()}). Check the cheaper alternatives below to bring your trip back under budget.
          </p>
        </div>
      ) : (
        /* Under Budget Success Banner */
        <div className="p-5 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">
                Great Job! Your Trip is Within Budget
              </h4>
              <p className="text-xs text-emerald-300">
                You have <span className="font-bold text-white">{currencySymbol}{remainingBudget.toLocaleString()}</span> in remaining surplus buffer.
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            Optimal Financial Health
          </span>
        </div>
      )}

      {/* 4 Key Visual Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Total Estimated Cost */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-sky-400" /> Total Estimated Cost
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            {currencySymbol}{totalEstimatedCost.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">
            Target Budget: {currencySymbol}{totalBudget.toLocaleString()}
          </div>
        </div>

        {/* 2. Remaining Budget / Deficit */}
        <div className={`glass-panel p-5 rounded-3xl border space-y-2 ${
          isOverBudget ? 'border-rose-500/50 bg-rose-950/10' : 'border-emerald-500/40 bg-emerald-950/10'
        }`}>
          <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-400">
            <TrendingDown className={`w-4 h-4 ${isOverBudget ? 'text-rose-400' : 'text-emerald-400'}`} />
            {isOverBudget ? 'Budget Overspend' : 'Remaining Budget'}
          </div>
          <div className={`text-2xl font-extrabold font-heading ${isOverBudget ? 'text-rose-400' : 'text-emerald-400'}`}>
            {isOverBudget ? `-${currencySymbol}${overAmount.toLocaleString()}` : `+${currencySymbol}${remainingBudget.toLocaleString()}`}
          </div>
          <div className="text-[10px] text-slate-500">
            {isOverBudget ? 'Action Needed Below' : 'Surplus Available'}
          </div>
        </div>

        {/* 3. Per-Day Average */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" /> Per-Day Average
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            {currencySymbol}{perDayAvg.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ day</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Daily combined expense
          </div>
        </div>

        {/* 4. Per-Person Cost */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-400" /> Per-Person Cost
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            {currencySymbol}{perPersonCost.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ person</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Individual share
          </div>
        </div>

      </div>

    </div>
  );
}
