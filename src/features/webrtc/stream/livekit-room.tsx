import { LiveKitRoom, useLiveKitRoom } from '@livekit/components-react';

import { socket } from '@app';

import { useLivekitContext, useRoomEventHandlers } from '../hooks';

import { env } from '@config';
import { ParticipantsEvent } from '../types';
import { CallAudio } from './call-audio';

import connectAudio from '@assets/audio/connect.mp3';
import disconnectAudio from '@assets/audio/disconnect.mp3';

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
    audio: !isMuted,
    video: initVideo,
    onConnected: () => {
      socket.emit(ParticipantsEvent.Get, roomId);
      new Audio(connectAudio).play();
    },
    onDisconnected: () => {
      notifyDisconnection();
      socket.emit(ParticipantsEvent.Get, roomId);
      new Audio(disconnectAudio).play();
    },
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