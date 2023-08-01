import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

type FilesInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  accept?: string;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
} & Omit<InputProps, 'name' | 'type'>;

export function FilesInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  register,
  setFiles,
  label,
  hidden = false,
  ...props
}: FilesInputProps<TFormValues>) {

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