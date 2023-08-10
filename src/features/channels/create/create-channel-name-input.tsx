import { useFormatChannelName } from '@hooks';

import { FormGroup, TextInput } from '@components/ui/forms';

export function CreateChannelNameInput() {
  const formatChannelName = useFormatChannelName();

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
  );
}