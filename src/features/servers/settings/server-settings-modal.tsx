import type { ModalProps } from '@types';

import { SERVER_SETTINGS } from '../tabs';

import { SettingsModal } from '@components/ui/modals';

import { ServerSettingsSidebar } from './server-settings-sidebar';
import { ServerSettingsScreen } from './server-settings-screen';

export function ServerSettingsModal({
  isOpen, onClose
}: ModalProps) {
  return (
    <SettingsModal
      isOpen={isOpen}
      onClose={onClose}
      initialTabId={SERVER_SETTINGS[0].id}
      sidebar={ServerSettingsSidebar}
      content={ServerSettingsScreen}
    />
  );
}