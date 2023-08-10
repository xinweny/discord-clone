import type { ModalProps } from '@types';

import { CHANNEL_SETTINGS } from './tabs';

import { SettingsModal } from '@components/ui/modals';

import { ChannelSettingsScreen } from './channel-settings-screen';
import { ChannelSettingsSidebar } from './channel-settings-sidebar';

export function EditChannelModal({
  isOpen,
  onClose,
}: ModalProps) {
  return (
    <SettingsModal
      isOpen={isOpen}
      onClose={onClose}
      initialTabId={CHANNEL_SETTINGS[0].id}
      sidebar={ChannelSettingsSidebar}
      content={ChannelSettingsScreen}
    />
  );
}