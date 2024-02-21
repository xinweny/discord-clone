import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import '../types/Request.js';

import env from '@config/env.js';
import '@config/db.js';

import { errorHandler } from '@middleware/errorHandler.js';

import { apiRouter } from '@api/router.js';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.raw({ type: 'application/webhook+json' }));

app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(rateLimit({
  windowMs: 60000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
}));

// ROUTES
app.use('/api/v1', apiRouter);

// ERROR HANDLING
app.use('*', (req, res) => res.status(404).json({ message: 'Resource not found.' }));
app.use(errorHandler);

export { app }; 