import { type ChannelData, ChannelTypes } from '../types';

import { EditChannelButton } from '../edit';
import { TextChannelListItem } from './text-channel-list-item';
import { VoiceChannelListItem } from './voice-channel-list-item';

import GearIcon from '@assets/icons/gear.svg?react';

import styles from './channel-list-item.module.scss';

type ChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
  activeId: string | undefined;
};

export function ChannelListItem({ channel, serverId, activeId }: ChannelListItemProps) {
  return (
    <div
      className={`${styles.wrapper} ${activeId === channel._id ? styles.active : ''}`}
    >
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
      <EditChannelButton channel={channel} className={styles.editButton}>
        <GearIcon />
      </EditChannelButton>
    </div>
  );
}