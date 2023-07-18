import { usePreview } from '@hooks';

import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

export type FileInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  accept: string;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  children: React.ReactNode;
} & Omit<InputProps, 'name' | 'type'>;

export function FileInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  register,
  label,
  children,
  ...props
}: FileInputProps<TFormValues>) {
  const { file, fileDataUrl, handleChange } = usePreview();

  return (
    <div className={className} aria-live="polite">
      <label htmlFor={id}>
        <Input
          type="file"
          id={id}
          name={name}
          accept={accept}
          aria-label={label}
          {...props}
          {...(register && register(name, {
            onChange: handleChange
          }))}
          hidden
          multiple={false}
        />
        <div>
          {file
            ? <img src={fileDataUrl} alt="Preview" />
            : children
          }
        </div> 
      </label>
    </div>
  );
}