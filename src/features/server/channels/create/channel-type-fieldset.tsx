import { Fieldset, RadioInput } from '@components/ui';

import { ChannelTypeInputWrapper } from './channel-type-input-wrapper';

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
      >
      <img src="#" alt="" />
      <div>
        <p>Text</p>
        <p>Send messages, images, GIFs, opinions and puns</p>
      </div>
    </ChannelTypeInputWrapper>
    <ChannelTypeInputWrapper
      value="voice"
      radioInput={<RadioInput
        name="type"
        value="voice"
        label="Channel Type"
      />}
    >
      <img src="#" alt="" />
      <div>
        <p>Voice</p>
        <p>Hang out together with voice, video and screen share</p>
      </div>
    </ChannelTypeInputWrapper>
  </Fieldset>
  );
}