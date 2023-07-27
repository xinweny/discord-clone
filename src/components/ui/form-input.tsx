import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

import { Input, InputProps } from './input';

export type FormInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  id: string;
  label?: string;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
} & Omit<InputProps, 'name' | 'id' | 'ariaLabel'>;

export function FormInput<TFormValues extends FieldValues>({
  className,
  name,
  label,
  id,
  register,
  rules,
  ...props
}: FormInputProps<TFormValues>) {
  return (
    <div className={className} aria-live="polite">
      {label && <label htmlFor={id}>{label.toUpperCase()}</label>}
      <Input
        name={name}
        id={id}
        {...props}
        {...(register && register(name, rules))}
      />
    </div>
  );
}