import { Link } from 'react-router-dom';

import type { ChannelData } from '../types';

import { ChannelLabel } from './channel-label';

import styles from './text-channel-list-item.module.scss';

type TextChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function TextChannelListItem({ channel, serverId }: TextChannelListItemProps) {
  return (
    <div className={styles.button}>
      <Link to={`/channels/${serverId}/${channel._id}`}>
        <ChannelLabel channel={channel} />
      </Link>
    </div>
  );
}