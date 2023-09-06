import { SERVER_SETTINGS } from './tabs';

import { SettingsScreen, SettingsScreenWrapperProps } from '@components/ui/presentation';

export function ServerSettingsScreen({ activeTabId }: SettingsScreenWrapperProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={SERVER_SETTINGS}
    />
  );
}