import { useEffect, useState } from 'react';

import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

type FilesInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  accept?: string;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
} & Omit<InputProps, 'name' | 'type'>;

export function FilesInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  register,
  setValue,
  label,
  hidden = false,
  ...props
}: FilesInputProps<TFormValues>) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setValue(name, files as PathValue<TFormValues, Path<TFormValues>>);
  }, [files]);

  return (
    <div className={className} aria-live="polite">
      <Input
        type="file"
        id={id}
        name={name}
        accept={accept}
        aria-label={label}
        {...props}
        {...(register && register(name, {
          onChange: (e) => {
            setFiles(prev => [...prev, ...e.target.files]);
          },
        }))}
        multiple
        hidden={hidden}
      />
    </div>
  );
}