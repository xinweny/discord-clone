import _ from 'lodash';

import { TabGroup, TabItem } from '@components/ui';

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
      <TabGroup title="USER SETTINGS">
        {_.map(USER_SETTINGS_TABS,
          (val, key) => (
            <TabItem
              key={key}
              tabId={key}
              activeTabId={activeTabId}
              setActiveTabId={setActiveTabId}
            >
              {val}
            </TabItem>
          )
        )}
      </TabGroup>
      <TabGroup>
        <LogoutButton />
      </TabGroup>
    </div>
  );
}