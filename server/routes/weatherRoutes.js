import express from 'express';
import { fetchWeatherForDestination } from '../services/weatherService.js';

const router = express.Router();

// GET /api/weather?city=Mussoorie&lat=30.4598&lng=78.0644
router.get('/', async (req, res) => {
  try {
    const { city = 'Mussoorie', lat, lng } = req.query;
    const weatherData = await fetchWeatherForDestination(city, lat, lng);
    res.status(200).json(weatherData);
  } catch (error) {
    console.error('[Weather Route Error]:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather metrics.' });
  }
});

export default router;
