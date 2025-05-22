import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Temporary route for testing
router.get('/', protect, (req, res) => {
  res.json({ message: 'Fee routes working' });
});

export default router; 