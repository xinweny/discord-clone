import type { Participant } from 'livekit-client';

import { Avatar } from '@components/ui/media';

import { useTileBgColor } from '../hooks';

import { useGetUserServerMemberQuery } from '@features/members/api';
import { useGetUserQuery } from '@features/users/api';

import styles from './group-ongoing-call-participant-card.module.scss';

type GroupOngoingCallParticipantCardProps = {
  participant: Participant;
  serverId?: string;
};

export function GroupOngoingCallParticipantCard({ participant, serverId }: GroupOngoingCallParticipantCardProps) {
  const userId = participant.identity;

  const { data: member } = useGetUserServerMemberQuery({
    userId,
    serverId: serverId!,
  }, { skip: !serverId || !userId });

  const { data: user } = useGetUserQuery(userId, { skip: !!serverId || !userId });

  const avatarUrl = member?.user.avatarUrl || user?.avatarUrl;

  const color = useTileBgColor(avatarUrl);

  return (
    <div
      className={styles.card}
      style={{ backgroundColor: color }}
    >
      <Avatar src={avatarUrl} />
    </div>
  );
}