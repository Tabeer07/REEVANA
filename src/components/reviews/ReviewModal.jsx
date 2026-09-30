import React from 'react';
import { X, Star, MapPin } from 'lucide-react';
import ReviewSection from './ReviewSection';

export default function ReviewModal({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  const targetId = item.id;
  const targetName = item.name;
  const targetType = item.type === 'Hotel' || item.type === 'Hostel' || item.type === 'Homestay' || item.type === 'Luxury Resort'
    ? 'hotel'
    : item.cuisine
    ? 'restaurant'
    : item.category === 'Adventure' || item.category === 'Nature'
    ? 'activity'
    : 'place';

  const category = item.category || item.type || item.cuisine || 'Tourist place';
  const baseRating = item.rating || 4.8;
  const baseCount = item.reviewsCount || 150;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-bold uppercase">
                  {category}
                </span>
                {item.destinationCity && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    {item.destinationCity}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                {item.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <ReviewSection
            targetId={targetId}
            targetName={targetName}
            targetType={targetType}
            category={category}
            baseRating={baseRating}
            baseCount={baseCount}
          />
        </div>

      </div>
    </div>
  );
}
