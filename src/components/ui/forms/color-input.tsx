import { useFormContext } from 'react-hook-form';

import { Input, InputProps } from './input';

import PencilIcon from '@assets/icons/pencil.svg?react';

import styles from './color-input.module.scss';

import type {
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

type ColorInputProps<
  TFormValues extends FieldValues
> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  setPreview?: React.ChangeEventHandler;
} & Omit<InputProps, 'name' | 'type'>;

export function ColorInput<TFormValues extends FieldValues>({
  className,
  name,
  id,
  setPreview,
  ...props
}: ColorInputProps<TFormValues>) {
  const { watch, register } = useFormContext();

  const color = watch(name);

  const getContrast = (hexColor: string) => {
    const hex = hexColor.slice(1);
    
    const [r, g, b] = ([[0, 2], [2, 4], [4, 6]] as [number, number][])
      .map(val => parseInt(hex.slice(...val), 16));
      
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return (yiq >= 128) ? 'black' : 'white';
  };

  return (
    <div
      className={`${styles.swatch} ${className || ''}`}
      role="button"
      style={{
        backgroundColor: color,
        color: getContrast(color),
      }}
    >
      <PencilIcon />
      <Input
        type="color"
        id={id}
        {...props}
        {...(register && register(name, {
          onChange: (e) => {
            if (setPreview) setPreview(e.target.value);
          },
        }))}
      />
    </div>
  );
}