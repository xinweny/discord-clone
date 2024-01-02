import { Fieldset, RadioInput } from '@components/ui/forms';

import { ChannelTypeInputWrapper } from './channel-type-input-wrapper';

import HashIcon from '@assets/icons/hash.svg?react';
import SpeakerIcon from '@assets/icons/speaker.svg?react';

export function ChannelTypeFieldset() {
  return (
    <Fieldset legend="channel type">
      <ChannelTypeInputWrapper
        value="text"
        radioInput={<RadioInput
          name="type"
          value="text"
          label="Channel Type"
        />}
        icon={<HashIcon />}
        label="Text"
        description="Send messages, images, GIFs, opinions and puns"
      />
    <ChannelTypeInputWrapper
      value="voice"
      radioInput={<RadioInput
        name="type"
        value="voice"
        label="Channel Type"
      />}
      icon={<SpeakerIcon />}
      label="Voice"
      description="Hang out together with voice, video and screen share"
    />
  </Fieldset>
  );
}