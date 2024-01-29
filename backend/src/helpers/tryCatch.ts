import { Request, Response, NextFunction, RequestHandler } from 'express';

import env from '@config/env';

type MiddlewareWrapperType = (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => RequestHandler;

export const tryCatch: MiddlewareWrapperType = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    if (env.NODE_ENV === 'development') console.error(err);
    return next(err);
  }
};