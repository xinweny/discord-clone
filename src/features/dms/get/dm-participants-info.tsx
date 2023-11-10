import type { UserBasicData } from '@features/users/types';

import { useGetUserQuery } from '@features/users/api';

import { UserShortProfile } from '@features/users/profile';
import { MutualServersList } from '@features/relations/mutuals';

type DmParticipantsInfoProps = {
  participants: UserBasicData[];
  isGroup: boolean;
  show: boolean;
};

export function DmParticipantsInfo({ participants, isGroup, show }: DmParticipantsInfoProps) {
  const { data: participant, isSuccess } = useGetUserQuery(participants[0]._id, { skip: isGroup });

  if (!show) return null;

  return (
    <div>
      {(!isGroup && isSuccess)
        ? <>
          <UserShortProfile user={participant}/>
          <MutualServersList participantId={participant._id} />
        </>
        : <div>
          <p>{`MEMBERS - ${participants.length}`}</p>
        </div>}
    </div>
  )
}