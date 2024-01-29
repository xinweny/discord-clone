import { type ChannelData, ChannelTypes } from '../types';

import { Tooltip } from '@components/ui/popups';

import { EditChannelButton } from '../edit';
import { TextChannelListItem } from './text-channel-list-item';
import { VoiceChannelListItem } from './voice-channel-list-item';

import { ChannelOngoingCallPreview } from '@features/webrtc/channel';

import GearIcon from '@assets/icons/gear.svg?react';

import styles from './channel-list-item.module.scss';

type ChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
  activeId: string | undefined;
};

export function ChannelListItem({ channel, serverId, activeId }: ChannelListItemProps) {
  const { _id: channelId } = channel;

  return (
    <>
      <div
        className={`${styles.wrapper} ${activeId === channelId ? styles.active : ''}`}
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
          <Tooltip text="Edit Channel" direction="top" gap={4}>
            <GearIcon />
          </Tooltip>
        </EditChannelButton>
      </div>
      {channel.type === ChannelTypes.VOICE && (
        <ChannelOngoingCallPreview
          serverId={serverId}
          roomId={channelId}
        />
      )}
    </>
  );
}