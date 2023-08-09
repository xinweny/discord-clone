import type { FieldError } from 'react-hook-form';

type ErrorMessageProps = {
  error?: FieldError
};

export function ErrorMessage({
  error,
}: ErrorMessageProps) {
  return (error)
    ? <p>{error.message}</p>
    : null;
}