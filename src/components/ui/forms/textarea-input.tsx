import { useWatch, useFormContext } from 'react-hook-form';

import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import { TextArea, TextAreaProps } from './textarea';

import styles from './textarea-input.module.scss';

type FormTextAreaOptions = {
  showCharCount?: boolean;
};

export type TextAreaInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  id: string;
  label?: string;
  hidden?: boolean;
  rules?: RegisterOptions;
  options?: FormTextAreaOptions;
  maxLength?: number;
} & Omit<TextAreaProps, 'name' | 'id' | 'ariaLabel' | 'maxLength'>;

export function TextAreaInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  rules,
  maxLength,
  options = {
    showCharCount: false,
  },
  ...props
}: TextAreaInputProps<TFormValues>) {
  const { register, control } = useFormContext();
  const text = useWatch({ control, name });
  
  const { showCharCount } = options;

  return (
    <div className={`${styles.textArea} ${className}`} aria-live="polite">
      <TextArea
        id={id}
        maxLength={maxLength}
        {...props}
        {...(register && register(name, rules))}
      />
      <div className={styles.control}>
        {(control && showCharCount && maxLength) && (
          <span className={text.length === maxLength ? styles.danger : undefined}>{maxLength - text.length}</span>
        )}
      </div>
    </div>
  );
}