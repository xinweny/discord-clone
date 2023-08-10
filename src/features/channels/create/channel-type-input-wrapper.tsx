import { useWatch, useFormContext } from 'react-hook-form';

type ChannelTypeInputWrapperProps = {
  value: string;
  radioInput: React.ReactNode;
  children: React.ReactNode;
};

export function ChannelTypeInputWrapper({
  value,
  children,
  radioInput,
}: ChannelTypeInputWrapperProps) {
  const { control } = useFormContext();

  const val = useWatch({ control, name: 'type' });

  return (
    <div className={val === value ? 'selected' : ''}>
      <div>
        {children}
      </div>
      {radioInput}
    </div>
  );
}