import { CATEGORY_SETTINGS } from './tabs';

import { SettingsScreen, SettingsScreenWrapperProps } from '@components/ui/presentation';

export function CategorySettingsScreen({ activeTabId }: SettingsScreenWrapperProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={CATEGORY_SETTINGS}
    />
  );
}