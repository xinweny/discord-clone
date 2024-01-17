import {
  useParticipantContext,
  AudioTrack,
  VideoTrack,
} from '@livekit/components-react';

import { TrackContainer } from '@components/ui/media';

import { getParticipantTracks } from '../utils';

import styles from './participant-tracks.module.scss';

type ParticipantTracksProps = {
  placeholder: React.ReactNode;
  displayName: string;
  className?: string;
  isFocus?: boolean;
};

export function ParticipantTracks({
  placeholder,
  displayName,
  className,
  isFocus = true,
}: ParticipantTracksProps) {
  const participant = useParticipantContext();

  const {
    isCameraEnabled,
    isMicrophoneEnabled,
    isScreenShareEnabled,
  } = participant;

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
    <div className={`${styles.container} ${className || ''}`}>
      {isCameraEnabled || isScreenShareEnabled
        ? <>
          {(isScreenShareEnabled && ssTrack) && (
            <TrackContainer {...trackContainerProps}>
              <VideoTrack trackRef={ssTrack} className={styles.videoTrack} />
              {ssAudioTrack && <AudioTrack trackRef={ssAudioTrack} />}
            </TrackContainer>
          )}
          {(isCameraEnabled && cameraTrack) && (
            <TrackContainer {...trackContainerProps}>
              <VideoTrack trackRef={cameraTrack} className={styles.videoTrack} />
            </TrackContainer>
          )}
        </>
        : placeholder
      }
      {(isMicrophoneEnabled && audioTrack) && <AudioTrack trackRef={audioTrack} />}
    </div>
  );
}