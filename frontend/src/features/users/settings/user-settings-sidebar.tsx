import _ from 'lodash';

import { USER_SETTINGS_TABS } from '../tabs';

import { TabGroupLayout } from '@components/layouts';
import { SettingsSidebar, SettingsSidebarProps } from '@components/ui/presentation';

import { LogoutButton } from '@features/auth/logout';

export function UserSettingsSidebar({
  activeTabId,
  setActiveTabId,
}: SettingsSidebarProps) {
  return (
    <SettingsSidebar>
      <TabGroupLayout
        title="USER SETTINGS"
        tabs={USER_SETTINGS_TABS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
        <LogoutButton />
      </TabGroupLayout>
    </SettingsSidebar>
  );
}