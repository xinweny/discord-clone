import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

type ColorInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  setPreview?: React.ChangeEventHandler;
} & Omit<InputProps, 'name' | 'type'>;

export function ColorInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  register,
  label,
  setPreview,
  hidden = false,
  ...props
}: ColorInputProps<TFormValues>) {
  return (
    <div className={className} aria-live="polite">
      <label htmlFor={id}>
        {label && <p>{label.toUpperCase()}</p>}
        <Input
          type="color"
          id={id}
          name={name}
          aria-label={label}
          {...props}
          {...(register && register(name, {
            onChange: (e) => {
              if (setPreview) setPreview(e.target.value);
            },
          }))}
          hidden={hidden}
        />
      </label>
    </div>
  );
}