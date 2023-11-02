import { ModalButton } from '@components/ui/buttons';

import { UserSettingsModal } from './user-settings-modal';

import SettingsIcon from '@assets/icons/gear.svg?react';

export function UserSettingsButton() {
  return (
    <ModalButton
      modal={UserSettingsModal}
    >
      <SettingsIcon />
    </ModalButton>
  );
}