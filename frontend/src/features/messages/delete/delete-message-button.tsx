import type { ModalButtonProps } from '@components/ui/buttons';

import { ModalButton } from '@components/ui/buttons';
import { DeleteMessageModal } from './delete-message-modal';

type DeleteMessageButtonProps = {
  afterClose?: () => void;
  next?: string | null | undefined;
} & ModalButtonProps;

export function DeleteMessageButton({
  children,
  afterClose,
  next,
  ...props
}: DeleteMessageButtonProps) {
  return (
    <ModalButton
      modal={DeleteMessageModal}
      modalProps={{ afterClose, next }}
      {...props}
    >
      {children}
    </ModalButton>
  );
}