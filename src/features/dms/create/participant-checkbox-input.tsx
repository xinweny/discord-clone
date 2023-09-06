import { useFormContext } from 'react-hook-form';

import type { UserBasicData } from '@features/user/types';

import { CheckboxInput } from '@components/ui/forms';
import { Avatar } from '@components/ui/media';

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

  return (
    <div>
      <div>
        <Avatar src={avatarUrl} />
        <p>{displayName}</p>
        <p>{username}</p>
      </div>
      <CheckboxInput
        name="participantIds"
        id={id}
        label={displayName}
        rules={{
          onChange: (e) => {
            e.target.checked
              ? setValue(name, [...participantIds, id])
              : setValue(name, participantIds.filter((i: string) => i !== id))
          }
        }}
        checked={participantIds.includes(id)}
      />
    </div>
  );
}