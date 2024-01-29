import { ChangePasswordModal } from './change-password-modal';

import { ModalButton } from '@components/ui/buttons';

type ChangePasswordButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function ChangePasswordButton({ children, className }: ChangePasswordButtonProps) {
  return (
    <ModalButton
      modal={ChangePasswordModal}
      className={className}
    >
      {children}
    </ModalButton>
  );
}