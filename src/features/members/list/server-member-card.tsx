import { ClickPopup, Tooltip } from '@components/ui/popups';

import type { ServerMemberMainData } from '../types';

import { Avatar } from '@components/ui/media';

import { ServerMemberProfileCard } from '../profile';

import CrownIcon from '@assets/icons/crown.svg?react';

import styles from './server-member-card.module.scss';

type ServerMemberCardProps = {
  member: ServerMemberMainData;
  isOwner: boolean;
};

export function ServerMemberCard({
  member, isOwner
}: ServerMemberCardProps) {
  return (
    <ClickPopup
      renderPopup={
        () => <ServerMemberProfileCard memberId={member._id} />
      }
      position={{
        direction: 'left',
        align: 'center',
        gap: 4,
      }}
    >
      <div className={styles.card}>
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
    </ClickPopup>
  );
}