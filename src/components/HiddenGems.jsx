import React from 'react';
import { Compass, Users, Sparkles, MapPin, DollarSign, Star, Bookmark, Check } from 'lucide-react';
import { HIDDEN_GEMS } from '../data/mockData';

export default function HiddenGems({ onSelectGem }) {
  const [bookmarkedGems, setBookmarkedGems] = React.useState({});

  const toggleBookmark = (id) => {
    setBookmarkedGems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="hidden-gems" className="py-20 relative bg-slate-950/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Escape The Tourist Traps</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Uncover Hidden Gems
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Hand-curated quiet sanctuaries, serene mountain retreats, and lesser-known historical spots monitored for low crowd density.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Real-time Crowd Monitoring Active</span>
          </div>
        </div>

        {/* Hidden Gems Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HIDDEN_GEMS.map((gem) => {
            const isBookmarked = bookmarkedGems[gem.id];
            return (
              <div 
                key={gem.id}
                className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 group flex flex-col sm:flex-row"
              >
                {/* Image Container */}
                <div className="relative sm:w-1/2 h-64 sm:h-auto overflow-hidden">
                  <img 
                    src={gem.image} 
                    alt={gem.name} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent sm:hidden"></div>

                  {/* Crowd Level Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>{gem.crowdLevel} Crowd</span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(gem.id)}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all ${
                      isBookmarked 
                        ? 'bg-emerald-500 text-white border-emerald-400' 
                        : 'bg-slate-950/70 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                    title={isBookmarked ? 'Saved to Bookmarks' : 'Save Hidden Gem'}
                  >
                    {isBookmarked ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                        {gem.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-300 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{gem.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                      {gem.name}, <span className="text-slate-400 font-normal">{gem.country}</span>
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      {gem.description}
                    </p>
                  </div>

                  {/* Highlight Banner */}
                  <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[10px] text-emerald-400 uppercase tracking-wider">Secret Highlight</span>
                      <span>{gem.highlight}</span>
                    </div>
                  </div>

                  {/* Bottom Stats & Button */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-400">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-slate-300 font-semibold">{gem.avgBudget}</span>
                    </div>

                    <button
                      onClick={() => onSelectGem ? onSelectGem(gem) : alert(`Viewing details for hidden gem: ${gem.name}`)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-800 text-xs font-semibold transition-all"
                    >
                      View Hidden Gem
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
