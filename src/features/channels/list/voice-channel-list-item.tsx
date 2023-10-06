import type { ChannelData } from '../types';

import { useSocketRoomJoin } from '@hooks';
import { useDisplay } from '@components/hooks';

import { ConnectToRoomButton } from '@features/webrtc/connect';
import { EditChannelButton } from '../edit';
import { ChannelOngoingCall } from '@features/webrtc/get';

type VoiceChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function VoiceChannelListItem({ channel, serverId }: VoiceChannelListItemProps) {
  const { hover, visible } = useDisplay();

  useSocketRoomJoin(channel._id);

  return (
    <div>
      <div {...hover}>
        <ConnectToRoomButton
          roomId={channel._id}
          roomName={channel.name}
          serverId={serverId}
        >
          {channel.name}
        </ConnectToRoomButton>
        {visible && <EditChannelButton channel={channel} />}
      </div>
      <ChannelOngoingCall
        serverId={serverId}
        roomId={channel._id}
      />
    </div>
  );
}