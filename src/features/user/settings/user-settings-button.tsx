import { ModalButton } from '@components/ui/buttons';

import { UserSettingsModal } from './user-settings-modal';

export function UserSettingsButton() {
  return (
    <ModalButton
      modal={UserSettingsModal}
    >
      <img src="#" alt="User settings" />
    </ModalButton>
  );
}