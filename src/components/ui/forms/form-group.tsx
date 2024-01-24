import { useFormContext } from 'react-hook-form';

import { Separator } from '../displays';

import styles from './form-group.module.scss';

type FormGroupProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  showError?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
  withSeparator?: boolean;
};

export function FormGroup({
  label,
  htmlFor,
  name,
  required = false,
  children,
  className,
  withSeparator = false,
}: FormGroupProps) {
  const { formState } = useFormContext();

  const error = name ? formState.errors[name] : undefined;

  return (
    <>
      <div className={`${styles.group} ${className || ''}`}>
        <label htmlFor={htmlFor} className={error && styles.error}>
          <h2 className={styles.label}>{label.toUpperCase()}</h2>
          {required && (
            <span className={styles.required}>*</span>
          )}
          {name && error && (
            <span className={styles.errorMessage}>
              {` - ${error.message}`}
            </span>
          )}
        </label>
        {children}
      </div>
      {withSeparator && <Separator className={styles.separator} />}
    </>
  );
}