import { ChangePasswordModal } from './change-password-modal';

import { ModalButton } from '@components/ui/buttons';

type ChangePasswordButtonProps = {
  children: React.ReactNode;
}

export function ChangePasswordButton({ children }: ChangePasswordButtonProps) {
  return (
    <ModalButton
      modal={ChangePasswordModal}
    >
      {children}
    </ModalButton>
  );
}