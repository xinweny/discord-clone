import type { Participant } from 'livekit-client';

import { Avatar } from '@components/ui/media';

import { useGetUserQuery } from '@features/users/api';

type DmOngoingCallParticipantCardProps = {
  participant: Participant;
};

export function DmOngoingCallParticipantCard({ participant }: DmOngoingCallParticipantCardProps) {
  const { data: user, isSuccess } = useGetUserQuery(participant.identity);

  if (!isSuccess) return null;

  return (
    <div>
      <Avatar src={user.avatarUrl} />
    </div>
  );
}