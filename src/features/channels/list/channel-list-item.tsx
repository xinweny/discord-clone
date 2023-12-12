import { type ChannelData, ChannelTypes } from '../types';

import { TextChannelListItem } from './text-channel-list-item';
import { VoiceChannelListItem } from './voice-channel-list-item';

import styles from './channel-list-item.module.scss';

type ChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function ChannelListItem({ channel, serverId }: ChannelListItemProps) {
  return (
    <div className={styles.wrapper}>
      {channel.type === ChannelTypes.TEXT
        ? <TextChannelListItem
          channel={channel}
          serverId={serverId}
        />
        : <VoiceChannelListItem
          channel={channel}
          serverId={serverId}
        />
      }
    </div>
  );
}