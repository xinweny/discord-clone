import { CreateServerModal } from './create-server-modal';

import { ModalButton } from '@components/ui/buttons';

export function CreateServerButton() {
  return (
    <ModalButton
      modal={CreateServerModal}
    >
      <img src="#" alt="Add a Server" />
    </ModalButton>
  );
}