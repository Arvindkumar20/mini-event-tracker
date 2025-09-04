import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(8).max(72)
  })
});

export const loginSchema = registerSchema;