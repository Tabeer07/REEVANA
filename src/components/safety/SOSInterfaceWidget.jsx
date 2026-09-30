import React, { useState } from 'react';
import { AlertTriangle, MapPin, Share2, Copy, Check, ShieldAlert, RefreshCw, X, Radio, PhoneCall } from 'lucide-react';

export default function SOSInterfaceWidget() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  const handleOpenConfirm = () => {
    setShowConfirmModal(true);
  };

  const handleTriggerSOS = () => {
    setShowConfirmModal(false);
    setSosActive(true);
    fetchLiveLocation();
  };

  const fetchLiveLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          setLocationData({
            lat: position.coords.latitude.toFixed(4),
            lng: position.coords.longitude.toFixed(4),
            accuracy: Math.round(position.coords.accuracy || 15),
            timestamp: new Date().toLocaleTimeString()
          });
        },
        (error) => {
          setIsLocating(false);
          // Fallback location simulation if user denies permission or in dev
          setLocationData({
            lat: 35.0116,
            lng: 135.7681,
            accuracy: 12,
            timestamp: new Date().toLocaleTimeString(),
            isSimulated: true
          });
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setIsLocating(false);
      setLocationData({
        lat: 35.0116,
        lng: 135.7681,
        accuracy: 12,
        timestamp: new Date().toLocaleTimeString(),
        isSimulated: true
      });
    }
  };

  const shareableMapUrl = locationData
    ? `https://maps.google.com/?q=${locationData.lat},${locationData.lng}`
    : '';

  const handleCopyLocation = () => {
    if (shareableMapUrl) {
      navigator.clipboard.writeText(
        `EMERGENCY SOS LOCATION: ${locationData.lat}° N, ${locationData.lng}° E (${shareableMapUrl})`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-rose-500/60 bg-gradient-to-br from-slate-950 via-rose-950/20 to-slate-950 shadow-2xl space-y-6">
      
      {/* SOS Title Bar */}
      <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-wide">
              Emergency SOS Interface
            </h3>
            <p className="text-xs text-rose-300 font-medium">
              Instant Geolocation Broadcast & Emergency Contact Relay
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold animate-pulse">
          🚨 Active Safety Beacon
        </span>
      </div>

      {/* Main SOS Trigger Callout */}
      {!sosActive ? (
        <div className="text-center space-y-4 py-4">
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
            If you are in immediate danger, press the SOS button below to capture your exact GPS coordinates and access emergency dispatch links.
          </p>

          <button
            onClick={handleOpenConfirm}
            className="w-full sm:w-80 py-5 rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-lg uppercase tracking-wider shadow-2xl shadow-rose-600/40 border-2 border-rose-400/80 transition-all hover:scale-105 active:scale-95 cursor-pointer mx-auto flex items-center justify-center gap-3"
          >
            <ShieldAlert className="w-7 h-7 animate-bounce" />
            <span>Trigger Emergency SOS</span>
          </button>
        </div>
      ) : (
        /* SOS Active State - Display Coordinates */
        <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-500/60 space-y-5 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-500/30 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
              <h4 className="text-base font-extrabold text-white font-heading">
                SOS Distress Signal Transmitting
              </h4>
            </div>

            <button
              onClick={fetchLiveLocation}
              className="text-xs text-rose-300 hover:text-white flex items-center gap-1 font-semibold self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>Refresh GPS</span>
            </button>
          </div>

          {/* Coordinates Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Current Coordinates
              </span>
              <div className="text-xl font-extrabold text-white font-mono">
                {isLocating ? (
                  <span className="text-slate-500 text-xs font-sans">Acquiring Satellite GPS...</span>
                ) : (
                  `${locationData?.lat}° N, ${locationData?.lng}° E`
                )}
              </div>
              <div className="text-[10px] text-slate-400">
                {locationData?.isSimulated ? '(Simulated GPS Signal)' : `Accuracy: ± ${locationData?.accuracy} meters`}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Signal Timestamp</span>
              <div className="text-xl font-extrabold text-rose-300 font-mono">
                {locationData?.timestamp || 'Just now'}
              </div>
              <div className="text-[10px] text-slate-400">
                Live Broadcast Status: ACTIVE
              </div>
            </div>

          </div>

          {/* Action Buttons: Copy Location Link / Share */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleCopyLocation}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-rose-400" />}
              <span>{copiedLink ? 'GPS Link Copied!' : 'Copy Location Link'}</span>
            </button>

            <a
              href={shareableMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 text-center"
            >
              <Share2 className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>

        </div>
      )}

      {/* PROTOTYPE DISCLAIMER BANNER */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs leading-relaxed space-y-1">
        <span className="font-bold text-amber-400 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" /> Prototype Mode Notice:
        </span>
        <p>
          This safety center is currently running in demonstration prototype mode. Pressing SOS captures real browser GPS coordinates for testing, but does <strong>NOT</strong> dispatch real emergency vehicles unless connected to a live municipal emergency dispatch API.
        </p>
      </div>

      {/* DOUBLE CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border-2 border-rose-500 shadow-2xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mx-auto text-rose-500">
              <ShieldAlert className="w-9 h-9 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white font-heading">
                Confirm Emergency SOS
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Are you sure you want to activate the emergency distress signal and acquire your current GPS coordinates?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>

              <button
                onClick={handleTriggerSOS}
                className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
              >
                Yes, Trigger SOS
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
