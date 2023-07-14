import { RequestHandler } from 'express';

import { VALIDATION_RULES } from '@data';

import { handleValidationErrors } from '@helpers';

export const validateFields = (fields: string[]): RequestHandler[] => {
  const validator = fields.map((fieldName: string | number) => VALIDATION_RULES[fieldName]);

  return [
    ...validator,
    handleValidationErrors,
  ];
}