import React, { useState } from 'react';
import { X, MapPin, Star, Utensils, Clock, Phone, Navigation, DollarSign, Calendar, Check, Sparkles, BookOpen, ExternalLink, Car, Footprints, Bus, Plus } from 'lucide-react';
import ReviewSection from '../reviews/ReviewSection';
import InteractiveMapView from '../map/InteractiveMapView';
import { getOpenInMapUrl, getDirectionsUrl, calculateDistance, estimateTransitDetails } from '../../utils/distanceCalculator';

export default function RestaurantDetailsModal({ restaurant, onClose, currentTripLocation = 'Library Chowk, Mussoorie', onAddToTrip }) {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [guestsCount, setGuestsCount] = useState(2);
  const [reservationTime, setReservationTime] = useState('19:30');

  if (!restaurant) return null;

  const directionsUrl = getDirectionsUrl(restaurant.address || restaurant.name, restaurant.lat, restaurant.lng);

  // Transportation estimations FROM current trip location TO restaurant
  const distanceKm = restaurant.distanceKm || calculateDistance(30.4598, 78.0644, restaurant.lat || 30.46, restaurant.lng || 78.07);
  const drivingTransit = estimateTransitDetails(distanceKm, 'taxi');
  const walkingTransit = estimateTransitDetails(distanceKm, 'walk');
  const busTransit = estimateTransitDetails(distanceKm, 'bus');

  const handleBookTable = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Banner Header */}
        <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Data Source & Price Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-rose-500/40 text-rose-300 text-xs font-extrabold shadow-md">
              {restaurant.isGoogleVerified ? '🟢 Verified Google Place' : (restaurant.sourceLabel || '✨ REEVANA Demo Data')}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-extrabold">
              {restaurant.priceRange} (₹{restaurant.avgCostPerPerson.toLocaleString('en-IN')}/person)
            </span>
          </div>

          {/* Title & Rating Banner Overlay */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-rose-400 font-semibold text-xs flex items-center gap-1.5">
                <Utensils className="w-4 h-4" />
                {restaurant.cuisine}
              </span>

              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{restaurant.rating}</span>
                <span className="text-slate-400 font-normal">({restaurant.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {restaurant.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAddToTrip && onAddToTrip(restaurant)}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add to My Trip</span>
              </button>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 text-xs font-bold flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>

            <span className="text-xs text-slate-400">
              📍 {restaurant.address}
            </span>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Opening Hours</div>
                <div className="font-bold text-white truncate">{restaurant.openingHours}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Phone</div>
                <div className="font-bold text-white truncate">{restaurant.phone || '+91 98370 12345'}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Distance</div>
                <div className="font-bold text-white">{distanceKm} km away</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Avg Spend</div>
                <div className="font-bold text-rose-300">₹{restaurant.avgCostPerPerson.toLocaleString('en-IN')} / person</div>
              </div>
            </div>
          </div>

          {/* PART 2 REQUIREMENT: Transportation Section from Current Itinerary Location */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-sky-400" />
                  Transportation to Restaurant
                </h4>
                <span className="text-[11px] text-slate-400">
                  FROM: <strong className="text-sky-300">{currentTripLocation}</strong> → TO: <strong className="text-rose-300">{restaurant.name}</strong>
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400 font-semibold self-start sm:self-auto">
                All fares labeled as Estimated fare
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              {/* 🚗 Driving */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <Car className="w-4 h-4" />
                  <span>🚗 Driving / Taxi</span>
                </div>
                <div className="text-slate-300">Distance: <strong>{distanceKm} km</strong></div>
                <div className="text-slate-300">Est. Time: <strong>{drivingTransit.estimatedTimeMinutes} mins</strong></div>
                <div className="text-emerald-400 font-extrabold pt-1 border-t border-slate-800/80">
                  Estimated fare: ₹{drivingTransit.minCost} – ₹{drivingTransit.maxCost}
                </div>
              </div>

              {/* 🚶 Walking */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Footprints className="w-4 h-4" />
                  <span>🚶 Walking</span>
                </div>
                <div className="text-slate-300">Distance: <strong>{distanceKm} km</strong></div>
                <div className="text-slate-300">Est. Time: <strong>{walkingTransit.estimatedTimeMinutes} mins</strong></div>
                <div className="text-emerald-400 font-extrabold pt-1 border-t border-slate-800/80">
                  Estimated fare: Free
                </div>
              </div>

              {/* 🚌 Transit */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Bus className="w-4 h-4" />
                  <span>🚌 Local Bus / Auto</span>
                </div>
                <div className="text-slate-300">Distance: <strong>{distanceKm} km</strong></div>
                <div className="text-slate-300">Est. Time: <strong>{busTransit.estimatedTimeMinutes} mins</strong></div>
                <div className="text-emerald-400 font-extrabold pt-1 border-t border-slate-800/80">
                  Estimated fare: ₹{busTransit.minCost} – ₹{busTransit.maxCost}
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Google Map Location */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" /> Map Location
            </h4>
            <InteractiveMapView
              selectedDestination={restaurant.destinationCity || 'Mussoorie'}
              routeSequence={[{ place: restaurant.name, lat: restaurant.lat || 30.4598, lng: restaurant.lng || 78.0644 }]}
              height="280px"
            />
          </div>

          {/* Popular Dishes List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> Signature Dishes & Menu Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {restaurant.popularDishes.map((dish, i) => (
                <div key={dish} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">🍱 {dish}</span>
                  <span className="text-amber-400 font-bold">₹{(150 + i * 100).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table Reservation Box */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-400" /> Reserve a Table
                </h5>
                <span className="text-xs text-slate-400">Instant confirmation via REEVANA Dining Engine</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                No Booking Fee
              </span>
            </div>

            {bookingSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-fade-in">
                <Check className="w-4 h-4" /> Table successfully reserved for {guestsCount} guests at {reservationTime}!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-semibold">Guests</label>
                  <select 
                    value={guestsCount} 
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6+ Guests</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-semibold">Time Slot</label>
                  <select 
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white"
                  >
                    <option value="18:30">06:30 PM</option>
                    <option value="19:30">07:30 PM</option>
                    <option value="20:30">08:30 PM</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleBookTable}
                    className="w-full py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition-all"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Integrated Review System */}
          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 font-heading flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Dining Reviews & Ratings
            </h3>
            <ReviewSection
              targetId={restaurant.id}
              targetName={restaurant.name}
              targetType="restaurant"
              category={restaurant.cuisine || 'Restaurant'}
              baseRating={restaurant.rating || 4.8}
              baseCount={restaurant.reviewsCount || 150}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
