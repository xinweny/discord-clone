import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

type RadioInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  value: any;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
} & Omit<InputProps, 'name' | 'type' | 'value'>;

export function RadioInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  value,
  register,
  ...props
}: RadioInputProps<TFormValues>) {
  return (
    <div className={className} aria-live="polite">
      <Input
        type="radio"
        id={id}
        name={name}
        value={value}
        {...props}
        {...(register && register(name))}
      />
    </div>
  );
}