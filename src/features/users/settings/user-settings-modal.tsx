import { USER_SETTINGS } from './tabs';

import { SettingsModal } from '@components/ui/modals';

import type { ModalProps } from '@types';

import { UserSettingsSidebar } from './user-settings-sidebar';
import { UserSettingsScreen } from './user-settings-screen';

type UserSettingsModal = ModalProps;

export function UserSettingsModal({
  isOpen,
  onClose,
}: UserSettingsModal) {
  return (
    <SettingsModal
      isOpen={isOpen}
      onClose={onClose}
      initialTabId={USER_SETTINGS[0].id}
      sidebar={UserSettingsSidebar}
      content={UserSettingsScreen}
    />
  );
}