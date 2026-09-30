import express from 'express';
import { generateTripItinerary, chatWithAssistant } from '../services/geminiService.js';

const router = express.Router();

/**
 * @route   POST /api/ai/plan-trip
 * @desc    Generate structured travel itinerary using Gemini AI
 * @access  Public
 */
router.post('/plan-trip', async (req, res) => {
  try {
    const { destination, days } = req.body;

    if (!destination || !days) {
      return res.status(400).json({
        error: 'Missing required parameters: destination and days are required.'
      });
    }

    const itinerary = await generateTripItinerary(req.body);
    return res.status(200).json(itinerary);
  } catch (error) {
    const safeError = error.message ? error.message.replace(/key=[^&]+/gi, 'key=HIDDEN') : 'Internal Server Error';
    console.error('[AI Routes Error]:', safeError);
    
    return res.status(500).json({
      error: 'Failed to generate itinerary. Please try again later.',
      details: safeError
    });
  }
});

/**
 * @route   POST /api/ai/chat
 * @desc    Contextual AI Travel Assistant Chat powered by Gemini
 * @access  Public
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, history, tripContext } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const response = await chatWithAssistant({ message, history, tripContext });
    return res.status(200).json(response);
  } catch (error) {
    const safeError = error.message ? error.message.replace(/key=[^&]+/gi, 'key=HIDDEN') : 'Internal Server Error';
    console.error('[AI Chat Route Error]:', safeError);

    return res.status(500).json({
      error: 'Travel Assistant is temporarily unavailable. Please try again.',
      details: safeError
    });
  }
});


// 3. Budget Optimization
router.post('/budget-optimize', async (req, res) => {
  res.status(501).json({ message: 'Budget Optimization feature coming soon in next milestone.' });
});

// 4. Weather-aware Travel Recommendations
router.post('/weather-recommend', async (req, res) => {
  res.status(501).json({ message: 'Weather Recommendations feature coming soon in next milestone.' });
});

// 5. Destination Recommendations
router.post('/destination-recommend', async (req, res) => {
  res.status(501).json({ message: 'Destination Recommendations feature coming soon in next milestone.' });
});

// 6. Cultural/Monument Information
router.post('/cultural-info', async (req, res) => {
  res.status(501).json({ message: 'Cultural Information feature coming soon in next milestone.' });
});

// 7. Review Summarization
router.post('/summarize-reviews', async (req, res) => {
  res.status(501).json({ message: 'Review Summarization feature coming soon in next milestone.' });
});

export default router;
