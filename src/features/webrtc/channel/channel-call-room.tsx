import type { ChannelData } from '@features/channels/types';

import { useLivekitContext } from '../hooks';

import { useParticipants } from '@livekit/components-react';

type ChannelCallRoomProps = {
  channel: ChannelData;
};

export function ChannelCallRoom({ channel }: ChannelCallRoomProps) {
  const livekit = useLivekitContext();

  if (!livekit) return null;

  const { isCurrentRoom } = livekit;

  return isCurrentRoom(channel._id)
    ? (<></>)
    : (
      <div>

      </div>
    );
}