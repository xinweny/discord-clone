import { USER_SETTINGS } from './tabs';

import { SettingsScreen, SettingsScreenWrapperProps } from '@components/ui/presentation';

export function UserSettingsScreen({ activeTabId }: SettingsScreenWrapperProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={USER_SETTINGS}
    />
  );
}