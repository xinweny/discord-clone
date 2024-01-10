import type { UserBasicData } from '@features/users/types';

import { Avatar } from '@components/ui/media';
import { UserStatusIcon } from '@features/users/status';

type MutualFriendCardProps = {
  friend: UserBasicData;
};

export function MutualFriendCard({
  friend
}: MutualFriendCardProps) {
  const { avatarUrl, displayName, _id } = friend;

  return (
    <button>
      <Avatar
        src={avatarUrl}
        notification={<UserStatusIcon userId={_id} />}
      />
      <p>{displayName}</p>
    </button>
  );
}