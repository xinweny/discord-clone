import type { ServerMemberMainData } from '../types';

import { Tooltip } from '@components/ui/popups';
import { Avatar } from '@components/ui/media';

import { ServerMemberProfileButton } from '../get';

import CrownIcon from '@assets/icons/crown.svg?react';

import styles from './server-member-card.module.scss';

type ServerMemberCardProps = {
  member: ServerMemberMainData;
  serverId: string;
  isOwner: boolean;
};

export function ServerMemberCard({
  member,
  serverId,
  isOwner,
}: ServerMemberCardProps) {
  return (
    <ServerMemberProfileButton
      position={{
        direction: 'left',
        align: 'start',
        gap: 16,
      }}
      memberId={member._id}
      serverId={serverId}
      className={styles.card}
      activeClass={styles.active}
    >
      <Avatar src={member.user.avatarUrl} />
      <span>{member.displayName}</span>
      {isOwner && <Tooltip
        text="Server Owner"
        direction="top"
        gap={2}
      >
        <CrownIcon className={styles.crown} />
      </Tooltip>}
    </ServerMemberProfileButton>
  );
}