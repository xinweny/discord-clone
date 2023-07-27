import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

import { TextArea, TextAreaProps } from './textarea';

export type FormTextAreaProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  id: string;
  label: string;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  showLabel?: boolean;
} & Omit<TextAreaProps, 'name' | 'id' | 'ariaLabel'>;

export function FormTextArea<TFormValues extends FieldValues>({
  className,
  name,
  label,
  id,
  register,
  rules,
  showLabel = false,
  ...props
}: FormTextAreaProps<TFormValues>) {
  return (
    <div className={className} aria-live="polite">
      {(label && showLabel) && <label htmlFor={id}>{label.toUpperCase()}</label>}
      <TextArea
        name={name}
        id={id}
        {...props}
        {...(register && register(name, rules))}
      />
    </div>
  );
}