import {
  type Participant,
  Track,
  type Room,
  RoomEvent,
  type RemoteTrackPublication,
} from 'livekit-client';
import _ from 'lodash';

import { playAudio } from '@utils';

import connectAudio from '@assets/audio/connect.mp3';
import disconnectAudio from '@assets/audio/disconnect.mp3';
import startStreamAudio from '@assets/audio/start-stream.mp3';
import stopStreamAudio from '@assets/audio/stop-stream.mp3';

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

export const setupAudioEffects = (room?: Room) => {
  const eventDict = {
    [RoomEvent.ParticipantConnected]: () => { playAudio(connectAudio); },
    [RoomEvent.ParticipantDisconnected]: () => { playAudio(disconnectAudio); },
    [RoomEvent.TrackPublished]: (publication: RemoteTrackPublication) => {
      switch (publication.track?.source) {
        case Track.Source.ScreenShare: playAudio(startStreamAudio); break;
        default: break;
      }
    },
    [RoomEvent.TrackUnpublished]: (publication: RemoteTrackPublication) => {
      switch (publication.track?.source) {
        case Track.Source.ScreenShare: playAudio(stopStreamAudio); break;
        default: break;
      }
    },
  };
  
  const addAudioEffects = () => {
    if (!room) return null;
    
    _.map(eventDict, (handler, event: RoomEvent) => {
      room.on(event, handler);
    });
  };

  const removeAudioEffects = () => {
    if (!room) return null;
    
    _.map(eventDict, (handler, event: RoomEvent) => {
      room.off(event, handler);
    });
  };

  return { addAudioEffects, removeAudioEffects };
}