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

  const error = formState.errors[name];

  if (formState.isSubmitSuccessful) return <p>{successMsg}</p>;

  if (error) return <p>{error.message as string}</p>

  return null;
}