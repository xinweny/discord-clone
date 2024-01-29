import type { Participant } from 'livekit-client';

import { useServerMemberParticipant } from '../hooks';

import { Avatar } from '@components/ui/media';

import { ServerMemberProfileButton } from '@features/members/get';

import styles from './channel-ongoing-call-participant-card-preview.module.scss';

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
    <ServerMemberProfileButton
      position={{
        direction: 'right',
        align: 'start',
        gap: 12,
      }}
      memberId={member._id}
      serverId={serverId}
      className={styles.button}
      activeClass={styles.active}
    >
      <Avatar src={avatarUrl} className={styles.avatar} />
      <span>{displayName}</span>
    </ServerMemberProfileButton>
  );
}