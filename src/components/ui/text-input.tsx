import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import { useFormContext } from 'react-hook-form';

import { Input, InputProps } from './input';

export type TextInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  id: string;
  label?: string;
  rules?: RegisterOptions;
} & Omit<InputProps, 'name' | 'id' | 'ariaLabel'>;

export function TextInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  rules,
  ...props
}: TextInputProps<TFormValues>) {
  const { register, setValue } = useFormContext();

  return (
    <div className={className} aria-live="polite">
      <Input
        id={id}
        {...props}
        {...(register && register(name, {
          onChange: e => {
            setValue(
              name,
              e.target.value.replace(/\s+/g, ' ').trim()
            );
          },
          ...rules,
        }))}
      />
    </div>
  );
}