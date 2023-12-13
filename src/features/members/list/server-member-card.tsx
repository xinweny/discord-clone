import { ClickPopup } from '@components/ui/popups';

import type { ServerMemberMainData } from '../types';

import { Avatar } from '@components/ui/media';

import { ServerMemberProfileCard } from '../profile';

import styles from './server-member-card.module.scss';

type ServerMemberCardProps = {
  member: ServerMemberMainData;
};

export function ServerMemberCard({
  member
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
      </div>
    </ClickPopup>
  );
}