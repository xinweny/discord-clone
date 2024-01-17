import {
  useParticipantContext,
} from '@livekit/components-react';

import { useGetUserServerMemberQuery } from '@features/members/api';

import { Avatar } from '@components/ui/media';

import { ParticipantTracks } from '../stream';

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
      <ParticipantTracks
        placeholder={<Avatar
          src={avatarUrl}
        />}
        displayName={displayName}
      />
      <span>{displayName}</span>
      {isMicrophoneEnabled || <img src="" alt="Muted" />}
    </div>
  );
}