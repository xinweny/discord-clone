import type { UserBasicData } from '@features/users/types';

import { Avatar } from '@components/ui/media';

import { UserProfileSummaryButton } from '@features/users/get';
import { UserStatusIcon } from '@features/statuses/get';

import styles from './group-member-card.module.scss';

type GroupMemberCardProps = {
  user: UserBasicData
};

export function GroupMemberCard({
  user,
}: GroupMemberCardProps) {
  const { _id: userId, avatarUrl, displayName } = user;

  return (
    <UserProfileSummaryButton
      userId={userId}
      className={styles.button}
      activeClass={styles.active}
    >
      <Avatar
        src={avatarUrl}
        notification={<UserStatusIcon userId={userId} />}
      />
      <span>{displayName}</span>
    </UserProfileSummaryButton>
  );
}