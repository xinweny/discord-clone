import _ from 'lodash';

import { USER_SETTINGS } from './tabs';

import { TabGroupLayout } from '@components/layouts';

import { LogoutButton } from '@features/auth/logout';

type UserSettingsSidebarProps = {
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

export function UserSettingsSidebar({
  activeTabId, setActiveTabId
}: UserSettingsSidebarProps) {
  return (
    <div>
      <TabGroupLayout
        title="USER SETTINGS"
        tabs={USER_SETTINGS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
        <LogoutButton />
      </TabGroupLayout>
    </div>
  );
}