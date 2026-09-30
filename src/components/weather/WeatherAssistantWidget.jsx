import React, { useState, useEffect } from 'react';
import { CloudSun, Sun, CloudRain, Snowflake, Wind, Droplets, Sparkles, AlertTriangle, Thermometer, Sunrise, Sunset } from 'lucide-react';
import { fetchLiveWeather } from '../../services/weatherService';

/**
 * Real Weather Assistant Component (Parts 1, 2 & 3 Spec)
 * Supports live weather API, feels-like temp, humidity, wind, rain chance, sunrise/sunset,
 * 5-day forecast, and weather advisory alerts.
 */
export default function WeatherAssistantWidget({ destinationCity = 'Mussoorie', lat = null, lng = null }) {
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchLiveWeather(destinationCity, lat, lng).then((data) => {
      if (isMounted) {
        setWeather(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [destinationCity, lat, lng]);

  if (loading || !weather) {
    return (
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 animate-pulse">
        <div className="h-6 bg-slate-800 rounded w-1/3"></div>
        <div className="h-20 bg-slate-800 rounded"></div>
      </div>
    );
  }

  const displayTemp = (c) => {
    return useFahrenheit ? `${Math.round((c * 9) / 5 + 32)}°F` : `${c}°C`;
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/30">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white font-heading">
                Weather & Climate Intelligence
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                Live Open API
              </span>
            </div>
            <p className="text-xs text-slate-400">{weather.city}</p>
          </div>
        </div>

        {/* °C / °F Unit Switcher */}
        <button
          onClick={() => setUseFahrenheit(!useFahrenheit)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 hover:text-white transition-colors self-start sm:self-auto"
        >
          Units: {useFahrenheit ? '°F (Fahrenheit)' : '°C (Celsius)'}
        </button>
      </div>

      {/* Weather Warning Alerts (Part 3 Spec) */}
      {weather.alertBanner && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3 animate-fade-in shadow-lg">
          <span className="text-2xl shrink-0">{weather.alertBanner.icon}</span>
          <div className="space-y-0.5">
            <strong className="text-amber-300 font-bold text-sm block">
              Weather Warning: {weather.alertBanner.title}
            </strong>
            <p className="text-slate-300">
              {weather.alertBanner.message}
            </p>
          </div>
        </div>
      )}

      {/* Main Temperature & Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Main Temperature Block */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] text-slate-400 font-bold uppercase">Current Temp</div>
            <div className="text-4xl font-extrabold text-white font-heading">
              {displayTemp(weather.tempC)}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Feels like {displayTemp(weather.feelsLikeC)}
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-950 text-sky-300 text-[11px] font-semibold border border-slate-800 mt-1">
              {weather.icon} {weather.condition}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-3xl">
            {weather.icon}
          </div>
        </div>

        {/* Weather Metrics */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <CloudRain className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Rain Chance</div>
              <div className="text-xs font-bold text-white">{weather.rainChance}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Humidity</div>
              <div className="text-xs font-bold text-white">{weather.humidity}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <Wind className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Wind Speed</div>
              <div className="text-xs font-bold text-white">{weather.windSpeed}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <Sunrise className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sunrise / Sunset</div>
              <div className="text-[11px] font-bold text-amber-300">{weather.sunrise} / {weather.sunset}</div>
            </div>
          </div>

        </div>

      </div>

      {/* 5-Day Forecast Row */}
      <div className="space-y-3 pt-2 border-t border-slate-800/80">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>5-Day Weather Forecast</span>
          <span className="text-[11px] text-slate-400 font-normal">Updated Live</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          {weather.forecast5Days.map((fc) => (
            <div 
              key={fc.day} 
              className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center space-y-1 hover:border-sky-500/40 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-300">{fc.day}</div>
              <div className="text-2xl my-1">{fc.icon}</div>
              <div className="font-extrabold text-white">{displayTemp(fc.tempC)}</div>
              <div className="text-[10px] text-slate-400 truncate">{fc.condition}</div>
              <div className="text-[10px] text-sky-400 font-semibold">💧 {fc.rainChance || fc.pop}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
