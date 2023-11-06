import { useFormContext } from 'react-hook-form';

import type { RelationData } from '@features/relations/types';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './remove-participant-buttons.module.scss';

type RemoveParticipantButtonsProps = {
  friends: RelationData[];
  name: string;
};

export function RemoveParticipantButtons({
  friends,
  name
}: RemoveParticipantButtonsProps) {
  const { watch, setValue } = useFormContext();

  const participantIds = watch(name);

  const participants = friends.filter(
    ({ user }) => participantIds.includes(user._id)
  );

  return (
    <>
      {participants.map(({ user }) => (
        <button
          key={user._id}
          onClick={() => {
            setValue(name, participantIds.filter((i: string) => i !== user._id));
          }}
          className={styles.button}
        >
          <p>{user.displayName}</p>
          <CrossIcon />
        </button>
      ))}
    </>
  );
}