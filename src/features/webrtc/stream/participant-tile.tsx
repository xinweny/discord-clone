import {
  useParticipantContext,
} from '@livekit/components-react';

import { useGetUserQuery } from '@features/users/api';
import { useGetUserServerMemberQuery } from '@features/members/api';
import { ParticipantTracks } from './participant-tracks';

type ParticipantTileProps = {
  serverId?: string;
};

export function ParticipantTile({ serverId }: ParticipantTileProps) {
  const participant = useParticipantContext();

  const {
    identity: userId,
    isMicrophoneEnabled,
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
      <ParticipantTracks
        placeholder={<img src={avatarUrl} />}
      />
      <p>{displayName}</p>
      {isMicrophoneEnabled || <img src="" alt="Muted" />}
    </div>
  );
}