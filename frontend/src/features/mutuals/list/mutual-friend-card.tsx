import type { UserBasicData } from '@features/users/types';

import { Avatar } from '@components/ui/media';
import { UserStatusIcon } from '@features/statuses/get';

import styles from './mutual-friend-card.module.scss';

type MutualFriendCardProps = {
  friend: UserBasicData;
  onClick?: () => void;
};

export function MutualFriendCard({
  friend,
  onClick,
}: MutualFriendCardProps) {
  const { avatarUrl, displayName, _id } = friend;

  return (
    <li className={styles.card}>
      <button onClick={onClick}>
        <Avatar
          src={avatarUrl}
          notification={<UserStatusIcon userId={_id} />}
        />
        <span>{displayName}</span>
      </button>
    </li>
  );
}