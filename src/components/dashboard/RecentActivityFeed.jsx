import React from 'react';
import { Clock, Hotel, Calendar, Wallet, ShieldCheck, CheckCircle } from 'lucide-react';
import { MOCK_RECENT_ACTIVITIES } from '../../data/dashboardData';

export default function RecentActivityFeed() {
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Hotel':
        return Hotel;
      case 'Calendar':
        return Calendar;
      case 'Wallet':
        return Wallet;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-400" />
          <h3 className="text-xl font-bold text-white font-heading">
            Recent Activities & Logs
          </h3>
        </div>
        <span className="text-xs text-slate-400">Live Activity Feed</span>
      </div>

      <div className="space-y-4">
        {MOCK_RECENT_ACTIVITIES.map((act) => {
          const IconComp = getIconComponent(act.icon);

          return (
            <div
              key={act.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition-all"
            >
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sky-400 shrink-0">
                <IconComp className="w-4 h-4" />
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-heading">{act.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{act.time}</span>
                </div>
                <p className="text-xs text-slate-300">{act.description}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
