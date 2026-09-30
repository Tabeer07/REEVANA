import React, { useState } from 'react';
import { Clock, MapPin, IndianRupee, Hourglass, Sparkles, ExternalLink, Hotel, Utensils } from 'lucide-react';
import CompactTransportationCard from '../transport/CompactTransportationCard';
import { getTransportForLocation } from '../../data/transportData';
import { calculateDistance, estimateTransitDetails, getOpenInMapUrl } from '../../utils/distanceCalculator';

export default function ItineraryTimeline({ itineraryDays, days, tripTitle, weatherNotice, weatherAdjusted, selectedStay, selectedRestaurants = [] }) {
  const [activeDayTab, setActiveDayTab] = useState(1);

  // Support both schema structures (raw standard 'days' or 'itineraryDays')
  const baseDays = (Array.isArray(days) && days.length > 0) 
    ? days.map(d => ({
        dayNumber: d.day,
        dateTitle: `Day ${d.day}${d.date ? ` (${d.date})` : ''}`,
        theme: d.theme,
        activities: (d.activities || []).map((a, idx) => ({
          id: `act-${d.day}-${idx}`,
          time: a.time,
          place: a.place,
          activity: a.activity,
          description: a.description,
          lat: a.lat,
          lng: a.lng,
          estimatedCost: typeof a.estimatedCost === 'number' ? `₹${a.estimatedCost.toLocaleString('en-IN')}` : (a.estimatedCost || 'Free'),
          costNumber: typeof a.estimatedCost === 'number' ? a.estimatedCost : 0,
          duration: a.duration || (a.durationMinutes ? `${Math.floor(a.durationMinutes / 60) > 0 ? `${Math.floor(a.durationMinutes / 60)}h ` : ''}${a.durationMinutes % 60 > 0 ? `${a.durationMinutes % 60}m` : ''}`.trim() : '90 mins'),
          category: a.category || (a.activity?.toLowerCase().includes('lunch') || a.activity?.toLowerCase().includes('dinner') || a.activity?.toLowerCase().includes('breakfast') || a.activity?.toLowerCase().includes('food') ? 'Food' : 'Attraction'),
          transportationSuggestion: a.transportation || a.transportationSuggestion
        }))
      }))
    : (itineraryDays || []);

  if (!baseDays || baseDays.length === 0) return null;

  return (
    <div className="space-y-6">
      
      {/* Weather Adjustment Notice Banner (Parts 2 & 3 Spec) */}
      {weatherNotice && (
        <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-3 animate-fade-in shadow-xl ${
          weatherAdjusted 
            ? 'bg-blue-950/60 border-blue-500/40 text-blue-200' 
            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
            {weatherAdjusted ? '🌧️' : '☀️'}
          </div>
          <div className="space-y-0.5">
            <strong className="text-white font-bold text-sm block font-heading">
              {weatherAdjusted ? 'Weather-Aware AI Adjustment' : 'Weather Status'}
            </strong>
            <p className="text-slate-300">
              "{weatherNotice}"
            </p>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            Chronological Trip Itinerary Timeline
          </h3>
          <p className="text-xs text-slate-400">
            Integrated 🏨 Stay → 🚕 Transportation → 📍 Attraction → 🍛 Dining schedule.
          </p>
        </div>

        {/* Day Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {baseDays.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDayTab(day.dayNumber)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeDayTab === day.dayNumber
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Render Active Day Cards */}
      {baseDays.map((day) => {
        if (day.dayNumber !== activeDayTab) return null;

        // Build integrated chronological timeline list for Part 15 requirement
        const dayHotelStay = selectedStay || { name: 'Fortune Resort Grace / Central Hotel', address: 'Library Bazaar, Mussoorie' };
        
        const fullTimeline = [
          // 08:00 AM Hotel Check-out / Morning Start
          {
            id: `stay-start-${day.dayNumber}`,
            time: '08:00 AM',
            place: dayHotelStay.name,
            activity: '🏨 Morning Hotel Departure & Breakfast',
            description: `Depart from ${dayHotelStay.name} (${dayHotelStay.address || 'Mussoorie'}).`,
            category: 'Hotel',
            isHotel: true,
            estimatedCost: 'Included in stay'
          },
          ...day.activities,
          // 09:30 PM Night Return to Hotel
          {
            id: `stay-end-${day.dayNumber}`,
            time: '09:30 PM',
            place: dayHotelStay.name,
            activity: '🏨 Evening Return to Hotel & Relaxation',
            description: `Return to ${dayHotelStay.name} for overnight stay.`,
            category: 'Hotel',
            isHotel: true,
            estimatedCost: 'Included in stay'
          }
        ];

        return (
          <div key={day.dayNumber} className="space-y-6 animate-fade-in">
            
            {/* Day Header Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-bold text-sky-400 font-heading">
                  D{day.dayNumber}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-heading">
                    {day.dateTitle}: {day.theme}
                  </h4>
                  <span className="text-xs text-slate-400">{fullTimeline.length} Chronological Items Scheduled</span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-semibold text-emerald-400 self-start sm:self-auto">
                🟢 Chronological Route Synced
              </span>
            </div>

            {/* Activities Vertical Timeline */}
            <div className="relative pl-4 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-800">
              
              {fullTimeline.map((act, idx) => {
                const prevAct = idx > 0 ? fullTimeline[idx - 1] : null;
                const transportInfo = prevAct ? getTransportForLocation(act.place, prevAct.place) : null;
                const recOption = transportInfo ? (transportInfo.options.find(o => o.recommended) || transportInfo.options[0]) : null;

                let computedDist = transportInfo?.distanceKm || 4.2;
                if (prevAct && prevAct.lat && prevAct.lng && act.lat && act.lng) {
                  computedDist = calculateDistance(prevAct.lat, prevAct.lng, act.lat, act.lng);
                }
                const transitEst = recOption ? estimateTransitDetails(computedDist, recOption.type) : null;

                const isFood = act.category === 'Food' || act.activity?.toLowerCase().includes('lunch') || act.activity?.toLowerCase().includes('dinner') || act.activity?.toLowerCase().includes('food');
                const isHotel = act.isHotel || act.category === 'Hotel';

                return (
                  <React.Fragment key={act.id || idx}>
                    
                    {/* Consecutive Activity Transit Connector (Parts 5, 6, 7 & 15 Spec) */}
                    {prevAct && (
                      <CompactTransportationCard
                        from={prevAct.place}
                        to={act.place}
                        transitType={recOption?.type || 'taxi'}
                        estimatedCostMin={transitEst ? transitEst.minCost : 150}
                        estimatedCostMax={transitEst ? transitEst.maxCost : 350}
                        estimatedTimeMinutes={transitEst ? transitEst.estimatedTimeMinutes : 20}
                        distanceKm={computedDist}
                        notes={recOption?.notes || 'Local taxi / auto route'}
                      />
                    )}

                    <div 
                      className={`relative glass-card p-5 sm:p-6 rounded-3xl border space-y-4 group transition-all ${
                        isHotel 
                          ? 'border-sky-500/40 bg-sky-950/10' 
                          : isFood 
                          ? 'border-rose-500/40 bg-rose-950/10' 
                          : 'border-slate-800 hover:border-sky-500/40'
                      }`}
                    >
                      
                      {/* Timeline Dot Indicator */}
                      <div className={`absolute -left-[25px] sm:-left-[41px] top-6 w-4 h-4 rounded-full bg-slate-950 border-2 transition-all shadow-md ${
                        isHotel ? 'border-sky-400 shadow-sky-500/40' : isFood ? 'border-rose-400 shadow-rose-500/40' : 'border-amber-400 shadow-amber-500/40'
                      }`}></div>

                      {/* Top Bar: Time & Category Tag */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <Clock className={`w-4 h-4 ${isHotel ? 'text-sky-400' : isFood ? 'text-rose-400' : 'text-amber-400'}`} />
                          <span className="text-white">{act.time}</span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold self-start sm:self-auto ${
                          isHotel 
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
                            : isFood 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                            : 'bg-slate-900 border border-slate-800 text-slate-300'
                        }`}>
                          {isHotel ? '🏨 Stay' : isFood ? '🍛 Dining' : '📍 Attraction'}
                        </span>
                      </div>

                      {/* Place & Description */}
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5 className="text-lg font-bold text-white font-heading group-hover:text-sky-300 transition-colors flex items-center gap-2">
                            {isHotel ? <Hotel className="w-4 h-4 text-sky-400 shrink-0" /> : isFood ? <Utensils className="w-4 h-4 text-rose-400 shrink-0" /> : <MapPin className="w-4 h-4 text-amber-400 shrink-0" />}
                            {act.place}
                          </h5>

                          <div className="flex items-center gap-2">
                            <a
                              href={getOpenInMapUrl(act.place, act.lat, act.lng, tripTitle)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-sky-400 hover:text-sky-300 text-[11px] font-semibold transition-all flex items-center gap-1 shrink-0"
                              title="View on Google Maps"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>View on Map</span>
                            </a>
                            {act.activity && (
                              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 self-start sm:self-auto">
                                {act.activity}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {act.description}
                        </p>
                      </div>

                      {/* Activity Metrics Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                        
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase font-semibold">Est. Cost</div>
                            <div className="font-bold text-emerald-400 text-xs">{act.estimatedCost}</div>
                          </div>
                        </div>

                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-2">
                          <Hourglass className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase font-semibold">Duration</div>
                            <div className="font-bold text-slate-200 text-xs">{act.duration || '60 mins'}</div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </React.Fragment>
                );
              })}

            </div>

          </div>
        );
      })}

      {/* Render Attached User Stay & Dining Picks if available */}
      {(selectedStay || (Array.isArray(selectedRestaurants) && selectedRestaurants.length > 0)) && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl mt-6">
          <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Attached Trip Reservations & Custom Picks</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedStay && (
              <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-sky-400 font-bold">
                  <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4" /> Attached Stay</span>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20">{selectedStay.type || 'Hotel'}</span>
                </div>
                <div className="text-sm font-bold text-white">{selectedStay.name}</div>
                <div className="text-xs text-slate-400">{selectedStay.location || selectedStay.destinationCity} • ₹{(selectedStay.pricePerNight || 0).toLocaleString('en-IN')}/night</div>
              </div>
            )}

            {Array.isArray(selectedRestaurants) && selectedRestaurants.map((res, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-rose-400 font-bold">
                  <span className="flex items-center gap-1.5"><Utensils className="w-4 h-4" /> Custom Dining Pick</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20">Day {res.day} ({res.mealType})</span>
                </div>
                <div className="text-sm font-bold text-white">{res.item?.name || 'Restaurant Pick'}</div>
                <div className="text-xs text-slate-400">{res.item?.cuisineType || 'Local Cuisine'} • Avg. ₹{(res.item?.avgCostPerPerson || 0).toLocaleString('en-IN')}/person</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
