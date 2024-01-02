import { useFormContext } from 'react-hook-form';

import { ChannelTypes } from '../types';

import { useFormatChannelName } from '../hooks';

import { FormGroup, TextInput } from '@components/ui/forms';

import HashIcon from '@assets/icons/hash.svg?react';
import SpeakerIcon from '@assets/icons/speaker.svg?react';

import styles from './create-channel-name-input.module.scss';

export function CreateChannelNameInput() {
  const { watch } = useFormContext();

  const formatChannelName = useFormatChannelName();

  const type = watch('type');

  return (
    <FormGroup
      label="channel name"
      htmlFor="channel-name"
    >
      <TextInput
        className={styles.input}
        name="name"
        label="Channel Name"
        id="channel-name"
        placeholder="new-channel"
        rules={{
          onChange: formatChannelName,
        }}
        maxLength={100}
        before={<div className={styles.icon}>
          {type === ChannelTypes.TEXT
            ? <HashIcon />
            : <SpeakerIcon />
          }
        </div>}
      />
    </FormGroup>
  );
}