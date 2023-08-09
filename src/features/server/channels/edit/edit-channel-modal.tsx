import type { ModalProps } from '@types';
import type { ChannelData } from '../api';

import { CHANNEL_SETTINGS } from './tabs';

import { SettingsModal } from '@components/ui/modals';

import { ChannelSettingsScreen } from './channel-settings-screen';
import { ChannelSettingsSidebar } from './channel-settings-sidebar';

type UserSettingsModal = {
  channel: ChannelData
} & ModalProps;

export function EditChannelModal({
  isOpen,
  onClose,
}: UserSettingsModal) {
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