import {
  useParticipantContext,
  AudioTrack,
  VideoTrack,
} from '@livekit/components-react';

import { TrackContainer } from '@components/ui/media';

import { getParticipantTracks } from '../utils';

type ParticipantTracksProps = {
  placeholder: React.ReactNode;
  displayName: string;
};

export function ParticipantTracks({
  placeholder,
  displayName,
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
  };

  return (
    <>
      {isCameraEnabled || isScreenShareEnabled
        ? <>
          {(isScreenShareEnabled && ssTrack) && (
            <TrackContainer {...trackContainerProps}>
              <VideoTrack trackRef={ssTrack} />
              {ssAudioTrack && <AudioTrack trackRef={ssAudioTrack} />}
            </TrackContainer>
          )}
          {(isCameraEnabled && cameraTrack) && (
            <TrackContainer {...trackContainerProps}>
              <VideoTrack
                trackRef={cameraTrack}
              />
            </TrackContainer>
          )}
        </>
        : placeholder
      }
      {(isMicrophoneEnabled && audioTrack) && <AudioTrack trackRef={audioTrack} />}
    </>
  );
}