import { useFormContext } from 'react-hook-form';

import styles from './error-message.module.scss';

type ErrorMessageProps = {
  name: string;
  validatedMsg?: string;
  initialMsg?: string;
};

export function ErrorMessage({
  name,
  validatedMsg,
  initialMsg,
}: ErrorMessageProps) {
  const { formState, watch } = useFormContext();

  const value = watch(name);

  const error = formState.errors[name];
  const initialValue = formState.defaultValues ? formState.defaultValues[name] : null;

  const initialComponent = initialMsg
    ? <span className={styles.message}>{initialMsg}</span>
    : null;

  if (value === initialValue || !value) return initialComponent;

  if (validatedMsg && value && !error) return <span className={`${styles.message} ${styles.validated}`}>{validatedMsg}</span>;

  return (value && error)
    ? <span className={`${styles.message} ${styles.error}`}>{error.message as string}</span>
    : initialComponent;
}