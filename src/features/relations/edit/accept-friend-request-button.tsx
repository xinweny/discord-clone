import { useGetUserData } from '@features/auth/hooks';

import { useAcceptFriendRequestMutation } from '../api';

type AcceptFriendRequestButtonProps = {
  relationId: string;
};

export function AcceptFriendRequestButton({
  relationId
}: AcceptFriendRequestButtonProps) {
  const { user } = useGetUserData();
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const handleClick = async () => {
    await acceptRequest({
      senderId: user.data!.id,
      relationId,
    }).unwrap();
  };

  return (
    <button onClick={handleClick}>
      <img src="#" alt="Accept Friend Request" />
    </button>
  );
}