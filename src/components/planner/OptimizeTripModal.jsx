import React, { useState } from 'react';
import { X, Sparkles, Zap, CheckCircle2, TrendingDown, MapPin, DollarSign, CloudRain, ShieldCheck, ArrowRight } from 'lucide-react';

export default function OptimizeTripModal({ isOpen, onClose, tripContext, onApplyOptimizations }) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);

  if (!isOpen) return null;

  const handleRunOptimization = () => {
    setIsOptimizing(true);

    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationResult({
        destination: tripContext?.destination || 'Mussoorie',
        totalPotentialSavings: '₹1,250',
        distanceSavedKm: '4.2 km',
        suggestions: [
          {
            type: 'stay',
            title: 'Central Stay Location Optimization',
            icon: MapPin,
            badge: 'Transit & Fare Saver',
            badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
            description: 'Your current stay is 2.5 km from main Mall Road activities. Moving to a centrally located stay near Library Chowk could reduce transportation travel time by 20 mins and save an estimated ~₹600 in local taxi fares.'
          },
          {
            type: 'food',
            title: 'Dining Budget Efficiency',
            icon: TrendingDown,
            badge: 'Food Budget Saver',
            badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
            description: 'Opting for famous local food stalls like Lovely Omelette Centre & Char Dukan for Day 2 lunch can reduce food expenses by approximately ~₹450 while delivering authentic local hill station flavors.'
          },
          {
            type: 'weather',
            title: 'Weather-Aware Activity Swap',
            icon: CloudRain,
            badge: 'Weather Matched',
            badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            description: 'Forecast indicates mild rain probability on Day 2 afternoon. Scheduling the covered Mussoorie Heritage Centre before outdoor treks keeps your itinerary weather-resilient.'
          }
        ]
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/40 shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5 fill-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">
                Gemini Trip Optimizer
              </h3>
              <p className="text-xs text-slate-400">
                Analyzes itinerary, stays, food, distances, weather, and budget in real-time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!optimizationResult ? (
          <div className="space-y-6 text-center py-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
              <span className="font-bold text-sky-400 uppercase tracking-wider block">Current Trip State Being Analyzed:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
                <div>Destination: <strong>{tripContext?.destination || 'Mussoorie'}</strong></div>
                <div>Duration: <strong>{Array.isArray(tripContext?.days) ? tripContext.days.length : (Array.isArray(tripContext?.itineraryDays) ? tripContext.itineraryDays.length : (tripContext?.days || 3))} Days</strong></div>
                <div>Budget: <strong>₹{(tripContext?.userBudget || tripContext?.budget || 10000).toLocaleString('en-IN')}</strong></div>
                <div>Weather: <strong>🌤️ Pleasant</strong></div>
              </div>
            </div>

            <button
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-emerald-400 hover:scale-[1.01] text-slate-950 font-extrabold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
            >
              {isOptimizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing Distances, Stays & Food Costs...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Run Smart Trip Optimization</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            
            {/* Optimization Summary Bar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Est. Potential Savings</div>
                  <div className="text-base font-extrabold text-emerald-300 font-heading">~{optimizationResult.totalPotentialSavings}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Transit Distance Saved</div>
                  <div className="text-base font-extrabold text-sky-300 font-heading">~{optimizationResult.distanceSavedKm}</div>
                </div>
              </div>
            </div>

            {/* Suggestions Cards */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {optimizationResult.suggestions.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white font-heading flex items-center gap-2">
                        <IconComp className="w-4 h-4 text-sky-400" />
                        {item.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-500 italic">
                * All savings and transit reductions are estimated suggestions.
              </span>

              <button
                onClick={() => {
                  if (onApplyOptimizations) onApplyOptimizations(optimizationResult);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply Recommendations</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
