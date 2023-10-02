import { FormGroup, TextInput } from '@components/ui/forms';

import type { ChannelTypes } from '../types';

import { useFormatChannelNameEdit } from '../hooks';

type EditChannelNameInputProps = {
  type: ChannelTypes;
}

export function EditChannelNameInput({ type }: EditChannelNameInputProps) {
  const formatChannelName = useFormatChannelNameEdit(type);

  return (
    <FormGroup label="Channel Name" htmlFor="channel-name">
      <TextInput
        name="name"
        id="channel-name"
        label="Channel Name"
        rules={{
          onChange: formatChannelName,
        }}
        maxLength={100}
      />
    </FormGroup>
  );
}