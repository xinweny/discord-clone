import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
  Control,
} from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { TextArea, TextAreaProps } from './textarea';

type FormTextAreaOptions = {
  showLabel?: boolean;
  showCharCount?: boolean;
};

export type FormTextAreaProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  id: string;
  label: string;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  control?: Control<TFormValues>;
  options?: FormTextAreaOptions;
  maxLength?: number;
} & Omit<TextAreaProps, 'name' | 'id' | 'ariaLabel' | 'maxLength'>;

export function FormTextArea<TFormValues extends FieldValues>({
  className,
  name,
  label,
  id,
  register,
  control,
  rules,
  maxLength,
  options = {
    showLabel: false,
    showCharCount: false,
  },
  ...props
}: FormTextAreaProps<TFormValues>) {
  const text = useWatch({ control, name });
  const { showLabel, showCharCount } = options;

  return (
    <div className={className} aria-live="polite">
      {(label && showLabel) && <label htmlFor={id}>{label.toUpperCase()}</label>}
      <TextArea
        name={name}
        id={id}
        maxLength={maxLength}
        {...props}
        {...(register && register(name, rules))}
      />
      {(control && showCharCount && maxLength) && (
        <p>{maxLength - text.length}</p>
      )}
    </div>
  );
}