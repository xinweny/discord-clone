import { useFormContext } from 'react-hook-form';

import styles from './form-group.module.scss';

type FormGroupProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  showError?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
};

export function FormGroup({
  label,
  htmlFor,
  name,
  required = false,
  children,
  className,
}: FormGroupProps) {
  const { formState } = useFormContext();

  const error = name ? formState.errors[name] : undefined;

  return (
    <div className={`${styles.group} ${className || ''}`}>
      <label htmlFor={htmlFor} className={error && styles.error}>
        <h2 className={styles.label}>{label.toUpperCase()}</h2>
        <span className={styles.errorMessage}>
          {name && error
            ? ` - ${error.message}`
            : `${required ? '*' : ''}`
          }
        </span>
      </label>
      {children}
    </div>
  );
}