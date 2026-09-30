import React, { useState, useMemo } from 'react';
import { Navigation, Bus, Car, Footprints, Train, Star, Clock, ArrowRight, Sparkles, MapPin, Check } from 'lucide-react';
import { calculateRouteOptions } from '../../services/transportService';

export default function TransportAssistantWidget({ defaultOrigin = 'Mussoorie Mall Road', defaultDestination = 'George Everest' }) {
  const [origin, setOrigin] = useState(defaultOrigin);
  const [destination, setDestination] = useState(defaultDestination);
  const [activeModeId, setActiveModeId] = useState('taxi');
  const [navSuccess, setNavSuccess] = useState(false);

  const routeData = useMemo(() => {
    return calculateRouteOptions(origin, destination);
  }, [origin, destination]);

  const modeIconMap = {
    'Taxi / Private Cab': Car,
    'Public Bus / Shared Auto': Bus,
    'Rental Scooter / Car': Car,
    'Scenic Nature Hike': Footprints,
  };

  const getTagColorStyle = (color) => {
    switch (color) {
      case 'sky':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'blue':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'amber':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'purple':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'emerald':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleStartNav = () => {
    setNavSuccess(true);
    setTimeout(() => {
      setNavSuccess(false);
    }, 4000);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Transportation Assistant
            </h3>
            <p className="text-xs text-slate-400">
              Route transit options & side-by-side cost comparison (Approximate costs)
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold self-start sm:self-auto">
          ⚡ Multi-Modal Routing
        </span>
      </div>

      {/* Origin & Destination Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="space-y-1">
          <label className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" /> Departure Origin
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-400" /> Destination
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Transit Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routeData.options.map((opt) => {
          const ModeIcon = modeIconMap[opt.mode] || Navigation;
          const isSelected = activeModeId === opt.id;
          const tagStyle = getTagColorStyle(opt.tagColor || 'amber');

          return (
            <div
              key={opt.id}
              onClick={() => setActiveModeId(opt.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400">
                      <ModeIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white">{opt.mode}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${tagStyle}`}>
                    {opt.tag}
                  </span>
                </div>

                {/* Metrics */}
                <div className="flex items-baseline justify-between pt-2">
                  <div className="text-xl font-extrabold text-emerald-400 font-heading">
                    {opt.costFormatted}
                  </div>

                  <div className="flex items-center gap-1 text-amber-300 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{opt.time}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed pt-1">
                  {opt.details}
                </p>
              </div>

              {/* Convenience Rating */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] text-slate-400 font-medium">Convenience Score</span>
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {opt.convenienceRating} / 5.0
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Summary Table */}
      <div className="space-y-3 pt-2 border-t border-slate-800/80">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Side-by-Side Transit Comparison Matrix
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Transit Mode</th>
                <th className="py-2.5 px-3">Est. Time</th>
                <th className="py-2.5 px-3">Est. Cost</th>
                <th className="py-2.5 px-3">Convenience</th>
                <th className="py-2.5 px-3">Best Suited For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {routeData.options.map((opt) => (
                <tr 
                  key={opt.id} 
                  className={`hover:bg-slate-900/60 transition-colors ${
                    activeModeId === opt.id ? 'bg-indigo-950/20 text-white font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold text-white flex items-center gap-1.5">
                    {opt.mode}
                  </td>
                  <td className="py-2.5 px-3 text-amber-300 font-bold">{opt.time}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">{opt.costFormatted}</td>
                  <td className="py-2.5 px-3">★ {opt.convenienceRating}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTagColorStyle(opt.tagColor || 'amber')}`}>
                      {opt.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Simulation Button */}
      {navSuccess ? (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" /> Navigation instructions sent to your smartphone!
        </div>
      ) : (
        <button
          onClick={handleStartNav}
          className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          <span>Launch GPS Navigation for {routeData.options.find(o => o.id === activeModeId)?.mode}</span>
        </button>
      )}

    </div>
  );
}

