import { useFormContext } from 'react-hook-form';

import { Input, InputProps } from './input';

import type {
  RegisterOptions,
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
} & Omit<InputProps, 'name' | 'type'>;

export function FileInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  rules,
  label,
  hidden = false,
  ...props
}: FileInputProps<TFormValues>) {
  const { register, setValue } = useFormContext();

  return (
    <div className={className} aria-live="polite">
      <Input
        type="file"
        id={id}
        accept={accept}
        label={label}
        {...props}
        {...(register && register(name, {
          onChange: (e) => {
            const { files } = e.target;

            setValue(name, files[0]);
          },
          ...rules,
        }))}
        hidden={hidden}
      />
    </div>
  );
}