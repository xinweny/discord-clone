import {
  useParticipantContext,
} from '@livekit/components-react';

import { useGetUserQuery } from '@features/users/api';

import { Avatar } from '@components/ui/media';

import { ParticipantTracks } from '../stream';

import styles from './dm-participant-tile.module.scss';

export function DmParticipantTile() {
  const participant = useParticipantContext();

  const {
    identity: userId,
    isMicrophoneEnabled,
    isSpeaking,
  } = participant;

  const { data: user } = useGetUserQuery(userId, { skip: !userId });

  if (!user) return null;

  const displayName = user?.displayName as string;

  const avatarUrl = user?.avatarUrl as string;

  return (
    <div className={styles.tile}>
      <ParticipantTracks
        placeholder={<Avatar
          className={`${styles.avatar} ${isSpeaking ? styles.speaking : ''}`}
          src={avatarUrl}
        />}
        displayName={displayName}
      />
      {isMicrophoneEnabled || <img src="" alt="Muted" />}
    </div>
  );
}