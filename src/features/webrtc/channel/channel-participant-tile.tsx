import {
  useParticipantContext,
} from '@livekit/components-react';

import { useGetUserServerMemberQuery } from '@features/members/api';

type ChannelParticipantTileProps = {
  serverId: string;
};

export function ChannelParticipantTile({ serverId }: ChannelParticipantTileProps) {
  const participant = useParticipantContext();

  const {
    identity: userId,
    isMicrophoneEnabled,
  } = participant;

  const { data: member } = useGetUserServerMemberQuery({
    userId,
    serverId,
  }, { skip: !userId || !serverId });

  if (!member) return null;

  const displayName = member?.displayName as string;

  const avatarUrl = member?.user.avatarUrl as string;

  return (
    <div>
      <span>{displayName}</span>
      {isMicrophoneEnabled || <img src="" alt="Muted" />}
    </div>
  );
}