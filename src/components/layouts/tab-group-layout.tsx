import _ from 'lodash';

import { TabGroup } from '../ui/presentation/tab-group';
import { TabItemButton } from '../ui/buttons';

type UserSettingsSidebarProps = {
  title?: string;
  activeTabId?: string;
  setActiveTabId?: React.Dispatch<React.SetStateAction<string>>;
  tabDict?: {
    [key: string]: React.ReactNode;
  };
  children?: React.ReactNode;
};

export function TabGroupLayout({
  title,
  activeTabId,
  setActiveTabId,
  tabDict,
  children,
}: UserSettingsSidebarProps) {
  return (
    <TabGroup title={title}>
      {(tabDict && activeTabId && setActiveTabId) &&
        _.map(tabDict, (val, key) => (
          <TabItemButton
            key={key}
            tabId={key}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
          >
            {val}
          </TabItemButton>
        ))
      }
      {children}
    </TabGroup>
  );
}