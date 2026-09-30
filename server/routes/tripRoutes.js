import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enforce authentication on all trip routes (Part 15 Spec: User-Specific Data Security)
router.use(authenticateToken);

// 1. GET /api/trips - Fetch all trips for current authenticated user
router.get('/', (req, res) => {
  const userTrips = db.getUserTrips(req.user.id);
  
  const upcoming = userTrips.filter(t => (t.status || '').toLowerCase() === 'upcoming');
  const past = userTrips.filter(t => (t.status || '').toLowerCase() === 'past' || (t.status || '').toLowerCase() === 'completed');
  const draft = userTrips.filter(t => (t.status || '').toLowerCase() === 'draft' || (t.status || '').toLowerCase() === 'planning');

  res.json({
    allTrips: userTrips,
    upcoming,
    past,
    draft
  });
});

// 2. GET /api/trips/:id - Fetch single trip details
router.get('/:id', (req, res) => {
  const trip = db.getTripById(req.params.id, req.user.id);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found or unauthorized access.' });
  }
  res.json({ trip });
});

// 3. POST /api/trips - Save complete generated trip payload (Part 6 Spec)
router.post('/', (req, res, next) => {
  try {
    const tripPayload = req.body;
    if (!tripPayload.destination) {
      return res.status(400).json({ error: 'Destination is required to save trip.' });
    }

    const savedTrip = db.createTrip(req.user.id, {
      destination: tripPayload.destination,
      startDate: tripPayload.startDate || new Date().toISOString().split('T')[0],
      endDate: tripPayload.endDate || '',
      days: tripPayload.days || 3,
      travelers: tripPayload.travelers || 2,
      budget: Number(tripPayload.userBudget || tripPayload.budget) || 10000,
      estimatedCost: Number(tripPayload.estimatedTotalCost || tripPayload.estimatedCost) || 7200,
      budgetStatus: tripPayload.budgetStatus || 'Within Budget',
      travelType: tripPayload.travelType || 'Friends',
      interests: tripPayload.interests || ['Nature', 'Food'],
      pace: tripPayload.pace || 'Balanced',
      itineraryDays: tripPayload.itineraryDays || [],
      daysList: tripPayload.daysList || tripPayload.days || [],
      places: tripPayload.places || [],
      restaurants: tripPayload.restaurants || [],
      accommodation: tripPayload.accommodation || tripPayload.selectedStay || null,
      transportation: tripPayload.transportation || [],
      weatherNotice: tripPayload.weatherNotice || '',
      costBreakdown: tripPayload.costBreakdown || {},
      status: tripPayload.status || 'Upcoming'
    });

    res.status(201).json({
      message: 'Trip successfully saved to your dashboard!',
      trip: savedTrip
    });
  } catch (err) {
    next(err);
  }
});

// 4. PUT /api/trips/:id - Edit trip (Part 8 Spec)
router.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const existingTrip = db.getTripById(id, req.user.id);
    if (!existingTrip) {
      return res.status(404).json({ error: 'Trip not found or unauthorized access.' });
    }

    const updatePayload = req.body;

    // Recalculate estimated costs & budget status if budget/days modified
    const updatedBudget = Number(updatePayload.budget || existingTrip.budget) || 10000;
    const updatedEstCost = Number(updatePayload.estimatedCost || existingTrip.estimatedCost) || 7200;
    const budgetStatus = updatedEstCost > updatedBudget ? 'Exceeds Budget' : 'Within Budget';

    const updatedTrip = db.updateTrip(id, req.user.id, {
      ...updatePayload,
      budget: updatedBudget,
      estimatedCost: updatedEstCost,
      budgetStatus
    });

    res.json({
      message: 'Trip details successfully updated!',
      trip: updatedTrip
    });
  } catch (err) {
    next(err);
  }
});

// 5. DELETE /api/trips/:id - Delete trip
router.delete('/:id', (req, res) => {
  const success = db.deleteTrip(req.params.id, req.user.id);
  if (!success) {
    return res.status(404).json({ error: 'Trip not found or unauthorized access.' });
  }
  res.json({ message: 'Trip successfully deleted.' });
});

export default router;
