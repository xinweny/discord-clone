import { TabData } from '@utils';

import { TabGroup } from '../ui/presentation/tab-group';
import { TabItemButton } from '../ui/buttons';

type UserSettingsSidebarProps = {
  title?: string;
  activeTabId?: string;
  setActiveTabId?: React.Dispatch<React.SetStateAction<string>>;
  tabs?: TabData[];
  children?: React.ReactNode;
};

export function TabGroupLayout({
  title,
  activeTabId,
  setActiveTabId,
  tabs,
  children,
}: UserSettingsSidebarProps) {
  return (
    <TabGroup title={title}>
      {(tabs && activeTabId && setActiveTabId) &&
        tabs.map(tab => (
          <TabItemButton
            key={tab.id}
            tabId={tab.id}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
          >
            {tab.label}
          </TabItemButton>
      ))}
      {children}
    </TabGroup>
  );
}