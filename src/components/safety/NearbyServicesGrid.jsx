import React, { useState } from 'react';
import { Hospital, ShieldCheck, Pill, MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { NEARBY_SERVICES } from '../../data/safetyData';

export default function NearbyServicesGrid() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Hospital', 'Police Station', 'Pharmacy'];

  const filteredServices = activeTab === 'All'
    ? NEARBY_SERVICES
    : NEARBY_SERVICES.filter(s => s.category === activeTab);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Hospital':
        return Hospital;
      case 'Police Station':
        return ShieldCheck;
      case 'Pharmacy':
        return Pill;
      default:
        return MapPin;
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">Nearby Safety & Medical Services</h3>
          <p className="text-xs text-slate-400">Emergency ERs, Police Koban boxes, and 24/7 Pharmacies</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === cat
                  ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Services' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => {
          const IconComponent = getCategoryIcon(service.category);

          return (
            <div
              key={service.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 space-y-3 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-rose-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-300">{service.category}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {service.status}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white font-heading group-hover:text-rose-300 transition-colors">
                  {service.name}
                </h4>

                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{service.address}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-sky-400">
                    <Navigation className="w-3.5 h-3.5" /> {service.distanceKm} km away
                  </span>
                  {service.englishStaff && (
                    <span className="text-[10px] text-amber-300 font-bold">English Staff Available</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${service.phone}`}
                    className="flex-1 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold hover:text-white flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${service.lat},${service.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-rose-500 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
