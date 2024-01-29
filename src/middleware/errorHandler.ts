import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errObj = {
    ...(err.error && { data: err.error }),
    message: err.message,
  };
  const statusCode = err.statusCode || 500;

  res.status(statusCode);
  res.json(errObj);
};