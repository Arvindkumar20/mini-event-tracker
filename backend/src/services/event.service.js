import { Event } from '../models/Event.js';
import { makeShareId } from '../utils/shareId.js';

export function getUserEvents(userId, filter) {
  const now = new Date();
  const query = { owner: userId };
  if (filter === 'upcoming') query.dateTime = { $gte: now };
  if (filter === 'past') query.dateTime = { $lt: now };
  return Event.find(query).sort({ dateTime: 1 });
}

export function createEvent(userId, data) {
  return Event.create({ ...data, owner: userId });
}

export async function updateEvent(userId, id, data) {
  const ev = await Event.findOneAndUpdate({ _id: id, owner: userId }, data, { new: true });
  if (!ev) throw { status: 404, message: 'Event not found' };
  return ev;
}

export async function deleteEvent(userId, id) {
  const ev = await Event.findOneAndDelete({ _id: id, owner: userId });
  if (!ev) throw { status: 404, message: 'Event not found' };
  return ev;
}

export async function toggleShare(userId, id, isPublic) {
  const updates = { isPublic };
  if (isPublic) updates.shareId = updates.shareId ?? makeShareId();
  else updates.shareId = undefined;
  const ev = await Event.findOneAndUpdate({ _id: id, owner: userId }, updates, { new: true });
  if (!ev) throw { status: 404, message: 'Event not found' };
  return ev;
}

export function getByShareId(shareId) {
  return Event.findOne({ shareId, isPublic: true }).lean();
}