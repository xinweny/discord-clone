import { useGetUserData } from '@features/auth/hooks';

import { useAcceptFriendRequestMutation } from '../api';

type AcceptFriendRequestButtonProps = {
  relationId: string;
  className?: string;
  children: React.ReactNode;
};

export function AcceptFriendRequestButton({
  relationId,
  children,
  className,
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
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}