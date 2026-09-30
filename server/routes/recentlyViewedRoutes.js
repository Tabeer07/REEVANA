import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// GET /api/recently-viewed
router.get('/', (req, res) => {
  const items = db.getUserRecentlyViewed(req.user.id, 10);
  res.json({ recentlyViewed: items });
});

// POST /api/recently-viewed
router.post('/', (req, res) => {
  const { itemData } = req.body;
  if (!itemData || !itemData.name) {
    return res.status(400).json({ error: 'Item data is required.' });
  }

  const recorded = db.recordRecentlyViewed(req.user.id, itemData);
  res.status(201).json({ recorded });
});

export default router;
