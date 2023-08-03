import { useFormContext } from 'react-hook-form';

import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

type RadioInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  value: any;
  rules?: RegisterOptions;
} & Omit<InputProps, 'name' | 'type' | 'value'>;

export function RadioInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  value,
  ...props
}: RadioInputProps<TFormValues>) {
  const { register } = useFormContext();

  return (
    <div className={className} aria-live="polite">
      <Input
        type="radio"
        id={id}
        value={value}
        {...props}
        {...(register && register(name))}
      />
    </div>
  );
}