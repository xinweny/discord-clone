import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
} from 'react-hook-form';

type FileInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  accept?: string;
  files?: File[];
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
} & Omit<InputProps, 'name' | 'type'>;

export function FileInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  register,
  setValue,
  label,
  hidden = false,
  ...props
}: FileInputProps<TFormValues>) {
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
            const { files } = e.target;

            setValue(name, files[0]);
          },
        }))}
        hidden={hidden}
      />
    </div>
  );
}