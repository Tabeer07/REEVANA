import React from 'react';
import SOSInterfaceWidget from '../components/safety/SOSInterfaceWidget';
import EmergencyContactsCard from '../components/safety/EmergencyContactsCard';
import NearbyServicesGrid from '../components/safety/NearbyServicesGrid';
import { SAFETY_ADVISORIES } from '../data/safetyData';
import { ShieldCheck, LifeBuoy, AlertOctagon, Sparkles, BookOpen } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Tourist Emergency & Protection Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Tourist Safety Center
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Accessible 24/7 emergency SOS distress broadcasting, speed-dial hotlines, and real-time medical & police facility lookup.
            </p>
          </div>
        </div>

        {/* 1. SOS Emergency Interface (Top Priority Accessible Widget) */}
        <SOSInterfaceWidget />

        {/* 2. Emergency Contacts Speed Dial (Police, Ambulance, Fire, Tourist Helpline) */}
        <EmergencyContactsCard />

        {/* 3. Nearby Services (Hospitals, Police Koban, Pharmacies) */}
        <NearbyServicesGrid />

        {/* 4. Travel Safety Advisories & Protocols */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white font-heading">
              Essential Tourist Safety Advisories
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAFETY_ADVISORIES.map((adv) => (
              <div 
                key={adv.title}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
              >
                <h4 className="text-sm font-bold text-amber-300 font-heading">
                  {adv.title}
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
