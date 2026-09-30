import React from 'react';
import { ShieldAlert, HeartPulse, Flame, PhoneCall, Phone, ArrowUpRight } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../../data/safetyData';

export default function EmergencyContactsCard() {
  const iconMap = {
    ShieldAlert: ShieldAlert,
    HeartPulse: HeartPulse,
    Flame: Flame,
    PhoneCall: PhoneCall
  };

  const styleMap = {
    rose: 'border-rose-500/30 bg-rose-950/20 text-rose-400 hover:border-rose-500/60',
    red: 'border-red-500/30 bg-red-950/20 text-red-400 hover:border-red-500/60',
    amber: 'border-amber-500/30 bg-amber-950/20 text-amber-400 hover:border-amber-500/60',
    sky: 'border-sky-500/30 bg-sky-950/20 text-sky-400 hover:border-sky-500/60'
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">Emergency Hotlines & Speed Dial</h3>
          <p className="text-xs text-slate-400">Tap any hotline to place an instant call</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
          Speed Dial Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EMERGENCY_CONTACTS.map((item) => {
          const IconComponent = iconMap[item.icon] || ShieldAlert;
          const style = styleMap[item.color] || styleMap.rose;

          return (
            <div 
              key={item.id}
              className={`p-5 rounded-2xl border ${style} flex flex-col justify-between space-y-4 group transition-all duration-300 shadow-md`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Alt: {item.globalAlt}</span>
                </div>

                <h4 className="text-base font-bold text-white font-heading">
                  {item.title}
                </h4>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Speed Dial Phone Button */}
              <a
                href={`tel:${item.number}`}
                className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 group-hover:scale-102 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {item.number}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </a>

            </div>
          );
        })}
      </div>

    </div>
  );
}
