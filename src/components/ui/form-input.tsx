import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

import { Input, InputProps } from './input';

export type FormInputProps<
  TFormValues extends FieldValues,
  TRef
> = {
  name: Path<TFormValues>;
  id: string;
  label?: string;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  innerRef?: React.RefObject<TRef>;
} & Omit<InputProps, 'name' | 'id' | 'ariaLabel'>;

export function FormInput<TFormValues extends FieldValues, TRef>({
  className,
  name,
  label,
  id,
  register,
  rules,
  innerRef,
  ...props
}: FormInputProps<TFormValues, TRef>) {
  return (
    <div className={className} aria-live="polite">
      {label && <label htmlFor={id}>{label.toUpperCase()}</label>}
      <Input
        ref={innerRef}
        name={name}
        id={id}
        {...props}
        {...(register && register(name, rules))}
      />
    </div>
  );
}