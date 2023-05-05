import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import tryCatch from '../middleware/tryCatch';
import CustomError from '../helpers/CustomError';

const handleValidationErrors: RequestHandler = tryCatch(
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new CustomError(
        400,
        'Validation failed.',
        errors.array()
      );
    }

    next();
  }
);

export default handleValidationErrors;