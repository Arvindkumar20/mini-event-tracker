import { User } from '../models/User.js';
import { signJwt } from '../utils/jwt.js';

export async function register(email, password) {
  const exists = await User.findOne({ email });
  if (exists) throw { status: 409, message: 'Email already in use' };
  const user = await User.create({ email, password });
  const token = signJwt({ userId: user._id.toString(), email: user.email });
  return { user, token };
}

export async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const token = signJwt({ userId: user._id.toString(), email: user.email });
  return { user, token };
}