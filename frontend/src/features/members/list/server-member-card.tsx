import type { ServerMemberMainData } from '../types';

import { Tooltip } from '@components/ui/popups';
import { Avatar } from '@components/ui/media';

import { ServerMemberProfileButton } from '../get';

import CrownIcon from '@assets/icons/crown.svg?react';

import styles from './server-member-card.module.scss';

type ServerMemberCardProps = {
  member: ServerMemberMainData;
  serverId: string;
  ownerId: string;
};

export function ServerMemberCard({
  member,
  serverId,
  ownerId,
}: ServerMemberCardProps) {
  return (
    <ServerMemberProfileButton
      memberId={member._id}
      serverId={serverId}
      className={styles.button}
      activeClass={styles.active}
    >
      <Avatar src={member.user.avatarUrl} />
      <span>{member.displayName}</span>
      {(member._id === ownerId) && <Tooltip
        text="Server Owner"
        direction="top"
        gap={2}
      >
        <CrownIcon className={styles.crown} />
      </Tooltip>}
    </ServerMemberProfileButton>
  );
}