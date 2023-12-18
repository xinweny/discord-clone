import { useFormContext } from 'react-hook-form';

import styles from './form-group.module.scss';

type FormGroupProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  showError?: boolean;
  required?: boolean;
  name?: string;
};

export function FormGroup({
  label,
  htmlFor,
  name,
  required = false,
  children,
}: FormGroupProps) {
  const { formState } = useFormContext();

  const error = name ? formState.errors[name] : undefined;

  return (
    <div>
      <label htmlFor={htmlFor} className={styles.error}>
        {name && error
          ? `${label.toUpperCase()} - ${error.message}`
          : `${label.toUpperCase()} ${required ? '*' : ''}`
        }
      </label>
      {children}
    </div>
  );
}