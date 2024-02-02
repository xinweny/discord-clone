import { AudioTrack, useParticipants } from '@livekit/components-react';

import { getParticipantTracks } from '../utils';

export function CallAudio() {
  const participants = useParticipants();

  if (!participants || participants.length === 0) return null;

  return <div hidden>
    {participants.map(participant => {
      const { audioTrack, ssAudioTrack } = getParticipantTracks(participant)!;

      if (!participant.isMicrophoneEnabled || !audioTrack) return null;

      return (
        <div key={participant.identity}>
          {participant.isMicrophoneEnabled && audioTrack && (
            <AudioTrack
              // @ts-ignore
              trackRef={audioTrack}
              participant={participant}
            />
          )}
          {participant.isScreenShareEnabled && ssAudioTrack && (
            <AudioTrack
              // @ts-ignore
              trackRef={ssAudioTrack}
              participant={participant}
            />
          )}
        </div>
      );
    })}
  </div>;
}