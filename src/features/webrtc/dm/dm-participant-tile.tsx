import {
  useParticipantContext,
  VideoTrack,
  AudioTrack,
} from '@livekit/components-react';

import { getParticipantTracks } from '../utils';

import { Avatar, TrackContainer } from '@components/ui/media';

import { useGetUserQuery } from '@features/users/api';

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
    isScreenShareEnabled,
    isCameraEnabled,
    isSpeaking,
  } = participant;

  const { data: user } = useGetUserQuery(userId, { skip: !userId });

  if (!user) return null;

  const displayName = user?.displayName as string;

  const avatarUrl = user?.avatarUrl as string;

  const {
    cameraTrack,
    ssTrack,
    audioTrack,
    ssAudioTrack,
  } = getParticipantTracks(participant);

  const trackContainerProps = {
    label: displayName,
    isMicrophoneEnabled,
    showDetails: isFocus,
  };

  return (
    <div className={styles.tile}>
      {isCameraEnabled || isScreenShareEnabled
        ? <>
          {(isScreenShareEnabled && ssTrack)
            ? (
              <TrackContainer {...trackContainerProps}>
                <VideoTrack trackRef={ssTrack} className={styles.videoTrack} />
                {ssAudioTrack && <AudioTrack trackRef={ssAudioTrack} />}
              </TrackContainer>
            )
            : ((isCameraEnabled && cameraTrack) && (
              <TrackContainer {...trackContainerProps}>
                <VideoTrack trackRef={cameraTrack} className={styles.videoTrack} />
              </TrackContainer>
            ))}
        </>
        : (
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
        )
      }
      {(isMicrophoneEnabled && audioTrack) && <AudioTrack trackRef={audioTrack} />}
    </div>
  );
}