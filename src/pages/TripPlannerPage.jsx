import React, { useState } from 'react';
import TripPlannerForm from '../components/planner/TripPlannerForm';
import GeneratingLoader from '../components/planner/GeneratingLoader';
import ItineraryTimeline from '../components/planner/ItineraryTimeline';
import BudgetSummaryCard from '../components/planner/BudgetSummaryCard';
import WeatherAssistantWidget from '../components/weather/WeatherAssistantWidget';
import TransportAssistantWidget from '../components/transport/TransportAssistantWidget';
import InteractiveMapView from '../components/map/InteractiveMapView';
import OptimizeTripModal from '../components/planner/OptimizeTripModal';
import { generateSmartItinerary } from '../services/aiPlannerService';
import { Sparkles, MapPin, Calendar, Users, IndianRupee, Wallet, RotateCcw, Printer, Bookmark, ArrowLeft, AlertTriangle, CheckCircle2, Info, Zap } from 'lucide-react';

export default function TripPlannerPage({ initialDestination = '', userPreferences = null }) {
  const [plannerState, setPlannerState] = useState('form'); // 'form' | 'loading' | 'result' | 'error'
  const [loadingStatus, setLoadingStatus] = useState('Planning your perfect trip...');
  const [loadingProgress, setLoadingProgress] = useState(20);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOptimizeModalOpen, setIsOptimizeModalOpen] = useState(false);

  const handleFormSubmit = async (formData) => {
    setPlannerState('loading');
    setLoadingProgress(20);
    setErrorMessage('');

    try {
      const itinerary = await generateSmartItinerary(formData, (message, progress) => {
        setLoadingStatus(message);
        setLoadingProgress(progress);
      });

      setGeneratedItinerary(itinerary);
      setPlannerState('result');
    } catch (err) {
      console.error('Failed to generate itinerary', err);
      setErrorMessage(err.message || 'An error occurred while generating your trip itinerary. Please try again.');
      setPlannerState('error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-20 min-h-screen space-y-10">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Gemini AI Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            REEVANA AI Trip Planner
          </h1>

          <p className="text-slate-400 text-sm sm:text-base">
            Intelligent, weather-aware, and budget-matched personalized travel itineraries powered by Google Gemini.
          </p>
        </div>

        {/* 1. Form View State */}
        {plannerState === 'form' && (
          <TripPlannerForm 
            onSubmitForm={handleFormSubmit}
            initialDestination={initialDestination}
            userPreferences={userPreferences}
          />
        )}

        {/* 2. Loading State */}
        {plannerState === 'loading' && (
          <GeneratingLoader 
            currentStatusMessage={loadingStatus}
            progressPercentage={loadingProgress}
          />
        )}

        {/* 3. Error Handling State */}
        {plannerState === 'error' && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-rose-500/30 text-center space-y-5 max-w-xl mx-auto shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-heading">Itinerary Generation Failed</h3>
              <p className="text-sm text-slate-300">
                We encountered an issue connecting to the Gemini AI engine. Please check your inputs or network connection and try again.
              </p>
            </div>
            <button
              onClick={() => setPlannerState('form')}
              className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* 4. Generated Result View State */}
        {plannerState === 'result' && generatedItinerary && (
          <div className="space-y-10 animate-fade-in">
            
            {/* TRIP OVERVIEW CARD */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 space-y-6 shadow-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40">
              
              {/* Header Title & Top Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Trip Overview</span>
                    {generatedItinerary.provider && (
                      <span className="text-[10px] text-sky-300">({generatedItinerary.provider})</span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                    {generatedItinerary.tripTitle || `${Array.isArray(generatedItinerary.days) ? generatedItinerary.days.length : (Array.isArray(generatedItinerary.itineraryDays) ? generatedItinerary.itineraryDays.length : (generatedItinerary.days || 3))}-Day Trip to ${generatedItinerary.destination}`}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {generatedItinerary.summary}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 print:hidden shrink-0">
                  <button
                    onClick={() => setIsOptimizeModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 hover:scale-102 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Optimize My Trip</span>
                  </button>

                  <button
                    onClick={() => setPlannerState('form')}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Edit Input</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-sky-400" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* TRIP OVERVIEW METRICS GRID (6 Standard Requirements) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                
                {/* 1. Destination */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" /> Destination
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {generatedItinerary.destination}
                  </div>
                </div>

                {/* 2. Dates */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Dates / Days
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {Array.isArray(generatedItinerary.days) ? generatedItinerary.days.length : (Array.isArray(generatedItinerary.itineraryDays) ? generatedItinerary.itineraryDays.length : (generatedItinerary.days || 3))} Days {generatedItinerary.startDate ? `(${generatedItinerary.startDate})` : ''}
                  </div>
                </div>

                {/* 3. Travelers */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Travelers
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {generatedItinerary.travelers || 2} ({generatedItinerary.travelType || 'Friends'})
                  </div>
                </div>

                {/* 4. Budget */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-sky-400" /> User Budget
                  </div>
                  <div className="text-sm font-bold text-sky-400 truncate">
                    ₹{(generatedItinerary.userBudget || generatedItinerary.budgetSummary?.userBudget || 10000).toLocaleString('en-IN')} INR
                  </div>
                </div>

                {/* 5. Estimated Total Cost */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" /> Est. Total Cost
                  </div>
                  <div className="text-sm font-bold text-emerald-400 truncate">
                    ₹{(generatedItinerary.estimatedTotalCost || generatedItinerary.budgetSummary?.totalEstimatedCost || 10000).toLocaleString('en-IN')} INR
                  </div>
                </div>

                {/* 6. Budget Status */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Budget Status
                  </div>
                  <div className="text-xs font-bold truncate">
                    {generatedItinerary.budgetStatus === 'Exceeds Budget' ? (
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Exceeds Budget
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Within Budget
                      </span>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Weather Assistant Widget Integration */}
            <WeatherAssistantWidget 
              destinationCity={generatedItinerary.destination}
            />

            {/* Interactive Itinerary Map (Parts 4, 5 & 13 Spec) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-400" />
                  Interactive Itinerary Map & Route Polyline
                </h3>
                <span className="text-xs text-slate-400">
                  Sequential trip route connecting scheduled activities
                </span>
              </div>

              <InteractiveMapView
                routeSequence={Array.isArray(generatedItinerary.days) ? generatedItinerary.days.flatMap(d => d?.activities || []) : (Array.isArray(generatedItinerary.itineraryDays) ? generatedItinerary.itineraryDays.flatMap(d => d?.activities || []) : [])}
                selectedDestination={generatedItinerary.destination}
                height="450px"
              />
            </div>

            {/* Transportation Assistant Widget Integration */}
            <TransportAssistantWidget 
              defaultOrigin={`${generatedItinerary.destination} Station`}
              defaultDestination={generatedItinerary.destination}
            />

            {/* Day-by-Day Timeline */}
            <ItineraryTimeline 
              days={generatedItinerary.days}
              itineraryDays={generatedItinerary.itineraryDays}
              tripTitle={generatedItinerary.tripTitle}
              weatherNotice={generatedItinerary.weatherNotice}
              weatherAdjusted={generatedItinerary.weatherAdjusted}
              selectedStay={generatedItinerary.selectedStay}
              selectedRestaurants={generatedItinerary.selectedRestaurants}
            />

            {/* Visual Budget Breakdown Card */}
            <BudgetSummaryCard 
              costBreakdown={generatedItinerary.costBreakdown}
              estimatedTotalCost={generatedItinerary.estimatedTotalCost}
              userBudget={generatedItinerary.userBudget}
              tips={generatedItinerary.tips}
              budgetStatus={generatedItinerary.budgetStatus}
              budgetSummary={generatedItinerary.budgetSummary}
            />

            {/* Packing Suggestions Section */}
            {generatedItinerary.packingSuggestions && generatedItinerary.packingSuggestions.length > 0 && (
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <h4 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Info className="w-4 h-4 text-sky-400" />
                  Recommended Packing Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {generatedItinerary.packingSuggestions.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Navigation */}
            <div className="text-center pt-4 print:hidden">
              <button
                onClick={() => setPlannerState('form')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Create Another Trip Plan</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Optimize My Trip Modal */}
      <OptimizeTripModal
        isOpen={isOptimizeModalOpen}
        onClose={() => setIsOptimizeModalOpen(false)}
        tripContext={generatedItinerary}
      />

    </div>
  );
}

