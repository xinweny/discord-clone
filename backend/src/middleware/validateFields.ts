import { RequestHandler } from 'express';

import { VALIDATION_RULES } from '@data/validationRules.js';

import { handleValidationErrors } from '@helpers/handleValidationErrors.js';

export const validateFields = (fields: string[], skip = false): RequestHandler[] => {
  const validator = fields.map((fieldName: string | number) => VALIDATION_RULES[fieldName]);

  return skip
    ? validator
    : [
      ...validator,
      handleValidationErrors,
    ];
};