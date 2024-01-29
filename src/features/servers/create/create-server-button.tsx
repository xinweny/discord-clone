import { CreateServerModal } from './create-server-modal';

import { ModalButton } from '@components/ui/buttons';

import PlusIcon from '@assets/icons/plus.svg?react';

export function CreateServerButton() {
  return (
    <ModalButton
      modal={CreateServerModal}
    >
        <PlusIcon width="24" height="24" />
    </ModalButton>
  );
}