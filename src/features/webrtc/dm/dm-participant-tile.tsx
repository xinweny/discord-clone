import {
  useParticipantContext,
} from '@livekit/components-react';

import { useGetUserQuery } from '@features/users/api';

import { Avatar } from '@components/ui/media';

import { ParticipantTracks } from '../stream';

import MutedIcon from '@assets/icons/microphone-mute.svg?react';

import styles from './dm-participant-tile.module.scss';

type DmParticipantTileProps = {
  isFocus?: boolean;
};

export function DmParticipantTile({ isFocus = true }: DmParticipantTileProps) {
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
        placeholder={(
          <div className={`${styles.wrapper} ${isSpeaking ? styles.speaking : ''}`}>
            <Avatar
              className={styles.avatar}
              src={avatarUrl}
            />
            {!isMicrophoneEnabled && (
              <div className={styles.notification}>
                <MutedIcon />
              </div>
            )}
          </div>
        )}
        displayName={displayName}
        className={styles.tracks}
        isFocus={isFocus}
      />
    </div>
  );
}