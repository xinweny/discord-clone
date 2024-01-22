import ColorThief from 'colorthief';

import type { Participant } from 'livekit-client';

import { Avatar } from '@components/ui/media';

import { useGetUserServerMemberQuery } from '@features/members/api';
import { useGetUserQuery } from '@features/users/api';

import defaultUserAvatar from '@assets/static/default-user-avatar.png';

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

  const colorThief = new ColorThief();

  const avatarUrl = member?.user.avatarUrl || user?.avatarUrl;

  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: `rgb(${colorThief.getColor(avatarUrl || defaultUserAvatar).join(', ')})`,
      }}
    >
      <Avatar src={avatarUrl} />
    </div>
  );
}