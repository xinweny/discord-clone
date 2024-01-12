import { useFormContext } from 'react-hook-form';

import { Input, InputProps } from './input';

import styles from './color-input.module.scss';

import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

type ColorInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  setPreview?: React.ChangeEventHandler;
} & Omit<InputProps, 'name' | 'type'>;

export function ColorInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  setPreview,
  ...props
}: ColorInputProps<TFormValues>) {
  const { register } = useFormContext();

  return (
    <label className={`${styles.swatch} ${className || ''}`} aria-live="polite">
      <Input
        type="color"
        id={id}
        {...props}
        {...(register && register(name, {
          onChange: (e) => {
            if (setPreview) setPreview(e.target.value);
          },
        }))}
      />
    </label>
  );
}