import { ErrorResponse } from '@types';

type ErrorCond = {
  status: number;
  message: string;
};

export const handleServerError = async (
  error: unknown,
  cond: ErrorCond,
  handler: (() => any) | (() => Promise<any>),
) => {
  const err = error as ErrorResponse;

  if (
    err.status === cond.status &&
    (cond.message && err.data.message.includes(cond.message))
  ) await handler();
};
