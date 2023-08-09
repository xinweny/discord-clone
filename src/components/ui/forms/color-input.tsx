import { useFormContext } from 'react-hook-form';

import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

type ColorInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  hidden?: boolean;
  rules?: RegisterOptions;
  setPreview?: React.ChangeEventHandler;
} & Omit<InputProps, 'name' | 'type'>;

export function ColorInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  setPreview,
  hidden = false,
  ...props
}: ColorInputProps<TFormValues>) {
  const { register } = useFormContext();

  return (
    <div className={className} aria-live="polite">
      <Input
        type="color"
        id={id}
        {...props}
        {...(register && register(name, {
          onChange: (e) => {
            if (setPreview) setPreview(e.target.value);
          },
        }))}
        hidden={hidden}
      />
    </div>
  );
}