import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import '../types/Request';

import env from '@config/env';
import '@config/db';
import { apiRateLimiter } from '@config/rateLimit';

import { errorHandler } from '@middleware/errorHandler';

import { apiRouter } from '@api/router';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(apiRateLimiter);

// ROUTES
app.use('/api/v1', apiRouter);

// ERROR HANDLING
app.use('*', (req, res) => res.status(404).json({ message: 'Resource not found.' }));
app.use(errorHandler);

export { app }; 