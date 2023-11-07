import { useFormContext } from 'react-hook-form';

import styles from './checkbox-input.module.scss';

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
  children: React.ReactNode;
} & Omit<InputProps, 'name' | 'id' | 'type'>;

export function CheckboxInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  rules,
  children,
  ...props
}: CheckboxInputProps<TFormValues>) {
  const { register } = useFormContext();

  return (
    <div className={`${styles.input} ${className}`} aria-live="polite">
      <Input
        type="checkbox"
        id={id}
        {...props}
        {...(register && register(name, rules))}
      />
      <div className={styles.checkmark}>
        {children}
      </div>
    </div>
  );
}