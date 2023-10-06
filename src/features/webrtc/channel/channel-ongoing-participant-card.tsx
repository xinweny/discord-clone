import type { Participant } from 'livekit-client';

import { Avatar } from '@components/ui/media';

import { useServerMemberParticipant } from '../hooks';

type ChannelOngoingCallParticipantCardProps = {
  participant: Participant;
  serverId: string;
};

export function ChannelOngoingCallParticipantCard({
  participant,
  serverId,
}: ChannelOngoingCallParticipantCardProps) {
  const member = useServerMemberParticipant(participant, serverId);

  if (!member) return null;

  const {
    displayName,
    user: { avatarUrl },
  } = member;

  return (
    <div>
      <Avatar src={avatarUrl} />
      <p>{displayName}</p>
    </div>
  );
}