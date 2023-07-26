import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

import { TextArea, TextAreaProps } from './textarea';

export type FormTextAreaProps<
  TFormValues extends FieldValues,
  TRef
> = {
  name: Path<TFormValues>;
  id: string;
  label: string;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  innerRef?: React.RefObject<TRef>;
  showLabel?: boolean;
} & Omit<TextAreaProps, 'name' | 'id' | 'ariaLabel'>;

export function FormTextArea<TFormValues extends FieldValues, TRef>({
  className,
  name,
  label,
  id,
  register,
  rules,
  innerRef,
  showLabel = false,
  ...props
}: FormTextAreaProps<TFormValues, TRef>) {
  return (
    <div className={className} aria-live="polite">
      {(label && showLabel) && <label htmlFor={id}>{label.toUpperCase()}</label>}
      <TextArea
        ref={innerRef}
        name={name}
        id={id}
        {...props}
        {...(register && register(name, rules))}
      />
    </div>
  );
}