import React, { useState } from 'react';
import { X, Calendar, Clock, Utensils, CheckCircle2, Sparkles, MapPin } from 'lucide-react';

export default function AddToTripModal({ item, itemType = 'restaurant', isOpen, onClose, onAddToTrip, availableDays = 3 }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTime, setSelectedTime] = useState('13:00');
  const [mealType, setMealType] = useState('Lunch');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddedSuccess(true);

    if (onAddToTrip) {
      onAddToTrip({
        item,
        itemType,
        day: selectedDay,
        time: selectedTime,
        mealType
      });
    }

    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">Add Restaurant to Trip</h3>
              <p className="text-xs text-slate-400 truncate max-w-[220px]">{item.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {addedSuccess ? (
          <div className="p-6 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white font-heading">Added to Itinerary!</h4>
            <p className="text-xs text-slate-300">
              {item.name} has been added to Day {selectedDay} ({mealType}) schedule.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Item Summary Box */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">{item.name}</span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" /> {item.address || item.destinationCity || 'Mussoorie'}
                </span>
              </div>
              <span className="text-amber-400 font-extrabold text-xs shrink-0">
                ₹{item.avgCostPerPerson || 400} / person
              </span>
            </div>

            {/* Day Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Select Day
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-medium"
              >
                {Array.from({ length: availableDays }).map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    Day {idx + 1} Itinerary
                  </option>
                ))}
              </select>
            </div>

            {/* Meal Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-rose-400" /> Meal Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMealType(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      mealType === m
                        ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Scheduled Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Add to My Trip Itinerary</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
