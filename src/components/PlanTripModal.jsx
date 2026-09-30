import React, { useState } from 'react';
import { X, Sparkles, Calendar, DollarSign, MapPin, CheckCircle2, Clock, ShieldCheck, Utensils, Hotel, ArrowRight } from 'lucide-react';

export default function PlanTripModal({ isOpen, onClose, initialDestination = '' }) {
  const [destination, setDestination] = useState(initialDestination || 'Kyoto, Japan');
  const [days, setDays] = useState(3);
  const [vibe, setVibe] = useState('Cultural');
  const [dailyBudget, setDailyBudget] = useState(100);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedItinerary({
        destination,
        days,
        vibe,
        totalBudget: days * dailyBudget,
        safetyRating: '98% Safe (Low Advisory)',
        weatherForecast: '🌤️ 22°C - Mostly Sunny & Mild',
        daysList: Array.from({ length: days }).map((_, idx) => ({
          dayNumber: idx + 1,
          theme: idx === 0 ? 'Arrival & Cultural Landmarks' : idx === 1 ? 'Hidden Gems & Local Food Tour' : 'Scenic Views & Relaxation',
          activities: [
            { time: '09:00 AM', title: `Explore Top Landmark #${idx + 1}`, duration: '2.5 hrs', cost: '$15', type: 'Attraction' },
            { time: '01:00 PM', title: 'Authentic Local Culinary Tasting', duration: '1.5 hrs', cost: '$25', type: 'Food' },
            { time: '04:00 PM', title: 'Quiet Garden / Scenic Stroll (Low Crowd)', duration: '2 hrs', cost: 'Free', type: 'Hidden Gem' },
          ]
        }))
      });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">
                Smart Trip Planner
              </h3>
              <p className="text-xs text-slate-400">
                Custom AI-powered itinerary engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {!generatedItinerary ? (
            <form onSubmit={handleGenerate} className="space-y-6">
              
              {/* Destination Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-400" /> Destination City
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Kyoto, Japan"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 font-medium"
                  required
                />
              </div>

              {/* Trip Duration & Vibe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" /> Duration (Days)
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500 font-medium"
                  >
                    {[1, 2, 3, 4, 5, 7, 10].map(d => (
                      <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" /> Travel Vibe
                  </label>
                  <select
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500 font-medium"
                  >
                    {['Cultural & Historical', 'Relaxed & Foodie', 'Adventure & Outdoors', 'Budget Backpacker', 'Luxury Haven'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Budget Limit Slider */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-400" /> Daily Target Budget per Person
                  </span>
                  <span className="text-sky-400 text-sm font-bold">${dailyBudget} / day</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="400"
                  step="10"
                  value={dailyBudget}
                  onChange={(e) => setDailyBudget(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>$30 (Budget)</span>
                  <span>$200 (Standard)</span>
                  <span>$400+ (Luxury)</span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Tailored Itinerary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Smart Itinerary</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            
            /* Generated Itinerary Preview */
            <div className="space-y-6 animate-fade-in">
              
              {/* Summary Cards Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Destination</div>
                    <div className="text-xs font-bold text-white truncate">{generatedItinerary.destination}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Est. Total Budget</div>
                    <div className="text-xs font-bold text-white">${generatedItinerary.totalBudget}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Safety Score</div>
                    <div className="text-xs font-bold text-emerald-300">{generatedItinerary.safetyRating}</div>
                  </div>
                </div>
              </div>

              {/* Forecast Alert */}
              <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-500/20 text-xs text-sky-300 flex items-center justify-between">
                <span>{generatedItinerary.weatherForecast}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-200 font-semibold">Optimal for travel</span>
              </div>

              {/* Day Timeline */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Day-by-Day Schedule Preview
                </h4>

                {generatedItinerary.daysList.map((day) => (
                  <div key={day.dayNumber} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-bold text-sky-400">Day {day.dayNumber}: {day.theme}</span>
                      <span className="text-[10px] text-slate-500 font-medium">3 Activities</span>
                    </div>

                    <div className="space-y-2">
                      {day.activities.map((act, i) => (
                        <div key={i} className="flex items-center justify-between text-xs py-1.5 px-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="text-slate-400 font-medium">{act.time}</span>
                            <span className="text-slate-200 font-semibold">{act.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">{act.type}</span>
                            <span className="text-emerald-400 font-bold">{act.cost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setGeneratedItinerary(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800"
                >
                  Edit Preferences
                </button>

                <button
                  onClick={() => {
                    alert('Itinerary saved to your REEVANA Dashboard!');
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-sky-500/20"
                >
                  Save & Lock Itinerary
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
