import { useWatch, useFormContext } from 'react-hook-form';

import { FormGroup, TextInput } from '@components/ui';

export function ChannelNameInput() {
  const { control } = useFormContext();

  const type = useWatch({ control, name: 'type' });

  const formatChannelName = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;


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