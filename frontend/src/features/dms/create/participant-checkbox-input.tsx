import { useFormContext } from 'react-hook-form';

import { CheckboxInput } from '@components/ui/forms';
import { Avatar } from '@components/ui/media';

import type { UserBasicData } from '@features/users/types';
import { UserStatusIcon } from '@features/statuses/get';

import CheckmarkIcon from '@assets/icons/checkmark.svg?react';

import styles from './participant-checkbox-input.module.scss';

type ParticipantCheckboxInputProps = {
  participant: UserBasicData;
  name: string;
}

export function ParticipantCheckboxInput({
  participant,
  name
}: ParticipantCheckboxInputProps) {
  const { setValue, watch } = useFormContext();

  const participantIds = watch(name);

  const {
    _id: id,
    avatarUrl,
    username,
    displayName,
  } = participant;

  const checked = participantIds.includes(id);

  return (
    <div className={styles.item}>
      <div className={styles.friend}>
        <Avatar
          src={avatarUrl}
          notification={<UserStatusIcon userId={id} />}
        />
        <div>
          <p>{displayName}</p>
          <p>{username}</p>
        </div>
      </div>
      <CheckboxInput
        className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
        name="participantIds"
        id={id}
        label={displayName}
        value={id}
        rules={{
          onChange: (e) => {
            e.target.checked
              ? setValue(name, [...participantIds, id])
              : setValue(name, participantIds.filter((i: string) => i !== id))
          }
        }}
        checked={checked}
      >
        <CheckmarkIcon />
      </CheckboxInput>
    </div>
  );
}