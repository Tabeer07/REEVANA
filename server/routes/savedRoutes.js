import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enforce authentication on all saved routes (Part 15 Spec: User-Specific Data Security)
router.use(authenticateToken);

// 1. GET /api/saved - Fetch all saved items for current user (Part 10 & 11 Specs)
router.get('/', (req, res) => {
  const category = req.query.category || 'All';
  const savedItems = db.getUserSavedItems(req.user.id, category);

  const placesCount = savedItems.filter(i => (i.itemType || '').toLowerCase() === 'place').length;
  const restaurantsCount = savedItems.filter(i => (i.itemType || '').toLowerCase() === 'restaurant').length;
  const hotelsCount = savedItems.filter(i => (i.itemType || '').toLowerCase() === 'hotel' || (i.itemType || '').toLowerCase() === 'stay').length;
  const activitiesCount = savedItems.filter(i => (i.itemType || '').toLowerCase() === 'activity').length;

  res.json({
    savedItems,
    counts: {
      total: savedItems.length,
      places: placesCount,
      restaurants: restaurantsCount,
      hotels: hotelsCount,
      activities: activitiesCount
    }
  });
});

// 2. POST /api/saved - Save place / restaurant / hotel to user account (Part 10 Spec)
router.post('/', (req, res, next) => {
  try {
    const itemPayload = req.body;
    if (!itemPayload.name) {
      return res.status(400).json({ error: 'Item name is required.' });
    }

    const savedItem = db.saveItem(req.user.id, {
      targetId: itemPayload.targetId || itemPayload.id || `item_${Date.now()}`,
      itemType: itemPayload.itemType || 'place',
      name: itemPayload.name,
      city: itemPayload.city || itemPayload.destinationCity || 'Mussoorie',
      image: itemPayload.image || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80',
      rating: itemPayload.rating || 4.8,
      reviewsCount: itemPayload.reviewsCount || 120,
      price: itemPayload.price || itemPayload.priceRange || '₹₹',
      category: itemPayload.category || itemPayload.type || 'Attraction',
      googlePlaceId: itemPayload.googlePlaceId || itemPayload.place_id || null,
      address: itemPayload.address || '',
      lat: itemPayload.lat || null,
      lng: itemPayload.lng || null
    });

    res.status(201).json({
      message: 'Item saved to your bookmarks!',
      savedItem
    });
  } catch (err) {
    next(err);
  }
});

// 3. DELETE /api/saved/:id - Remove saved item
router.delete('/:id', (req, res) => {
  const success = db.deleteSavedItem(req.params.id, req.user.id);
  if (!success) {
    return res.status(404).json({ error: 'Saved item not found or unauthorized access.' });
  }
  res.json({ message: 'Item removed from your saved places.' });
});

// 4. POST /api/saved/:id/add-to-trip - Add saved item to trip (Part 12 Spec)
router.post('/:id/add-to-trip', (req, res, next) => {
  try {
    const { id } = req.params;
    const { tripId, day, time } = req.body;

    const savedItems = db.getUserSavedItems(req.user.id);
    const item = savedItems.find(s => s.id === id);

    if (!item) {
      return res.status(404).json({ error: 'Saved item not found.' });
    }

    const trip = db.getTripById(tripId, req.user.id);
    if (!trip) {
      return res.status(404).json({ error: 'Selected trip not found.' });
    }

    // Attach activity to specified trip day
    const updatedDays = (trip.daysList || trip.days || []).map(d => {
      if (Number(d.day) === Number(day) || Number(d.dayNumber) === Number(day)) {
        return {
          ...d,
          activities: [
            ...(d.activities || []),
            {
              time: time || '02:00 PM',
              place: item.name,
              activity: item.name,
              description: `Visit ${item.name} (${item.category || item.itemType}).`,
              estimatedCost: item.price || '₹300',
              category: item.itemType || 'Attraction'
            }
          ]
        };
      }
      return d;
    });

    const updatedTrip = db.updateTrip(tripId, req.user.id, {
      daysList: updatedDays,
      days: updatedDays
    });

    res.json({
      message: `${item.name} added to Day ${day} of ${trip.destination} trip!`,
      trip: updatedTrip
    });
  } catch (err) {
    next(err);
  }
});

export default router;
