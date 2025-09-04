import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { login, register } from '../services/auth.service.js';
import { env } from '../config/env.js';

const router = Router();

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.COOKIE_SECURE,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await register(email, password);
    setAuthCookie(res, token);
    res.status(201).json({ user: { id: user._id, email: user.email } });
  } catch (e) { next(e); }
});

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    setAuthCookie(res, token);
    res.json({ user: { id: user._id, email: user.email } });
  } catch (e) { next(e); }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(204).end();
});

router.get('/me', (req, res) => {
  const t = req.cookies?.token;
  if (!t) return res.status(200).json({ user: null });
  res.status(200).json({ user: true });
});

export default router;