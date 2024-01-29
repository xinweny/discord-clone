import {
  FC,
  InputHTMLAttributes,
  forwardRef,
} from 'react';

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  name: string;
  label?: string;
  className?: string;
  children?: string;
}

export const TextArea: FC<TextAreaProps> = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      label,
      className = '',
      placeholder,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <textarea
        id={id}
        ref={ref}
        name={name}
        placeholder={placeholder}
        className={className}
        aria-label={label}
        {...props}
      >{children}</textarea>
    );
  }
);
