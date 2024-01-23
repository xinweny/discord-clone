import type { ChannelData } from '../types';

import { useSocketRoomJoin } from '@services/websocket/hooks';

import { ChannelLabel } from './channel-label';

import { ConnectToRoomButton } from '@features/webrtc/connect';
import { ChannelOngoingCallPreview } from '@features/webrtc/channel';

import styles from './voice-channel-list-item.module.scss';

type VoiceChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function VoiceChannelListItem({ channel, serverId }: VoiceChannelListItemProps) {
  useSocketRoomJoin(channel._id);

  return (
    <>
      <div className={styles.button}>
        <ConnectToRoomButton
          roomId={channel._id}
          roomName={channel.name}
          serverId={serverId}
        >
          <ChannelLabel channel={channel} />
        </ConnectToRoomButton>
      </div>
      <ChannelOngoingCallPreview
        serverId={serverId}
        roomId={channel._id}
      />
    </>
  );
}