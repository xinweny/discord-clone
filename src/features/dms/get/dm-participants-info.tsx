import type { UserBasicData } from '@features/users/types';

import { useGetUserQuery } from '@features/users/api';

import { UserShortProfile } from '@features/users/profile';

type DmParticipantsInfoProps = {
  participants: UserBasicData[];
  isGroup: boolean;
};

export function DmParticipantsInfo({ participants, isGroup }: DmParticipantsInfoProps) {
  const { data: participant, isSuccess } = useGetUserQuery(participants[0]._id, { skip: isGroup });

  return (
    <div>
      {(!isGroup && isSuccess)
        ? <UserShortProfile user={participant}/>
        : <div>
          <p>{`MEMBERS - ${participants.length}`}</p>
        </div>}
    </div>
  )
}