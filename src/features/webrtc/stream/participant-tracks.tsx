import {
  useParticipantContext,
  AudioTrack,
  VideoTrack,
} from '@livekit/components-react';

import { getParticipantTracks } from '../utils';

type ParticipantTracksProps = {
  placeholder: React.ReactNode;
};

export function ParticipantTracks({
  placeholder
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

  return (
    <div>
      {isCameraEnabled || isScreenShareEnabled
        ? <div>
          {(isCameraEnabled && cameraTrack) && <VideoTrack
            trackRef={cameraTrack}
          />}
          {(isScreenShareEnabled && ssTrack) && <>
            <VideoTrack trackRef={ssTrack} />
            {ssAudioTrack && <AudioTrack trackRef={ssAudioTrack} />}
          </>}
        </div>
        : placeholder
      }
      {(isMicrophoneEnabled && audioTrack) && <AudioTrack trackRef={audioTrack} />}
    </div>
  );
}