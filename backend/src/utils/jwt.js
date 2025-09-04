import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signJwt(payload) {
  if (!payload || typeof payload !== 'object' || Object.keys(payload).length === 0) {
    throw new Error('Invalid payload: must be a non-empty object');
  }

  if (!env.JWT_SECRET || typeof env.JWT_SECRET !== 'string') {
    throw new Error('JWT_SECRET must be a valid string');
  }

  if (!env.JWT_EXPIRES_IN || typeof env.JWT_EXPIRES_IN !== 'string') {
    throw new Error('JWT_EXPIRES_IN must be a valid string');
  }

  try {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  } catch (error) {
    throw new Error(`JWT signing failed: ${error.message}`);
  }
}

export function verifyJwt(token) {
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a valid string');
  }

  if (!env.JWT_SECRET || typeof env.JWT_SECRET !== 'string') {
    throw new Error('JWT_SECRET must be a valid string');
  }

  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new Error(`JWT verification failed: ${error.message}`);
  }
}