import { CHANNEL_SETTINGS } from './tabs';

import { useChannelContext } from '../context';

import { TabGroupLayout } from '@components/layouts';
import { SettingsSidebar, SettingsSidebarProps } from '@components/ui/presentation';

import { DeleteChannelButton } from '../delete';

import TrashCanIcon from '@assets/icons/trash-can.svg?react';

import styles from './channel-settings-sidebar.module.scss';

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
        <DeleteChannelButton className={styles.button}>
          <span>Delete Channel</span>
          <TrashCanIcon />
        </DeleteChannelButton>
      </TabGroupLayout>
    </SettingsSidebar>
  );
}