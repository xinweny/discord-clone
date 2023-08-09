import { CHANNEL_SETTINGS } from './tabs';

import { SettingsScreen } from '@components/ui/presentation';

type UserSettingsProps = {
  activeTabId: string;
};

export function ChannelSettingsScreen({ activeTabId }: UserSettingsProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={CHANNEL_SETTINGS}
    />
  );
}