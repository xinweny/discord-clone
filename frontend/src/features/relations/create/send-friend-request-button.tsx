import { RelationStatus } from '../types';

import { useGetRelationsQuery, useCreateRelationMutation } from '../api';

type SendFriendRequestButtonProps = {
  senderId: string;
  recipientId: string;
  children: React.ReactNode;
  className?: string;
};

export function SendFriendRequestButton({
  senderId,
  recipientId,
  children,
  className,
}: SendFriendRequestButtonProps) {
  const { data: relations } = useGetRelationsQuery(senderId);

  const [createRelation] = useCreateRelationMutation();

  const hasFriendRequest = !!relations?.find(relation => relation.status === RelationStatus.PENDING_TO);

  const handleClick = async () => {
    await createRelation({
      status: RelationStatus.PENDING_TO,
      senderId,
      recipientId,
    }).unwrap();
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={hasFriendRequest}
    >
      {hasFriendRequest
        ? 'Friend Request Sent'
        : children
      }
    </button>
  );
}