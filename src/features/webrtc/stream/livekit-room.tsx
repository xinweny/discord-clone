import { LiveKitRoom, useLiveKitRoom } from '@livekit/components-react';

import { socket } from '@app';

import { useLivekitContext, useRoomEventHandlers } from '../hooks';

import { env } from '@config';
import { ParticipantsEvent } from '../types';
import { CallAudio } from './call-audio';

type LivekitRoomProps = {
  children: React.ReactNode;
};

export function LivekitRoom({ children }: LivekitRoomProps) {
  const livekit = useLivekitContext();

  const {
    data: { token, roomId, initVideo },
    isOnCall,
    notifyDisconnection,
    isMuted,
  } = livekit!;

  const { room } = useLiveKitRoom({
    token,
    serverUrl: env.VITE_WS_URL,
    connect: isOnCall,
    onConnected: () => {
      setTimeout(() => {
        socket.emit(ParticipantsEvent.Get, roomId);
        console.log('USER CONNECTED');
      }, 2000);
    },
    onDisconnected: () => {
      setTimeout(() => {
        notifyDisconnection();
        socket.emit(ParticipantsEvent.Get, roomId);
        console.log('USER DISCONNECTED');
      }, 2000);
    },
    audio: !isMuted,
    video: initVideo,
  });

  useRoomEventHandlers(room);

  return (
    <LiveKitRoom
      room={room}
      serverUrl={env.VITE_WS_URL}
      token={token}
    >
      {children}
      <CallAudio />
    </LiveKitRoom>
  );
}