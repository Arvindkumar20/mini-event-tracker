import { z } from 'zod';

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(120),
    dateTime: z.string().datetime(),
    location: z.string().min(1).max(160),
    description: z.string().max(2000).optional()
  })
});

export const updateEventSchema = z.object({
  params: z.object({ id: z.string().length(24) }),
  body: z.object({
    title: z.string().min(1).max(120).optional(),
    dateTime: z.string().datetime().optional(),
    location: z.string().min(1).max(160).optional(),
    description: z.string().max(2000).optional(),
    isPublic: z.boolean().optional()
  })
});

export const eventIdParam = z.object({
  params: z.object({ id: z.string().length(24) })
});