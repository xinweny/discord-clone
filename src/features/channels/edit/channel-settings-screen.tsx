import { CHANNEL_SETTINGS } from './tabs';

import { SettingsScreen, SettingsScreenWrapperProps } from '@components/ui/presentation';

export function ChannelSettingsScreen({ activeTabId }: SettingsScreenWrapperProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={CHANNEL_SETTINGS}
    />
  );
}