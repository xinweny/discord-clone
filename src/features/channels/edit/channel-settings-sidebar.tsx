import { useContext } from 'react';

import { CHANNEL_SETTINGS } from './tabs';

import { ChannelContext } from '../context';

import { TabGroupLayout } from '@components/layouts';
import { SettingsSidebar, SettingsSidebarProps } from '@components/ui/presentation';

import { DeleteChannelButton } from '../delete';

export function ChannelSettingsSidebar({
  activeTabId, setActiveTabId
}: SettingsSidebarProps) {
  const channel = useContext(ChannelContext);

  return (
    <SettingsSidebar>
      <TabGroupLayout
        title={`#${channel?.name.toUpperCase()}`}
        tabs={CHANNEL_SETTINGS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
        <DeleteChannelButton />
      </TabGroupLayout>
    </SettingsSidebar>
  );
}