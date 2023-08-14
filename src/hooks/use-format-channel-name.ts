import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { formatTextChannelName } from '@utils';

import { ChannelTypes } from '@features/channels/types';

export const useFormatChannelName = () => {
  const { control, setValue } = useFormContext();

  const type = useWatch({ control, name: 'type' });
  const name = useWatch({ control, name: 'name' });

  useEffect(() => {
    if (type === 'text') setValue('name', formatTextChannelName(name));
  }, [type]);

  const formatChannelName = (e: React.FormEvent<HTMLInputElement>) => {
    if (type === 'text') {
      const name = e.currentTarget.value;
      
      const formattedName = formatTextChannelName(name);

      setValue('name', formattedName);
    }
  };

  return formatChannelName;
};

export const useFormatChannelNameEdit = (type: ChannelTypes) => {
  const { setValue } = useFormContext();

  const formatChannelName = (e: React.FormEvent<HTMLInputElement>) => {
    if (type === 'text') {
      const name = e.currentTarget.value;
      
      const formattedName = formatTextChannelName(name);

      setValue('name', formattedName);
    }
  };

  return formatChannelName;
};