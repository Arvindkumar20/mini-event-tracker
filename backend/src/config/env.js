import 'dotenv/config';

export const env = {
    PORT: process.env.PORT || '5000',
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    COOKIE_SECURE: process.env.COOKIE_SECURE === 'true'
};
