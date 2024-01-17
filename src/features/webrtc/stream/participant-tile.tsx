import {
  useParticipantContext,
} from '@livekit/components-react';

import { useGetUserQuery } from '@features/users/api';
import { useGetUserServerMemberQuery } from '@features/members/api';

import { Gif } from '@components/ui/media';

import { ParticipantTracks } from './participant-tracks';

import styles from './participant-tile.module.scss';

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
    <div className={styles.tile}>
      <ParticipantTracks
        placeholder={<Gif className={styles.avatar} src={avatarUrl} />}
        displayName={displayName}
      />
      <span>{displayName}</span>
      {isMicrophoneEnabled || <img src="" alt="Muted" />}
    </div>
  );
}