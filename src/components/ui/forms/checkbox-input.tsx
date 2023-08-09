import { useFormContext } from 'react-hook-form';

import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import { Input, InputProps } from './input';

export type CheckboxInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  id: string;
  rules?: RegisterOptions;
} & Omit<InputProps, 'name' | 'id' | 'type'>;

export function CheckboxInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  rules,
  ...props
}: CheckboxInputProps<TFormValues>) {
  const { register } = useFormContext();

  return (
    <div className={className} aria-live="polite">
      <Input
        type="checkbox"
        id={id}
        {...props}
        {...(register && register(name, rules))}
      />
    </div>
  );
}