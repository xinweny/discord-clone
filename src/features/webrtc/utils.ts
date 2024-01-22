import { type Participant, Track } from 'livekit-client';

export const getParticipantTracks = (participant?: Participant) => {
  if (!participant) return null;

  const cameraTrack = participant.getTrack(Track.Source.Camera);
  const ssTrack = participant.getTrack(Track.Source.ScreenShare);
  const audioTrack = participant.getTrack(Track.Source.Microphone);
  const ssAudioTrack = participant.getTrack(Track.Source.ScreenShareAudio);

  return {
    cameraTrack,
    ssTrack,
    audioTrack,
    ssAudioTrack,
  };
};