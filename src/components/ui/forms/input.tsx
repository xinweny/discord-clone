import {
  FC,
  InputHTMLAttributes,
  forwardRef,
} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'file' | 'color' | 'radio' | 'checkbox';
  className?: string;
  placeholder?: string;
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      className = '',
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        aria-label={label}
        {...props}
      />
    );
  }
);
