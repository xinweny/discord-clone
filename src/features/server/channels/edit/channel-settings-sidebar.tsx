import { useContext } from 'react';

import { ChannelContext } from './edit-channel-button';

import { TabGroupLayout } from '@components/layouts';

type ChannelSettingsSidebarProps = {
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

const CHANNEL_SETTINGS_TABS = {
  overview: 'Overview',
};

export function ChannelSettingsSidebar({
  activeTabId, setActiveTabId
}: ChannelSettingsSidebarProps) {
  const channel = useContext(ChannelContext);

  return (
    <div>
      <TabGroupLayout
        title={`#${channel?.name.toUpperCase()}`}
        tabDict={CHANNEL_SETTINGS_TABS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
      </TabGroupLayout>
    </div>
  );
}