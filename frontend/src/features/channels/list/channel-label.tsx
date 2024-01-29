import type { ChannelData } from '../types';

import { ChannelIcon } from '.';

import styles from './channel-label.module.scss';

type ChannelLabelProps = {
  channel: ChannelData;
};

export function ChannelLabel({ channel }: ChannelLabelProps) {  
  return (
    <div className={styles.item}>
      <ChannelIcon type={channel.type} />
      <p>{channel.name}</p>
    </div>
  );
}