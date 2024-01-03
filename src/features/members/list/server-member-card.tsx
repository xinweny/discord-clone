import { useRef } from 'react';

import type { ServerMemberMainData } from '../types';

import { ClickPopup, Tooltip } from '@components/ui/popups';
import { Avatar } from '@components/ui/media';

import { ServerMemberProfileCard } from '../get';

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
  const [getServerMember] = useLazyGetServerMemberQuery();

  const btnRef = useRef<HTMLButtonElement>(null);

  const renderPopup = async () => {
    const serverMember = await getServerMember({
      serverId,
      memberId: member._id,
    }).unwrap();

    if (!serverMember) return null;

    return <ServerMemberProfileCard
      member={serverMember}
    />;
  };

  return (
    <ClickPopup
      renderPopup={renderPopup}
      position={{
        direction: 'left',
        align: 'start',
        gap: 16,
      }}
      btnRef={btnRef}
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
    </ClickPopup>
  );
}