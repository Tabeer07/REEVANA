import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/aiRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import savedRoutes from './routes/savedRoutes.js';
import recentlyViewedRoutes from './routes/recentlyViewedRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(cors());
app.use(express.json());

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'REEVANA AI Backend Server',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY')
  });
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// User Trips Routes (Protected)
app.use('/api/trips', tripRoutes);

// Saved Places Routes (Protected)
app.use('/api/saved', savedRoutes);

// Recently Viewed Routes (Protected)
app.use('/api/recently-viewed', recentlyViewedRoutes);

// AI Routes
app.use('/api/ai', aiRoutes);

// Weather Routes
app.use('/api/weather', weatherRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  // SECURITY: Never print environment variables or secrets
  const safeMessage = err.message ? err.message.replace(/key=[^&]+/gi, 'key=HIDDEN') : 'Internal Server Error';
  console.error('[Express App Error]:', safeMessage);
  res.status(500).json({ error: safeMessage || 'Server internal error occurred.' });
});

app.listen(PORT, () => {
  console.log(`🚀 REEVANA Express Backend Server running on http://localhost:${PORT}`);
  console.log(`🔑 Gemini API Key status: ${process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY' ? 'Configured' : 'Missing or Placeholder'}`);
});
