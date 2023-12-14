import type { ModalButtonProps } from '@components/ui/buttons';

import { ModalButton } from '@components/ui/buttons';
import { DeleteMessageModal } from './delete-message-modal';

export function DeleteMessageButton({
  children,
  ...props
}: ModalButtonProps) {
  return (
    <ModalButton
      modal={DeleteMessageModal}
      {...props}
    >
      {children}
    </ModalButton>
  );
}