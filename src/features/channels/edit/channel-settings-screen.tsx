import { CHANNEL_SETTINGS } from './tabs';

import { SettingsScreen } from '@components/ui/presentation';

type ChannelSettingsProps = {
  activeTabId: string;
};

export function ChannelSettingsScreen({ activeTabId }: ChannelSettingsProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={CHANNEL_SETTINGS}
    />
  );
}