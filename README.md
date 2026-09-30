# REEVANA — Smart Tourism & AI Travel Platform

![REEVANA Logo](/public/reevana-logo.jpg)

> **Explore More. Worry Less.**  
> REEVANA is an all-in-one smart tourism platform integrating Google Gemini AI trip planning, real-time weather advisories, interactive Leaflet route maps, smart budget tracking, hidden gem discovery, local transit estimations, and tourist safety SOS.

---

## ✨ Features

- 🌌 **Animated ReeVANA Preloader & Branding**: Interactive site preloader with rotating compass rings, radar scan beam, orbiting aircraft, and official emblem.
- 🤖 **Google Gemini AI Trip Planner**: Generates personalized, weather-aware, pace-matched multi-day itineraries tailored to budget and interests.
- 🗺️ **Interactive Leaflet Route Maps**: Interactive satellite & map views rendering sequential itinerary polylines and clickable destination pins.
- 💰 **INR Smart Budget Manager**: Instant Indian Rupee (₹) cost calculations across stays, food, transport, and activities with optimization tips.
- 🌤️ **Live Weather & Advisories**: Multi-day destination forecasts, temperature metrics, and rain-smart activity adjustments.
- 💬 **24/7 AI Travel Assistant Concierge**: Side-drawer AI assistant capable of answering transit, budget, and local query prompts.
- 💎 **Hidden Gems & Cultural Guide**: Low-crowd destination finder and interactive historical monument guide.
- 🔐 **Authentication & User Dashboard**: Secure JWT user sessions, saved bookmarks, profile preference sync, and trip history.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 8, TailwindCSS v4, Lucide React Icons
- **Mapping**: Leaflet.js
- **Backend Server**: Node.js, Express 5
- **AI Engine**: Google GenAI SDK (`@google/genai`) / Gemini API
- **Database & Auth**: File-system JSON Database, bcryptjs, JSON Web Tokens (JWT)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tabeer07/REEVANA.git
   cd REEVANA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   JWT_SECRET=reevana_super_secret_jwt_key_2026
   ```

4. Start Development Mode:
   ```bash
   npm run dev
   ```

5. Build for Production:
   ```bash
   npm run build
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
