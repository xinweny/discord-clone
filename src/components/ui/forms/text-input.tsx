import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import { useFormContext, useWatch } from 'react-hook-form';

import { Input, InputProps } from './input';

export type TextInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  id: string;
  label?: string;
  rules?: RegisterOptions;
  options?: {
    trim?: boolean;
  };
} & Omit<InputProps, 'name' | 'id' | 'ariaLabel'>;

export function TextInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  rules,
  options = {
    trim: true,
  },
  ...props
}: TextInputProps<TFormValues>) {
  const { register, setValue, control } = useFormContext();
  const text = useWatch({ control, name });

  const { trim } = options;

  return (
    <div className={className} aria-live="polite">
      <Input
        id={id}
        value={text}
        {...props}
        {...(register && register(name, {
          onChange: trim ? e => {
            setValue(
              name,
              e.target.value.replace(/\s+/g, ' ').replace(/^\s/g, '')
            );
          } : undefined,
          ...rules,
        }))}
      />
    </div>
  );
}