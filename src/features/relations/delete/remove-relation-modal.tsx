import { type RelationData, RelationStatus } from '../types';
import type { ModalProps } from '@types';

import { useGetUserData } from '@features/auth/hooks';

import { ConfirmationModal } from '@components/ui/modals';

import { useRemoveRelationMutation } from '../api';

type RemoveRelationModalProps = {
  relation?: RelationData;
} & ModalProps;

export function RemoveRelationModal({
  relation, isOpen, onClose
}: RemoveRelationModalProps) {
  const { user } = useGetUserData();

  const [removeRelation] = useRemoveRelationMutation();

  if (!relation) return null;

  const {
    _id: relationId,
    status,
    user: { displayName },
  } = relation;

  const renderProps = (status: RelationStatus) => {
    const formatProps = (
      title: string,
      message: string,
      confirmLabel?: string,
    ) => ({ title, message, confirmLabel });

    switch (status) {
      case RelationStatus.FRIENDS: return formatProps(
        `Remove '${displayName}'`,
        `Are you sure you want to permanently remove ${displayName} from your friends?`,
        'Remove Friend'
      );
      case RelationStatus.PENDING_FROM: return formatProps(
        `Reject Friend Request`,
        `Are you sure you want to reject the friend request from ${displayName}?`,
      );
      case RelationStatus.PENDING_TO: return formatProps(
        'Cancel Friend Request',
        `Are you sure you want to cancel your friend request to ${displayName}?`,
      );
      case RelationStatus.BLOCKED: return formatProps(
        `Unblock '${displayName}'`,
        `Are you sure you want to unblock ${displayName}?`,
        'Unblock'
      );
    }
  };

  const handleClick = async () => {
    await removeRelation({
      senderId: user.data!.id,
      relationId,
      status,
    }).unwrap();
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      {...renderProps(status)}
      onConfirm={handleClick}
    />
  );
}