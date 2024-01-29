import { RelationStatus } from '../types';

import {
  useGetRelationsQuery,
  useCreateRelationMutation,
  useRemoveRelationMutation,
} from '../api';

type SendFriendRequestButtonProps = {
  senderId: string;
  recipientId: string;
  className?: string;
  btnRef?: React.RefObject<HTMLButtonElement>;
};

export function ToggleBlockButton({
  senderId,
  recipientId,
  className,
  btnRef,
}: SendFriendRequestButtonProps) {
  const { data: relations, isSuccess } = useGetRelationsQuery(senderId);

  const [createRelation] = useCreateRelationMutation();
  const [removeRelation] = useRemoveRelationMutation();

  if (!isSuccess) return null;

  const relation = relations.find(relation => relation.userId === recipientId);

  const isBlocked = relation && relation.status === RelationStatus.BLOCKED;

  const handleClick = async () => {
    const data = {
      senderId,
      recipientId,
    };

    isBlocked
      ? await removeRelation({ ...data, relationId: relation._id }).unwrap()
      : await createRelation({ ...data, status: RelationStatus.BLOCKED }).unwrap();
  };

  return (
    <button
      ref={btnRef}
      className={className}
      onClick={handleClick}
    >
      {isBlocked ? 'Unblock' : 'Block'}
    </button>
  );
}