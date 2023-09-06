import { useFormContext } from 'react-hook-form';

import type { RelationData } from '@features/relations/types';

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
    <div>
      {participants.map(({ user }) => (
        <button
          key={user._id}
          onClick={() => {
            setValue(name, participantIds.filter((i: string) => i !== user._id));
          }}
        >
          <p>{user.displayName}</p>
          <p>x</p>
        </button>
      ))}
    </div>
  );
}