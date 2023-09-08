import type { ModalButtonProps } from '@components/ui/buttons';

import { useMessageAuthorize } from '../hooks';

import { ModalButton } from '@components/ui/buttons';
import { DeleteMessageModal } from './delete-message-modal';

export function DeleteMessageButton({
  children,
  ...props
}: ModalButtonProps) {
  const authorized = useMessageAuthorize();

  if (!authorized) return null;

  return (
    <ModalButton
      modal={DeleteMessageModal}
      {...props}
    >
      {children}
    </ModalButton>
  );
}