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
    <div className={styles.group}>
      <label htmlFor={htmlFor}>
        <span className={styles.label}>{label.toUpperCase()}</span>
        <span>
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