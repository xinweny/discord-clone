import { useFormContext } from 'react-hook-form';

import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import { Input, InputProps } from './input';

type FilesInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  accept?: string;
  hidden?: boolean;
  rules?: RegisterOptions;
} & Omit<InputProps, 'name' | 'type'>;

export function FilesInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  accept,
  rules,
  label,
  hidden = false,
  ...props
}: FilesInputProps<TFormValues>) {
  const { register } = useFormContext();
  return (
    <div className={className} aria-live="polite">
      <Input
        type="file"
        id={id}
        accept={accept}
        label={label}
        {...props}
        {...(register && register(name, rules))}
        multiple
        hidden={hidden}
      />
    </div>
  );
}