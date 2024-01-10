import { useRef } from 'react';

import type { ServerMemberMainData } from '../types';

import { Popout, Tooltip } from '@components/ui/popups';
import { Avatar } from '@components/ui/media';

import { ServerMemberProfileButton } from '../get';

import { useLazyGetServerMemberQuery } from '../api';

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
    >
      <div className={styles.card} role="button">
        <Avatar src={member.user.avatarUrl} />
        <p>{member.displayName}</p>
        {isOwner && <Tooltip
          text="Server Owner"
          direction="top"
          gap={2}
        >
          <CrownIcon className={styles.crown} />
        </Tooltip>}
      </div>
    </ServerMemberProfileButton>
  );
}