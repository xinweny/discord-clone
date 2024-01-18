import {
  useParticipantContext,
  VideoTrack,
  AudioTrack,
} from '@livekit/components-react';

import { getParticipantTracks } from '../utils';

import { TrackContainer } from '@components/ui/media';

import { CallAvatar } from '../stream';

import { useGetUserQuery } from '@features/users/api';

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
  } = participant;

  const { data: user } = useGetUserQuery(userId, { skip: !userId });

  if (!user) return null;

  const displayName = user?.displayName as string;

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
        : <CallAvatar participant={participant} />
      }
      {(isMicrophoneEnabled && audioTrack) && <AudioTrack trackRef={audioTrack} />}
    </div>
  );
}