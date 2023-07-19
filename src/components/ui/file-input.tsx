import { usePreview } from '@hooks';

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
  accept: string;
  multiple?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  setValue?: UseFormSetValue<TFormValues>;
  children: React.ReactNode;
} & Omit<InputProps, 'name' | 'type'>;

export function FileInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  register,
  setValue,
  label,
  children,
  multiple = false,
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
            onChange: (e) => {
              handleChange(e);

              if (setValue) {
                const { files } = e.target;
                setValue(name, multiple ? files : files[0]);
              }
            },
          }))}
          hidden
          multiple={multiple}
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