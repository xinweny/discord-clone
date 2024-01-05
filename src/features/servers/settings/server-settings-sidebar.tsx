import { useContext } from 'react';

import { SERVER_SETTINGS } from '../tabs';

import { ServerContext } from '../context';

import { TabGroupLayout } from '@components/layouts';
import { SettingsSidebar, SettingsSidebarProps } from '@components/ui/presentation';

import { DeleteServerButton } from '../delete';

export function ServerSettingsSidebar({
  activeTabId, setActiveTabId
}: SettingsSidebarProps) {
  const server = useContext(ServerContext);

  return (
    <SettingsSidebar>
      <TabGroupLayout
        title={`${server?.name.toUpperCase()}`}
        tabs={SERVER_SETTINGS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
        <DeleteServerButton />
      </TabGroupLayout>
    </SettingsSidebar>
  );
}