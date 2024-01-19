import { socket } from '@app';

import { useLivekitContext } from '../hooks';

import {
  LiveKitRoom,
} from '@livekit/components-react';

import { env } from '@config';
import { ParticipantsEvent } from '../types';
import { CallAudio } from './call-audio';

type LivekitRoomProps = {
  children: React.ReactNode;
};

export function LivekitRoom({ children }: LivekitRoomProps) {
  const livekit = useLivekitContext();


  if (!livekit) return null;

  const {
    data: { token, roomId, initVideo },
    isOnCall,
    notifyDisconnection,
    isMuted,
  } = livekit;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={env.VITE_WS_URL}
      connect={isOnCall}
      onConnected={() => {
        socket.emit(ParticipantsEvent.Get, roomId);
      }}
      onDisconnected={() => {
        notifyDisconnection();
        socket.emit(ParticipantsEvent.Get, roomId);
      }}
      audio={!isMuted}
      video={initVideo}
    >
      {children}
      <CallAudio />
    </LiveKitRoom>
  );
}