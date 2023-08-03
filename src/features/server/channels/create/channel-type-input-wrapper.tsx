import { useWatch, Control } from 'react-hook-form';

import type { CreateChannelFields } from './create-channel-form';

type ChannelTypeInputWrapperProps = {
  value: string;
  control: Control<CreateChannelFields>;
  radioInput: React.ReactNode;
  children: React.ReactNode;
};

export function ChannelTypeInputWrapper({
  value,
  control,
  children,
  radioInput,
}: ChannelTypeInputWrapperProps) {
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