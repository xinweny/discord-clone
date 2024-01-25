import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 60000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});