import React from 'react';
import { Hotel, Utensils, Navigation, Compass, ShoppingBag, ShieldAlert } from 'lucide-react';

export default function CategoryBreakdownCards({ categories = [], currencySymbol = '$' }) {
  const iconMap = {
    'Accommodation': Hotel,
    'Food & Dining': Utensils,
    'Transportation': Navigation,
    'Activities': Compass,
    'Shopping': ShoppingBag,
    'Emergency / Misc': ShieldAlert
  };

  const colorStyles = {
    sky: { bg: 'bg-sky-500', text: 'text-sky-400', border: 'border-sky-500/20' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500/20' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/20' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/20' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">Itemized Expense Allocation</h3>
          <p className="text-xs text-slate-400">Divided into 6 travel cost categories</p>
        </div>

        <span className="text-xs text-slate-400 font-medium">6 Categories</span>
      </div>

      {/* Grid of 6 Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const IconComponent = iconMap[cat.name] || Hotel;
          const style = colorStyles[cat.color] || colorStyles.sky;

          return (
            <div 
              key={cat.name} 
              className={`p-5 rounded-2xl bg-slate-900/80 border ${style.border} space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl bg-slate-950 border border-slate-800 ${style.text}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white truncate">{cat.name}</span>
                </div>
                <span className={`text-xs font-bold ${style.text}`}>{cat.percentage}%</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-extrabold text-white font-heading">
                    {currencySymbol}{cat.amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Allocated Share</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div 
                    style={{ width: `${cat.percentage}%` }} 
                    className={`h-full ${style.bg} rounded-full transition-all duration-500`}
                  ></div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
