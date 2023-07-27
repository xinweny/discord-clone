import { useEffect } from 'react';

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
  files: File[];
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  setPreview: React.ChangeEventHandler;
} & Omit<InputProps, 'name' | 'type'>;

export function FilesInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  register,
  setValue,
  label,
  setPreview,
  files,
  hidden = false,
  ...props
}: FilesInputProps<TFormValues>) {
  useEffect(() => {
    const filesValue = ((files.length > 0) ? files : []) as PathValue<TFormValues, Path<TFormValues>>;

    setValue(name, filesValue);
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
          onChange: (e) => { setPreview(e); },
        }))}
        multiple
        hidden={hidden}
      />
    </div>
  );
}