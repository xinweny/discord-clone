import { useGetUserData } from '@features/auth/hooks';
import { useGetMutualFriendsQuery } from '../api';
import { MutualFriendCard } from './mutual-friend-card';

type MutualFriendsListProps = {
  participantId: string;
  className?: string;
  placeholder?: React.ReactNode;
};

export function MutualFriendsList({
  participantId,
  className,
  placeholder,
}: MutualFriendsListProps) {
  const { user } = useGetUserData();

  const { data: mutualFriends, isSuccess } = useGetMutualFriendsQuery({
    userId1: user.data!.id,
    userId2: participantId,
  });

  const length = mutualFriends?.length || 0;
  
  if (!isSuccess) return null;
  if (length === 0) return placeholder;

  return (
    <ul className={className}>
      {mutualFriends.map(friend => <MutualFriendCard
        key={friend._id}
        friend={friend}
      />)}
    </ul>
  ); 
}