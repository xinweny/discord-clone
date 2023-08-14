import { CATEGORY_SETTINGS } from './tabs';

import { SettingsScreen } from '@components/ui/presentation';

type CategorySettingsProps = {
  activeTabId: string;
};

export function CategorySettingsScreen({ activeTabId }: CategorySettingsProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      tabs={CATEGORY_SETTINGS}
    />
  );
}