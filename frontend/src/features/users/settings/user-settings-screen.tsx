import { USER_SETTINGS_TABS } from '../tabs';

import { SettingsScreen, SettingsScreenWrapperProps } from '@components/ui/presentation';

export function UserSettingsScreen({ activeTabId }: SettingsScreenWrapperProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={USER_SETTINGS_TABS}
    />
  );
}