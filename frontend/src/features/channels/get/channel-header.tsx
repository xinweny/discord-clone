import { useActiveChannel } from '@features/channels/hooks';
import { useLivekitContext } from '@features/webrtc/hooks';

import { ChannelTypes } from '../types';

import {
  ChannelCall,
  ChannelOngoingCall,
} from '@features/webrtc/channel';

import { ChannelIcon } from '@features/channels/list';
import { ChannelHeaderButtons } from './channel-header-buttons';

import styles from './channel-header.module.scss';

export function ChannelHeader() {
  const channel = useActiveChannel();

  const { _id: roomId, type } = channel;

  const livekit = useLivekitContext();

  const isInCurrentRoomCall = livekit?.isCurrentRoom(roomId);

  if (!channel) return null;

  const header = (
    <div className={styles.header}>
      <ChannelIcon type={channel.type} />
      <div className={styles.text}>
        <h1>{channel.name}</h1>
        {channel.description && (
          <p>{channel.description}</p>
        )}
      </div>
      {type === ChannelTypes.TEXT && <ChannelHeaderButtons />}
    </div>
  );

  if (channel.type === ChannelTypes.TEXT) return header;

  return (isInCurrentRoomCall
    ? <ChannelCall
      header={header}
    />
    : <ChannelOngoingCall
      header={header}
      channel={channel}
    />
  );
}