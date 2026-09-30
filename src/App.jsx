import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularDestinations from './components/PopularDestinations';
import SmartTravelFeatures from './components/SmartTravelFeatures';
import HiddenGems from './components/HiddenGems';
import HowItWorks from './components/HowItWorks';
import PlanTripModal from './components/PlanTripModal';
import Footer from './components/Footer';
import Preloader from './components/common/Preloader';

// Pages
import ExplorePage from './pages/ExplorePage';
import TripPlannerPage from './pages/TripPlannerPage';
import BudgetPage from './pages/BudgetPage';
import FoodPage from './pages/FoodPage';
import StaysPage from './pages/StaysPage';
import SafetyPage from './pages/SafetyPage';
import CulturalGuidePage from './pages/CulturalGuidePage';
import DashboardPage from './pages/DashboardPage';
import ReviewsPage from './pages/ReviewsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import SavedPlacesPage from './pages/SavedPlacesPage';
import TripDetailsPage from './pages/TripDetailsPage';

import AiTravelAssistantDrawer from './components/assistant/AiTravelAssistantDrawer';
import { getCurrentUser, logout } from './services/authService';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isPlannerModalOpen, setIsPlannerModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedTripDetails, setSelectedTripDetails] = useState(null);

  // Global Active Trip Context for Gemini AI Assistant
  const [currentTripContext, setCurrentTripContext] = useState({
    destination: 'Mussoorie, Uttarakhand',
    startDate: '2026-10-10',
    days: 3,
    travelers: 2,
    budget: 15000,
    travelType: 'Couple',
    interests: ['Nature', 'Adventure', 'Food', 'Photography'],
    pace: 'Balanced'
  });

  // Load authenticated user profile on application mount
  useEffect(() => {
    getCurrentUser().then(userData => {
      if (userData) {
        setUser(userData);
      }
    }).catch(err => {
      console.log('No active authenticated session:', err);
    });
  }, []);

  const handleOpenPlanner = (dest = '') => {
    if (typeof dest === 'string') {
      setSelectedDestination(dest);
    } else if (dest && dest.name) {
      setSelectedDestination(`${dest.name}, ${dest.country || dest.destinationCity}`);
    }
    setActiveTab('Trip Planner');
  };

  const handleSearchSubmit = (query) => {
    if (query) {
      setSelectedDestination(query);
      setActiveTab('Trip Planner');
    } else {
      setActiveTab('Explore');
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveTab('Dashboard');
  };

  const handleSignUpSuccess = (userData) => {
    setUser(userData);
    setActiveTab('Profile');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setActiveTab('Home');
  };

  const handleViewTripDetails = (trip) => {
    setSelectedTripDetails(trip);
    setActiveTab('TripDetails');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col relative">
      
      {/* Dynamic Navigation Header */}
      <Navbar 
        user={user}
        onLogout={handleLogout}
        onOpenPlanner={() => handleOpenPlanner()} 
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onSelectTab={setActiveTab}
        activeTab={activeTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'Explore' ? (
          <ExplorePage 
            onOpenPlanner={handleOpenPlanner}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        ) : activeTab === 'Trip Planner' ? (
          <TripPlannerPage 
            initialDestination={selectedDestination}
            userPreferences={user?.travelPreferences}
            onUpdateContext={(ctx) => setCurrentTripContext(prev => ({ ...prev, ...ctx }))}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        ) : activeTab === 'Budget' ? (
          <BudgetPage onOpenPlanner={handleOpenPlanner} />
        ) : activeTab === 'Food' ? (
          <FoodPage 
            onAddToTrip={(payload) => {
              setCurrentTripContext(prev => ({
                ...prev,
                selectedRestaurants: [...(prev.selectedRestaurants || []), payload]
              }));
              alert(`Added ${payload.item.name} to Day ${payload.day} (${payload.mealType})!`);
            }}
          />
        ) : activeTab === 'Stays' ? (
          <StaysPage 
            onAddStayToTrip={(payload) => {
              setCurrentTripContext(prev => ({
                ...prev,
                selectedStay: payload.stay,
                stayReservation: payload
              }));
              alert(`Attached ${payload.stay.name} to your trip!`);
            }}
          />
        ) : activeTab === 'Safety' ? (
          <SafetyPage />
        ) : activeTab === 'Culture' ? (
          <CulturalGuidePage />
        ) : activeTab === 'Dashboard' ? (
          <DashboardPage 
            onOpenPlanner={handleOpenPlanner} 
            onViewTrip={handleViewTripDetails}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        ) : activeTab === 'Reviews' ? (
          <ReviewsPage />
        ) : activeTab === 'Login' ? (
          <LoginPage 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignUp={() => setActiveTab('SignUp')}
          />
        ) : activeTab === 'SignUp' ? (
          <SignUpPage 
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToLogin={() => setActiveTab('Login')}
          />
        ) : activeTab === 'Profile' ? (
          <ProfilePage 
            user={user}
            onUpdateProfile={(updatedUser) => setUser(updatedUser)}
            onOpenPlanner={handleOpenPlanner}
          />
        ) : activeTab === 'Saved' ? (
          <SavedPlacesPage 
            onOpenPlanner={handleOpenPlanner}
          />
        ) : activeTab === 'TripDetails' ? (
          <TripDetailsPage 
            trip={selectedTripDetails}
            onBack={() => setActiveTab('Dashboard')}
            onEditTrip={(t) => handleOpenPlanner(t.destination)}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <Hero 
              onSearchSubmit={handleSearchSubmit}
              onOpenPlanner={() => handleOpenPlanner()}
              onOpenAssistant={() => setIsAssistantOpen(true)}
            />

            {/* 2. Popular Destinations Section */}
            <PopularDestinations 
              onSelectDestination={(dest) => {
                handleOpenPlanner(dest);
              }}
            />

            {/* 3. Smart Travel Features Section */}
            <SmartTravelFeatures 
              onOpenPlanner={() => handleOpenPlanner()}
              onOpenAssistant={() => setIsAssistantOpen(true)}
            />

            {/* 4. Hidden Gems Section */}
            <HiddenGems 
              onSelectGem={handleOpenPlanner}
            />

            {/* 5. How REEVANA Works Section */}
            <HowItWorks 
              onOpenPlanner={() => handleOpenPlanner()}
            />
          </>
        )}
      </main>

      {/* Floating Global AI Assistant Launcher Button */}
      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 hover:scale-105 transition-all duration-300 group border border-white/20"
          title="Open REEVANA AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
          </div>
          <span className="hidden sm:inline">Ask AI Assistant</span>
        </button>
      )}

      {/* Footer */}
      <Footer 
        onOpenPlanner={() => handleOpenPlanner()}
        onSelectTab={setActiveTab}
      />

      {/* Interactive Quick Plan Modal */}
      <PlanTripModal 
        isOpen={isPlannerModalOpen}
        onClose={() => setIsPlannerModalOpen(false)}
        initialDestination={selectedDestination}
      />

      {/* AI Travel Assistant Side Drawer */}
      <AiTravelAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        tripContext={currentTripContext}
      />

      {/* Fullscreen Animated Site Preloader */}
      {isLoading && (
        <Preloader onFinish={() => setIsLoading(false)} />
      )}

    </div>
  );
}
