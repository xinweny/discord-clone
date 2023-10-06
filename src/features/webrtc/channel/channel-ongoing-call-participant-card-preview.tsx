import type { Participant } from 'livekit-client';

import { useServerMemberParticipant } from '../hooks';

import { Avatar } from '@components/ui/media';

type ChannelOngoingCallParticipantCardPreviewProps = {
  participant: Participant;
  serverId: string;
};

export function ChannelOngoingCallParticipantCardPreview({
  participant,
  serverId,
}: ChannelOngoingCallParticipantCardPreviewProps) {
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