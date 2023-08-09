import { useContext } from 'react';

import { CHANNEL_SETTINGS } from './tabs';

import { ChannelContext } from './edit-channel-button';

import { TabGroupLayout } from '@components/layouts';

type ChannelSettingsSidebarProps = {
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

export function ChannelSettingsSidebar({
  activeTabId, setActiveTabId
}: ChannelSettingsSidebarProps) {
  const channel = useContext(ChannelContext);

  return (
    <div>
      <TabGroupLayout
        title={`#${channel?.name.toUpperCase()}`}
        tabs={CHANNEL_SETTINGS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
      </TabGroupLayout>
    </div>
  );
}