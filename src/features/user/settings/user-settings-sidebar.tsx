import { TabGroup } from '@components/ui';

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
      <TabGroup title="USER SETTINGS">
        
      </TabGroup>
      <TabGroup>
        <LogoutButton />
      </TabGroup>
    </div>
  );
}