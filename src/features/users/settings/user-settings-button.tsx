import { ModalButton } from '@components/ui/buttons';
import { Tooltip } from '@components/ui/popups';

import { UserSettingsModal } from './user-settings-modal';

import SettingsIcon from '@assets/icons/gear.svg?react';

export function UserSettingsButton() {
  return (
    <Tooltip
      text="User Settings"
      direction="top"
      options={{ gap: '4px' }}
    >
      <ModalButton
        modal={UserSettingsModal}
      >
        <SettingsIcon />
      </ModalButton>
    </Tooltip>
  );
}