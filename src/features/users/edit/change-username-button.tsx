import { ChangeUsernameModal } from './change-username-modal';

import { ModalButton } from '@components/ui/buttons';

type ChangeUsernameButtonProps = {
  children: React.ReactNode;
}

export function ChangeUsernameButton({ children }: ChangeUsernameButtonProps) {
  return (
    <ModalButton
      modal={ChangeUsernameModal}
    >
      {children}
    </ModalButton>
  );
}