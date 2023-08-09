import { useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';

import { formatTextChannelName } from '@utils';

import { FormGroup, TextInput } from '@components/ui/forms';

export function ChannelNameInput() {
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

  return (
    <FormGroup label="channel name" htmlFor="channel-name">
      <TextInput
        name="name"
        label="Channel Name"
        id="channel-name"
        placeholder="new-channel"
        rules={{
          onChange: formatChannelName,
        }}
        maxLength={100}
      />
    </FormGroup>
  )
}