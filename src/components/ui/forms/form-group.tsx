import { useFormContext } from 'react-hook-form';

type FormGroupProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  showError?: boolean;
  required?: boolean;
};

export function FormGroup({
  label,
  htmlFor,
  showError = false,
  required = false,
  children,
}: FormGroupProps) {
  const { formState } = useFormContext();

  const error = htmlFor ? formState.errors[htmlFor] : undefined;

  return (
    <div>
      <label htmlFor={htmlFor}>
        {showError && error
          ? `${label.toUpperCase()} - ${error.message}`
          : `${label.toUpperCase()} ${required ? '*' : ''}`
        }
      </label>
      {children}
    </div>
  );
}