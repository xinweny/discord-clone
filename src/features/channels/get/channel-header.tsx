import { useActiveChannel } from '@features/channels/hooks';

import { ChannelIcon } from '@features/channels/list';

import styles from './channel-header.module.scss';

export function ChannelHeader() {
  const channel = useActiveChannel();

  if (!channel) return null;

  return (
    <div className={styles.header}>
      <ChannelIcon type={channel.type} />
      <h1>{channel.name}</h1>
      {channel.description && (
        <p>{channel.description}</p>
      )}
    </div>
  );
}