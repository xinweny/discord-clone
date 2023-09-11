import { ErrorResponse } from '@types';

type ErrorCond = {
  status: number;
  message: string;
};

export const handleServerError = (
  error: unknown,
  cond: ErrorCond,
  handler: () => any,
) => {
  const err = error as ErrorResponse;

  if (err.status === cond.status && err.data.message.includes(cond.message)) handler();
};

export const handleServerErrorAsync = async (
  error: unknown,
  cond: ErrorCond,
  handler: () => Promise<any>,
) => {
  const err = error as ErrorResponse;

  if (err.status === cond.status && err.data.message.includes(cond.message)) await handler();
};