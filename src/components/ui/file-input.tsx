import { Input, InputProps } from './input';

import type {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
} from 'react-hook-form';

export type FileInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  accept?: string;
  multiple?: boolean;
  hidden?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  setValue?: UseFormSetValue<TFormValues>;
  setPreview?: React.ChangeEventHandler;
} & Omit<InputProps, 'name' | 'type'>;

export function FileInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  register,
  setValue,
  label,
  setPreview,
  multiple = false,
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
            if (setPreview) setPreview(e);

            if (setValue) {
              const { files } = e.target;
              setValue(name, multiple ? files : files[0]);
            }
          },
        }))}
        hidden={hidden}
        multiple={multiple}
      />
    </div>
  );
}