import React, { useState } from 'react';
import MonumentSelector from '../components/culture/MonumentSelector';
import MonumentDetailsView from '../components/culture/MonumentDetailsView';
import CulturalAIChatWidget from '../components/culture/CulturalAIChatWidget';
import { MONUMENTS_DATA } from '../data/culturalGuideData';
import { Landmark, Sparkles, BookOpen } from 'lucide-react';

export default function CulturalGuidePage() {
  const [selectedMonument, setSelectedMonument] = useState(MONUMENTS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>Smart Heritage & History Explorer</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              AI Cultural Guide
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Explore deep histories, cultural significance, hidden legends, and ask our AI guide interactive questions about world heritage monuments.
            </p>
          </div>
        </div>

        {/* 1. Monument Search & Selector */}
        <MonumentSelector
          selectedMonumentId={selectedMonument.id}
          onSelectMonument={setSelectedMonument}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 2. Monument Details Display */}
        <MonumentDetailsView monument={selectedMonument} />

        {/* 3. Interactive "Ask AI About This Place" Chat Widget */}
        <CulturalAIChatWidget key={selectedMonument.id} monument={selectedMonument} />

      </div>

    </div>
  );
}
