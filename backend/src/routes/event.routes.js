import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createEventSchema, updateEventSchema, eventIdParam } from '../schemas/event.schema.js';
import { createEvent, deleteEvent, getUserEvents, toggleShare, updateEvent } from '../services/event.service.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.filter === 'upcoming' || req.query.filter === 'past' ? req.query.filter : undefined;
    const events = await getUserEvents(req.user.userId, filter);
    res.json({ events });
  } catch (e) { next(e); }
});

router.post('/', validate(createEventSchema), async (req, res, next) => {
  try {
    const event = await createEvent(req.user.userId, req.body);
    res.status(201).json({ event });
  } catch (e) { next(e); }
});

router.patch('/:id', validate(updateEventSchema), async (req, res, next) => {
  try {
    const event = await updateEvent(req.user.userId, req.params.id, req.body);
    res.json({ event });
  } catch (e) { next(e); }
});

router.delete('/:id', validate(eventIdParam), async (req, res, next) => {
  try {
    await deleteEvent(req.user.userId, req.params.id);
    res.status(204).end();
  } catch (e) { next(e); }
});

router.post('/:id/share', validate(eventIdParam), async (req, res, next) => {
  try {
    const isPublic = Boolean(req.body.isPublic);
    const event = await toggleShare(req.user.userId, req.params.id, isPublic);
    res.json({ event });
  } catch (e) { next(e); }
});

export default router;