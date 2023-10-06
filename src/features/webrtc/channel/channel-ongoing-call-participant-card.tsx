import type { Participant } from 'livekit-client';

import { Avatar } from '@components/ui/media';

import { useGetServerMembersQuery } from '@features/members/api';

type ChannelOngoingCallParticipantCardProps = {
  participant: Participant;
  serverId: string;
};

export function ChannelOngoingCallParticipantCard({
  participant,
  serverId,
}: ChannelOngoingCallParticipantCardProps) {
  const { data: members } = useGetServerMembersQuery(serverId);

  if (!members || members.length === 0) return null;

  const member = members.find(member => member.userId === participant.identity);

  if (!member) return null;

  return (
    <div>
      <Avatar src={member.user.avatarUrl} />
      <p>{member.displayName}</p>
    </div>
  );
}