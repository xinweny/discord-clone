import { USER_SETTINGS_TABS } from '../tabs';

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
      initialTabId={USER_SETTINGS_TABS[0].id}
      sidebar={UserSettingsSidebar}
      content={UserSettingsScreen}
    />
  );
}