import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Calendar, Wallet, Utensils, Hotel, ShieldAlert, User, Menu, X, Sparkles, Languages, Landmark, Star, Bookmark, LogIn, UserPlus, LogOut } from 'lucide-react';
import LanguageAssistantModal from './language/LanguageAssistantModal';

export default function Navbar({ onOpenPlanner, onSelectTab, activeTab = 'Home', onOpenAssistant, user, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', icon: Compass, href: '#home' },
    { name: 'Explore', icon: MapPin, href: '#popular' },
    { name: 'Trip Planner', icon: Calendar, href: '#planner' },
    { name: 'Budget', icon: Wallet, href: '#smart-travel' },
    { name: 'Food', icon: Utensils, href: '#popular' },
    { name: 'Stays', icon: Hotel, href: '#popular' },
    { name: 'Safety', icon: ShieldAlert, href: '#smart-travel' },
    { name: 'Culture', icon: Landmark, href: '#popular' },
    { name: 'Reviews', icon: Star, href: '#reviews' }
  ];

  const handleNavClick = (linkName, href) => {
    onSelectTab(linkName);
    setMobileMenuOpen(false);
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 shadow-xl shadow-slate-950/50' : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5'
      }`}>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Brand Logo */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('Home', '#home');
              }}
              className="flex items-center gap-2 group focus:outline-none shrink-0"
            >
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 via-blue-600 to-amber-400 p-[2px] shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img 
                  src="/reevana-logo.jpg" 
                  alt="ReeVANA Logo" 
                  className="w-full h-full object-cover rounded-full group-hover:rotate-6 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1 font-heading whitespace-nowrap">
                  REE<span className="text-sky-400">VANA</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                </span>
                <span className="text-[9px] tracking-widest text-slate-400 uppercase font-medium whitespace-nowrap">Smart Travel Co.</span>
              </div>
            </a>

            {/* Desktop Navigation Links (All 9 Core Pages) */}
            <nav className="hidden xl:flex items-center gap-0.5 bg-slate-900/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-slate-800/80 shadow-inner">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.name;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.name, link.href)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                      isActive 
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 font-semibold' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons & Profile Header Right */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              
              {/* AI Travel Assistant Trigger */}
              <button
                onClick={onOpenAssistant}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-500/40 hover:border-indigo-400 text-indigo-200 hover:text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/10 group whitespace-nowrap"
                title="Open REEVANA AI Assistant"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>AI Assistant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>

              {/* Language Assistant Trigger */}
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-all shadow-md whitespace-nowrap"
                title="Tourist Language Assistant"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>Translate</span>
              </button>

              {/* Dynamic Auth Section */}
              {user ? (
                <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
                  
                  {/* Saved Places */}
                  <button
                    onClick={() => onSelectTab('Saved')}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'Saved' 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                    title="Saved Places & Bookmarks"
                  >
                    <Bookmark className="w-4 h-4 text-amber-400" />
                  </button>

                  {/* User Dashboard / Profile Button */}
                  <button 
                    onClick={() => onSelectTab('Dashboard')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === 'Dashboard' || activeTab === 'Profile'
                        ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20' 
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700'
                    }`}
                    title={`Logged in as ${user.name || user.email}`}
                  >
                    <User className="w-3.5 h-3.5 text-sky-400" />
                    <span className="max-w-[100px] truncate">{user.name || user.email.split('@')[0]}</span>
                  </button>

                  {/* Profile Edit Quick Link */}
                  <button
                    onClick={() => onSelectTab('Profile')}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      activeTab === 'Profile'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="Profile & Travel Preferences"
                  >
                    <User className="w-4 h-4 text-purple-400" />
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-800/60 text-slate-400 hover:text-rose-400 transition-all"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>

                </div>
              ) : (
                <div className="flex items-center gap-2 border-l border-slate-800 pl-2">
                  <button
                    onClick={() => onSelectTab('Login')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'Login'
                        ? 'bg-sky-500 text-white border-sky-400'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5 text-sky-400" />
                    <span>Sign In</span>
                  </button>

                  <button
                    onClick={() => onSelectTab('SignUp')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 font-extrabold text-xs shadow-md hover:scale-102 transition-all whitespace-nowrap"
                  >
                    <UserPlus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}

            </div>

            {/* Mobile Menu Trigger */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                onClick={onOpenAssistant}
                className="p-2 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-800/60"
                title="AI Assistant"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
              </button>
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800"
              >
                <Languages className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden glass-panel border-t border-slate-800/80 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.name;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.name, link.href)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      isActive ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-sky-400" />
                    {link.name}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Logged in as</span>
                      <span className="font-bold text-white">{user.name || user.email}</span>
                    </div>
                    <button
                      onClick={onLogout}
                      className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 text-[11px]"
                    >
                      Logout
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onSelectTab('Dashboard');
                      }}
                      className="py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold text-center"
                    >
                      My Trips
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onSelectTab('Saved');
                      }}
                      className="py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold text-center"
                    >
                      Saved
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onSelectTab('Profile');
                      }}
                      className="py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold text-center"
                    >
                      Profile
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectTab('Login');
                    }}
                    className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4 text-sky-400" />
                    Sign In
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectTab('SignUp');
                    }}
                    className="py-2.5 rounded-xl bg-sky-500 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssistant && onOpenAssistant();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Ask REEVANA AI Assistant
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Language Assistant Overlay Modal */}
      <LanguageAssistantModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />
    </>
  );
}
