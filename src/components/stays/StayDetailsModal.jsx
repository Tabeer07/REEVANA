import React, { useState } from 'react';
import { X, MapPin, Star, Hotel, Clock, ShieldCheck, Check, Navigation, DollarSign, Calendar, Sparkles, Car, Footprints, Bus, Plus, ExternalLink } from 'lucide-react';
import ReviewSection from '../reviews/ReviewSection';
import InteractiveMapView from '../map/InteractiveMapView';
import { getDirectionsUrl, estimateTransitDetails, calculateDistance } from '../../utils/distanceCalculator';

export default function StayDetailsModal({ stay, onClose, currentItinerarySpot = 'George Everest Peak, Mussoorie', onAddStayToTrip }) {
  const [checkInDate, setCheckInDate] = useState('2026-10-10');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-13');
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestsCount, setGuestsCount] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!stay) return null;

  const directionsUrl = getDirectionsUrl(stay.address || stay.name, stay.lat, stay.lng);

  // Calculate dynamic Location Score based on distance & nearby amenities
  const distanceKm = stay.distanceFromAttractionsKm || calculateDistance(30.4598, 78.0644, stay.lat || 30.46, stay.lng || 78.07);
  const rawScore = Math.max(7.2, Math.min(9.9, 10 - (distanceKm * 0.4))).toFixed(1);
  const locationScore = stay.locationScore || rawScore;
  const locationNote = stay.locationNote || (distanceKm < 1.5 ? 'Excellent central location for your current itinerary.' : 'Good location with quick taxi access to major spots.');

  // Transportation estimations: Hotel -> Main Itinerary Attraction
  const drivingTransit = estimateTransitDetails(distanceKm, 'taxi');
  const busTransit = estimateTransitDetails(distanceKm, 'bus');
  const walkingTransit = estimateTransitDetails(distanceKm, 'walk');

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    setBookingSuccess(true);

    if (onAddStayToTrip) {
      onAddStayToTrip({
        stay,
        checkInDate,
        checkOutDate,
        roomsCount,
        guestsCount,
        totalCost: stay.pricePerNight ? stay.pricePerNight * 3 * roomsCount : 12000
      });
    }

    setTimeout(() => {
      setBookingSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Image Banner */}
        <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
          <img 
            src={stay.image} 
            alt={stay.name} 
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

          {/* Property Badges Top Left */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500 text-slate-950 text-xs font-extrabold shadow-md">
              {stay.type}
            </span>

            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-extrabold">
              {stay.pricePerNight ? `₹${stay.pricePerNight.toLocaleString('en-IN')} / night (${stay.isDemoPrice ? 'Demo price' : 'Verified'})` : 'Price unavailable'}
            </span>
          </div>

          {/* Title & Rating Banner Overlay */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/90 border border-sky-500/30 text-sky-300 text-xs font-bold">
                <span>📍 Location Score: {locationScore}/10</span>
              </div>

              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{stay.rating}</span>
                <span className="text-slate-400 font-normal">({stay.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {stay.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* PART 10 REQUIREMENT: Hotel Location Score Box */}
          <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" /> Hotel Location Score: {locationScore}/10
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-200 font-semibold">
                Evaluated from itinerary distances
              </span>
            </div>
            <p className="text-xs text-slate-300">
              "{locationNote}"
            </p>
          </div>

          {/* PART 9 REQUIREMENT: Transportation Section (Hotel -> Major Attraction) */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-sky-400" />
                  Transportation: Hotel → Attraction
                </h4>
                <span className="text-[11px] text-slate-400">
                  FROM: <strong className="text-sky-300">{stay.name}</strong> → TO: <strong className="text-amber-300">{currentItinerarySpot}</strong>
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400 font-semibold self-start sm:self-auto">
                All fares labeled as Estimated fare
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              {/* 🚗 Taxi / Driving */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <Car className="w-4 h-4" />
                  <span>🚗 Private Taxi / Drive</span>
                </div>
                <div className="text-slate-300">Distance: <strong>{distanceKm} km</strong></div>
                <div className="text-slate-300">Travel time: <strong>{drivingTransit.estimatedTimeMinutes} mins</strong></div>
                <div className="text-emerald-400 font-extrabold pt-1 border-t border-slate-800/80">
                  Estimated fare: ₹{drivingTransit.minCost} – ₹{drivingTransit.maxCost}
                </div>
              </div>

              {/* 🚌 Transit */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Bus className="w-4 h-4" />
                  <span>🚌 Shared Bus / Auto</span>
                </div>
                <div className="text-slate-300">Distance: <strong>{distanceKm} km</strong></div>
                <div className="text-slate-300">Travel time: <strong>{busTransit.estimatedTimeMinutes} mins</strong></div>
                <div className="text-emerald-400 font-extrabold pt-1 border-t border-slate-800/80">
                  Estimated fare: ₹{busTransit.minCost} – ₹{busTransit.maxCost}
                </div>
              </div>

              {/* 🚶 Walking */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Footprints className="w-4 h-4" />
                  <span>🚶 Walking Trail</span>
                </div>
                <div className="text-slate-300">Distance: <strong>{distanceKm} km</strong></div>
                <div className="text-slate-300">Travel time: <strong>{walkingTransit.estimatedTimeMinutes} mins</strong></div>
                <div className="text-emerald-400 font-extrabold pt-1 border-t border-slate-800/80">
                  Estimated fare: Free
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Google Map Location */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" /> Interactive Map Location
            </h4>
            <InteractiveMapView
              selectedDestination={stay.destinationCity || 'Mussoorie'}
              routeSequence={[{ place: stay.name, lat: stay.lat || 30.468, lng: stay.lng || 78.042 }]}
              height="280px"
            />
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Property Amenities & Services
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {stay.amenities.map((amenity) => (
                <div key={amenity} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PART 11 REQUIREMENT: Add Stay to Trip Form */}
          <div className="p-5 rounded-2xl bg-sky-950/20 border border-sky-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-sky-400" /> Associate Stay with My Trip
                </h5>
                <span className="text-xs text-slate-400">Selected hotel will be pinned to itinerary start/end of each day</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Instant Trip Sync
              </span>
            </div>

            {bookingSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-fade-in">
                <Check className="w-4 h-4" /> {stay.name} attached to your trip from {checkInDate} to {checkOutDate}!
              </div>
            ) : (
              <form onSubmit={handleConfirmReservation} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-semibold">Check-in</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-semibold">Check-out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-semibold">Rooms & Guests</label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white"
                  >
                    <option value={1}>1 Room, {guestsCount} Guests</option>
                    <option value={2}>2 Rooms, 4 Guests</option>
                    <option value={3}>3+ Rooms</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-1 transition-all"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add Stay to Trip</span>
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Integrated Review System */}
          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 font-heading flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Property Reviews & Ratings
            </h3>
            <ReviewSection
              targetId={stay.id}
              targetName={stay.name}
              targetType="hotel"
              category={stay.type || 'Hotel'}
              baseRating={stay.rating || 4.8}
              baseCount={stay.reviewsCount || 150}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
