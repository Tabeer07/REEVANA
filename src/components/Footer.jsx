import React from 'react';
import { Compass, ShieldAlert, PhoneCall, Mail, Heart, Globe, ArrowRight } from 'lucide-react';

export default function Footer({ onOpenPlanner, onSelectTab }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-sky-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-400 via-blue-600 to-amber-400 p-[2px] shadow-lg shadow-sky-500/20 overflow-hidden">
                <img 
                  src="/reevana-logo.jpg" 
                  alt="ReeVANA Footer Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                REE<span className="text-sky-400">VANA</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Your modern, all-in-one smart tourism platform. Plan trips effortlessly, keep budgets under control, discover quiet hidden gems, and travel with 24/7 safety alerts.
            </p>

            {/* Quick Emergency Badge */}
            <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between max-w-sm">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
                <div>
                  <div className="font-bold text-[11px]">Global Tourist SOS</div>
                  <div className="text-[10px] text-rose-400/80">Direct Emergency Access</div>
                </div>
              </div>
              <a href="tel:112" className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-[11px] hover:bg-rose-400 transition-colors">
                Dial SOS
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#home" onClick={() => onSelectTab('Home')} className="hover:text-sky-400 transition-colors">AI Trip Planner</a></li>
              <li><a href="#popular" onClick={() => onSelectTab('Explore')} className="hover:text-sky-400 transition-colors">Explore Destinations</a></li>
              <li><a href="#hidden-gems" onClick={() => onSelectTab('Explore')} className="hover:text-sky-400 transition-colors">Hidden Gems Finder</a></li>
              <li><a href="#smart-travel" onClick={() => onSelectTab('Budget')} className="hover:text-sky-400 transition-colors">Smart Budget Manager</a></li>
              <li><a href="#smart-travel" onClick={() => onSelectTab('Safety')} className="hover:text-sky-400 transition-colors">Tourist Safety & SOS</a></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#popular" className="hover:text-sky-400 transition-colors">Kyoto, Japan</a></li>
              <li><a href="#popular" className="hover:text-sky-400 transition-colors">Santorini, Greece</a></li>
              <li><a href="#popular" className="hover:text-sky-400 transition-colors">Banff National Park</a></li>
              <li><a href="#popular" className="hover:text-sky-400 transition-colors">Interlaken, Switzerland</a></li>
              <li><a href="#popular" className="hover:text-sky-400 transition-colors">Ubud, Bali</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Smart Travel Updates
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get weekly low-crowd hidden gem recommendations & weather updates directly to your inbox.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to REEVANA newsletter!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © 2026 REEVANA Platform. Crafting worry-free journeys worldwide.
          </p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-slate-300 transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
