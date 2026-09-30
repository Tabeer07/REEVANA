import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Star, Compass, Layers, ExternalLink, PlusCircle, ArrowRight, Route, Clock, IndianRupee } from 'lucide-react';
import { getOpenInMapUrl, getDirectionsUrl } from '../../utils/distanceCalculator';

/**
 * Reusable Interactive Map View Component (Parts 4, 5, 8 & 13 Spec)
 * Renders Leaflet / OpenStreetMap tiles with location markers, sequential route polylines,
 * interactive popups, and Open in Map / Get Directions links.
 */
export default function InteractiveMapView({
  attractions = [],
  routeSequence = [],
  selectedDestination = 'Mussoorie',
  centerLat = 30.4598,
  centerLng = 78.0644,
  onSelectAttraction,
  onAddToTrip,
  height = '480px'
}) {
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersGroupRef = useRef(null);
  const polylineRef = useRef(null);

  const [activePin, setActivePin] = useState(attractions[0] || routeSequence[0] || null);
  const [isSatellite, setIsSatellite] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(Boolean(window.L));

  const displayList = routeSequence.length > 0 ? routeSequence : attractions;

  // Dynamically load Leaflet JS & CSS from CDN if not already present
  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || !window.L) return;

    const L = window.L;

    // 1. Initialize Map Instance
    if (!leafletMapRef.current) {
      const initialLat = displayList[0]?.lat || centerLat;
      const initialLng = displayList[0]?.lng || centerLng;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      leafletMapRef.current = map;
    }

    const map = leafletMapRef.current;

    // 2. Set Tile Layer (Standard OpenStreetMap vs Satellite)
    if (map._tileLayer) {
      map.removeLayer(map._tileLayer);
    }

    const tileUrl = isSatellite
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const tileAttrib = isSatellite
      ? '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

    const tileLayer = L.tileLayer(tileUrl, {
      attribution: tileAttrib,
      maxZoom: 19
    }).addTo(map);
    map._tileLayer = tileLayer;

    // 3. Clear existing markers & polylines
    if (markersGroupRef.current) {
      map.removeLayer(markersGroupRef.current);
    }
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
    }

    const markersGroup = L.featureGroup();
    const latLngs = [];

    // Custom Icon Generator
    const createCustomIcon = (index, label, isSeq = false) => {
      const numberBadge = isSeq ? `<div style="position:absolute; top:-6px; right:-6px; background:#0284c7; color:#fff; font-size:10px; font-weight:800; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-center:center; border:1px solid #fff;">${index + 1}</div>` : '';
      
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position:relative; background:#0f172a; border:2px solid #38bdf8; border-radius:12px; padding:4px 8px; color:#f8fafc; font-size:11px; font-weight:700; display:flex; align-items:center; gap:4px; box-shadow:0 4px 12px rgba(0,0,0,0.5); font-family:sans-serif;">
            <span style="color:#38bdf8;">📍</span>
            <span style="max-width:80px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${label}</span>
            ${numberBadge}
          </div>
        `,
        iconSize: [110, 32],
        iconAnchor: [55, 16]
      });
    };

    // Render Markers for each item
    displayList.forEach((item, idx) => {
      const itemLat = Number(item.lat) || (centerLat + (idx * 0.015 - 0.03));
      const itemLng = Number(item.lng) || (centerLng + (idx * 0.02 - 0.03));
      const pt = [itemLat, itemLng];
      latLngs.push(pt);

      const marker = L.marker(pt, {
        icon: createCustomIcon(idx, item.name || item.place || 'Attraction', routeSequence.length > 0)
      });

      marker.on('click', () => {
        setActivePin(item);
      });

      markersGroup.addLayer(marker);
    });

    markersGroup.addTo(map);
    markersGroupRef.current = markersGroup;

    // 4. Draw Sequence Polyline for Itinerary Routes
    if (routeSequence.length > 1 && latLngs.length > 1) {
      const polyline = L.polyline(latLngs, {
        color: '#38bdf8',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.85
      }).addTo(map);
      polylineRef.current = polyline;
    }

    // Fit Bounds to show all pins
    if (latLngs.length > 0) {
      map.fitBounds(markersGroup.getBounds().pad(0.2));
    }

  }, [leafletLoaded, displayList, isSatellite, centerLat, centerLng, routeSequence]);

  return (
    <div 
      className="glass-panel rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col justify-between"
      style={{ minHeight: height }}
    >
      
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold shadow-lg pointer-events-auto">
          <Compass className="w-4 h-4 text-sky-400 animate-spin-slow" />
          <span>Interactive Location Map</span>
          <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px] font-bold">
            {displayList.length} Locations
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button 
            onClick={() => setIsSatellite(!isSatellite)}
            className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isSatellite ? 'bg-sky-500 text-white border-sky-400' : 'bg-slate-950/85 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Toggle Satellite Imagery"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isSatellite ? 'Satellite' : 'Roadmap'}</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full min-h-[380px] flex-1 z-10 bg-slate-950" 
      />

      {/* Selected Marker Overlay Drawer (Bottom Card) */}
      {activePin && (
        <div className="relative z-30 p-4 m-4 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in bg-slate-950/90 backdrop-blur-md">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {activePin.image && (
              <img 
                src={activePin.image} 
                alt={activePin.name || activePin.place} 
                className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
              />
            )}

            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-[10px]">
                <span className="font-bold text-sky-400 uppercase">
                  {activePin.category || 'Attraction'}
                </span>
                {activePin.crowdLevel && (
                  <span className="text-emerald-400 font-semibold">• {activePin.crowdLevel} Crowd</span>
                )}
                {activePin.time && (
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activePin.time}
                  </span>
                )}
              </div>

              <h5 className="text-sm font-bold text-white font-heading truncate max-w-xs md:max-w-md">
                {activePin.name || activePin.place}
              </h5>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                {activePin.rating && (
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {activePin.rating}
                  </span>
                )}

                {(activePin.costFormatted || activePin.estimatedCost) && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <IndianRupee className="w-3 h-3" /> {activePin.costFormatted || `₹${activePin.estimatedCost}`}
                  </span>
                )}

                {activePin.duration && (
                  <span className="text-slate-400">{activePin.duration}</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons: View Details, Add to Trip, Open in Google Maps */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
            
            {/* View on Map (External Google Maps) */}
            <a
              href={getOpenInMapUrl(activePin.name || activePin.place, activePin.lat, activePin.lng, selectedDestination)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
              title="Open location in Google Maps"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              <span>View on Map</span>
            </a>

            {/* Add to Trip Button (If provided) */}
            {onAddToTrip && (
              <button
                onClick={() => onAddToTrip(activePin)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add to My Trip</span>
              </button>
            )}

            {/* View Details Button */}
            {onSelectAttraction && (
              <button
                onClick={() => onSelectAttraction(activePin)}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
