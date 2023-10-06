import {
  AudioTrack,
  VideoTrack,
  useTrackRefContext,
} from '@livekit/components-react';

import { useGetUserQuery } from '@features/users/api';
import { useGetUserServerMemberQuery } from '@features/members/api';

type CallParticipantTrackProps = {
  serverId?: string;
};

export function CallParticipantTrack({ serverId }: CallParticipantTrackProps) {
  const track = useTrackRefContext();

  const { participant } = track;

  const {
    identity: userId,
    isCameraEnabled,
    isMicrophoneEnabled,
    isScreenShareEnabled,
  } = participant;

  const { data: user } = useGetUserQuery(
    userId,
    { skip: !userId || !!serverId }
  );
  const { data: member } = useGetUserServerMemberQuery({
    userId,
    serverId: serverId!,
  },
  { skip: !userId || !serverId }
  );

  if (!user && !member) return null;

  const displayName = user?.displayName || member?.displayName as string;

  const avatarUrl = user?.avatarUrl || member?.user.avatarUrl as string;

  return (
    <div>
      {isCameraEnabled || isScreenShareEnabled
        ? <VideoTrack
          trackRef={track}
        />
        : <img src={avatarUrl} />
      }
      <p>{displayName}</p>
      {(isMicrophoneEnabled) && <AudioTrack trackRef={track.publication?.audioTrack} />}
    </div>
  );
}