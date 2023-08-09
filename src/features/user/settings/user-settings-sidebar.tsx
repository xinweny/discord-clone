import _ from 'lodash';

import { TabGroupLayout } from '@components/layouts';

import { LogoutButton } from '@features/auth/logout';

type UserSettingsSidebarProps = {
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

const USER_SETTINGS_TABS = {
  my_account: 'My Account',
  profiles: 'Profiles',
};

export function UserSettingsSidebar({
  activeTabId, setActiveTabId
}: UserSettingsSidebarProps) {
  return (
    <div>
      <TabGroupLayout
        title="USER SETTINGS"
        tabDict={USER_SETTINGS_TABS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
        <LogoutButton />
      </TabGroupLayout>
    </div>
  );
}