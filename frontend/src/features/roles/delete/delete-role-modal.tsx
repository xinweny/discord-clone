import { useParams } from 'react-router-dom';

import type { ModalProps } from '@types';
import type { RoleData } from '../types';

import { ConfirmationModal } from '@components/ui/modals';

import { useDeleteRoleMutation } from '../api';

type DeleteCategoryModalProps = {
  serverRole?: RoleData;
} & ModalProps;

export function DeleteRoleModal({
  serverRole,
  isOpen,
  onClose,
}: DeleteCategoryModalProps) {
  const [deleteRole] = useDeleteRoleMutation();

  const { serverId } = useParams();

  if (!serverRole) return null;

  const onConfirm = async () => {
    await deleteRole({
      serverId: serverId!,
      roleId: serverRole._id,
    });
  };

  return (
    <ConfirmationModal
      title="Delete Role"
      message={`Are you sure you want to delete the ${serverRole.name} role? This cannot be undone.`}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}