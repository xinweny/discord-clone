import type { ModalButtonProps } from '@components/ui/buttons';

import { ModalButton } from '@components/ui/buttons';
import { DeleteMessageModal } from './delete-message-modal';

type DeleteMessageButtonProps = {
  afterClose?: () => void;
} & ModalButtonProps;

export function DeleteMessageButton({
  children,
  afterClose,
  ...props
}: DeleteMessageButtonProps) {
  return (
    <ModalButton
      modal={DeleteMessageModal}
      modalProps={{ afterClose }}
      {...props}
    >
      {children}
    </ModalButton>
  );
}