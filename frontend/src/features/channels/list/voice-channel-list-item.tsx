import type { ChannelData } from '../types';

import { useSocketRoomJoin } from '@services/websocket/hooks';

import { ChannelLabel } from './channel-label';

import { ConnectToRoomButton } from '@features/webrtc/connect';

import styles from './voice-channel-list-item.module.scss';

type VoiceChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function VoiceChannelListItem({ channel, serverId }: VoiceChannelListItemProps) {
  const { _id: roomId, name } = channel;

  useSocketRoomJoin(roomId);

  return (
    <div className={styles.button}>
      <ConnectToRoomButton
        roomId={roomId}
        roomName={name}
        serverId={serverId}
      >
        <ChannelLabel channel={channel} />
      </ConnectToRoomButton>
    </div>
  );
}