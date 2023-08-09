import { USER_SETTINGS } from './tabs';

import { SettingsScreen } from '@components/ui/presentation';

type UserSettingsProps = {
  activeTabId: string;
};

export function UserSettingsScreen({ activeTabId }: UserSettingsProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={USER_SETTINGS}
    />
  );
}