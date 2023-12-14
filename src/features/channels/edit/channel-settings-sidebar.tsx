import { CHANNEL_SETTINGS } from './tabs';

import { useChannelContext } from '../context';

import { TabGroupLayout } from '@components/layouts';
import { SettingsSidebar, SettingsSidebarProps } from '@components/ui/presentation';

import { DeleteChannelButton } from '../delete';

export function ChannelSettingsSidebar({
  activeTabId, setActiveTabId
}: SettingsSidebarProps) {
  const channel = useChannelContext();

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