import { useActiveChannel } from '@features/channels/hooks';

import { ChannelIcon } from '@features/channels/list';
import { ChannelHeaderButtons } from './channel-header-buttons';

import styles from './channel-header.module.scss';

export function ChannelHeader() {
  const channel = useActiveChannel();

  if (!channel) return null;

  return (
    <div className={styles.header}>
      <ChannelIcon type={channel.type} />
      <div className={styles.text}>
        <h1>{channel.name}</h1>
        {channel.description && (
          <p>{channel.description}</p>
        )}
      </div>
      <ChannelHeaderButtons />
    </div>
  );
}