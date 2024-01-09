import pluralize from 'pluralize';
import { useToggle } from '@uidotdev/usehooks';

import { useGetUserData } from '@features/auth/hooks';
import { useGetMutualFriendsQuery } from '../api';
import { MutualFriendCard } from './mutual-friend-card';

type MutualFriendsListProps = {
  participantId: string;
  withToggle?: boolean;
  className?: string;
};

export function MutualFriendsList({
  participantId,
  withToggle = true,
  className,
}: MutualFriendsListProps) {
  const [on, toggle] = useToggle(!withToggle);

  const { user } = useGetUserData();

  const { data: mutualFriends, isSuccess } = useGetMutualFriendsQuery({
    userId1: user.data!.id,
    userId2: participantId,
  });

  const length = mutualFriends?.length || 0;

  if (!isSuccess || length === 0) return null;

  return (
    <div className={className}>
      {withToggle && (
        <button onClick={() => toggle(!on)}>
          {pluralize('Mutual Friend', length, true)}
        </button>
      )}
      {on && <div>
        {mutualFriends.map(friend => <MutualFriendCard
          key={friend._id}
          friend={friend}
        />)}
      </div>}
    </div>
  ); 
}