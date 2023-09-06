import { useFormContext } from 'react-hook-form';

type SubmittedMessageProps = {
  name: string;
  successMsg: string;
};

export function SubmittedMessage({
  name,
  successMsg,
}: SubmittedMessageProps) {
  const { formState } = useFormContext();
  const { isSubmitSuccessful, isDirty } = formState;

  const error = formState.errors[name];

  if (isSubmitSuccessful && !isDirty) return <p>{successMsg}</p>;

  if (error) return <p>{error.message as string}</p>

  return null;
}