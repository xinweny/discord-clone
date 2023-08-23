import type { RoleData } from '../types';

import { ModalButton, ModalButtonProps } from '@components/ui/buttons';
import { DeleteRoleModal } from './delete-role-modal';

type DeleteRoleButtonProps = {
  serverRole: RoleData;
} & ModalButtonProps;

export function DeleteRoleButton({
  serverRole,
  children,
  btnRef,
  ...props
}: DeleteRoleButtonProps) {
  return (
    <ModalButton
      btnRef={btnRef}
      modal={DeleteRoleModal}
      modalProps={{ serverRole }}
      {...props}
    >
      {children}
    </ModalButton>
  );
}