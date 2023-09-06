import { useServerAuthorize } from '@hooks';

import { ModalButton } from '@components/ui/buttons';
import { DeleteServerModal } from './delete-server-modal';

export function DeleteServerButton() {
  const authorized = useServerAuthorize('administrator');

  if (!authorized) return null;

  return (
    <ModalButton
      modal={DeleteServerModal}
    >
      Delete Server
    </ModalButton>
  );
}