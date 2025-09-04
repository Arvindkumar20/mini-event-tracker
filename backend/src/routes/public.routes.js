import { Router } from 'express';
import { Event } from '../models/Event.js';

const router = Router();

router.get('/e/:shareId', async (req, res) => {
  const ev = await Event.findOne({ shareId: req.params.shareId, isPublic: true })
    .select('title dateTime location description shareId')
    .lean();
  if (!ev) return res.status(404).json({ message: 'Event not found or not public' });
  res.json({ event: ev });
});

export default router;