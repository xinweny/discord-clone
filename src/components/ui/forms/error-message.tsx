import { useFormContext } from 'react-hook-form';

type ErrorMessageProps = {
  name: string;
  validatedMsg?: string;
};

export function ErrorMessage({
  name,
  validatedMsg,
}: ErrorMessageProps) {
  const { formState, watch } = useFormContext();

  const value = watch(name);

  const error = formState.errors[name];

  if (validatedMsg && value && !error) return <p>{validatedMsg}</p>;

  return (value && error)
    ? <p>{error.message as string}</p>
    : null;
}