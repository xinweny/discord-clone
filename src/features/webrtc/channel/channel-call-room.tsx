import type { ChannelData } from '@features/channels/types';

import { useLivekitContext } from '../hooks';

import { ChannelOngoingCall } from './channel-ongoing-call';
import { ChannelCall } from './channel-call';

type ChannelCallRoomProps = {
  channel: ChannelData;
};

export function ChannelCallRoom({ channel }: ChannelCallRoomProps) {
  const livekit = useLivekitContext();

  if (!livekit) return null;

  const { isCurrentRoom } = livekit;

  return isCurrentRoom(channel._id)
    ? (<ChannelCall />)
    : <ChannelOngoingCall channel={channel} />;
}