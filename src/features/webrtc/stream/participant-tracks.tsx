import {
  useParticipantContext,
  AudioTrack,
  VideoTrack,
} from '@livekit/components-react';

type ParticipantTracksProps = {
  placeholder: React.ReactNode;
};

export function ParticipantTracks({
  placeholder
}: ParticipantTracksProps) {
  const participant = useParticipantContext();

  const { tracks } = participant;

  const {
    isCameraEnabled,
    isMicrophoneEnabled,
    isScreenShareEnabled,
  } = participant;

  return (
    <div>
      {isCameraEnabled || isScreenShareEnabled
        ? <></>
        : placeholder
      }
      {isMicrophoneEnabled || <img src="" alt="Muted" />}
    </div>
  );
}