import { useHover } from '@uidotdev/usehooks';

import type { ChannelData } from '../types';

import { useSocketRoomJoin } from '@services/websocket/hooks';

import { ChannelLabel } from './channel-label';

import { ConnectToRoomButton } from '@features/webrtc/connect';
import { EditChannelButton } from '../edit';
import { ChannelOngoingCallPreview } from '@features/webrtc/channel';

type VoiceChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function VoiceChannelListItem({ channel, serverId }: VoiceChannelListItemProps) {
  const [hoverRef, isHovered] = useHover();

  useSocketRoomJoin(channel._id);

  return (
    <div>
      <div ref={hoverRef}>
        <ConnectToRoomButton
          roomId={channel._id}
          roomName={channel.name}
          serverId={serverId}
        >
          <ChannelLabel channel={channel} />
        </ConnectToRoomButton>
        {isHovered && <EditChannelButton channel={channel} />}
      </div>
      <ChannelOngoingCallPreview
        serverId={serverId}
        roomId={channel._id}
      />
    </div>
  );
}