import React from 'react';
import { X, MapPin, Star, DollarSign, Clock, ShieldCheck, CloudSun, Sparkles, BookOpen, Navigation, Bookmark, Check, Calendar } from 'lucide-react';
import WeatherAssistantWidget from '../weather/WeatherAssistantWidget';
import TransportAssistantWidget from '../transport/TransportAssistantWidget';
import TransportationSection from '../transport/TransportationSection';
import ReviewSection from '../reviews/ReviewSection';

export default function PlaceDetailsModal({ place, onClose, onPlanTrip }) {
  const [isSaved, setIsSaved] = React.useState(false);

  if (!place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Banner Image Header */}
        <div className="relative h-72 sm:h-80 overflow-hidden shrink-0">
          <img 
            src={place.image} 
            alt={place.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Crowd Pills Top Left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/90 text-slate-950 text-xs font-extrabold uppercase">
              {place.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-emerald-300 text-xs font-bold">
              {place.crowdLevel} Crowd Density
            </span>
          </div>

          {/* Title & Rating Banner Overlay */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sky-400 font-semibold text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {place.destinationCity}
              </span>

              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{place.rating}</span>
                <span className="text-slate-400 font-normal">({place.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              {place.name}
            </h2>
          </div>
        </div>

        {/* Content Body Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Est. Cost</div>
                <div className="text-xs font-bold text-white">{place.costFormatted}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Opening Hours</div>
                <div className="text-xs font-bold text-white truncate">{place.openingHours}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Safety Score</div>
                <div className="text-xs font-bold text-emerald-300 truncate">{place.safetyRating}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <Navigation className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Distance</div>
                <div className="text-xs font-bold text-white">{place.distanceKm} km away</div>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" /> About This Destination
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Historical & Cultural Background */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-heading flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> Historical & Cultural Background
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {place.culturalHistory}
            </p>
          </div>

          {/* Weather Assistant Widget Integration */}
          <WeatherAssistantWidget 
            destinationCity={place.destinationCity || place.name}
          />

          {/* Dedicated Transportation Section (Parts 3, 4 & 8 Spec) */}
          <TransportationSection 
            destinationName={place.name}
            originName={place.destinationCity ? `${place.destinationCity} Center` : 'City Center'}
          />

          {/* Transport Route Assistant Widget */}
          <TransportAssistantWidget 
            defaultOrigin="City Center Station"
            defaultDestination={place.name}
          />

          {/* Address & GPS */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Address: <strong className="text-slate-200">{place.location}</strong></span>
            </span>
            <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono">
              GPS: {place.lat}, {place.lng}
            </span>
          </div>

          {/* Integrated Review System */}
          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 font-heading flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Ratings & Reviews
            </h3>
            <ReviewSection
              targetId={place.id}
              targetName={place.name}
              targetType={['Adventure', 'Nature'].includes(place.category) ? 'activity' : 'place'}
              category={place.category || 'Tourist place'}
              baseRating={place.rating || 4.8}
              baseCount={place.reviewsCount || 100}
            />
          </div>



        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-semibold transition-all ${
              isSaved ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4 text-sky-400" />}
            <span>{isSaved ? 'Saved to Favorites' : 'Save Place'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onPlanTrip) onPlanTrip(place);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Plan Trip Around This Spot</span>
          </button>
        </div>

      </div>
    </div>
  );
}
