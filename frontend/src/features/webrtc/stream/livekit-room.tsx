import { LiveKitRoom, useLiveKitRoom } from '@livekit/components-react';

import { useLivekitContext, useRoomEventHandlers } from '../hooks';

import { CallAudio } from './call-audio';

import connectAudio from '@assets/audio/connect.mp3';
import disconnectAudio from '@assets/audio/disconnect.mp3';

type LivekitRoomProps = {
  children: React.ReactNode;
};

export function LivekitRoom({ children }: LivekitRoomProps) {
  const livekit = useLivekitContext();

  const {
    data: { token, initVideo },
    isOnCall,
    notifyDisconnection,
    isMuted,
  } = livekit!;

  const { room } = useLiveKitRoom({
    token,
    serverUrl: process.env.VITE_LK_URL,
    connect: isOnCall,
    audio: !isMuted,
    video: initVideo,
    onConnected: () => {
      new Audio(connectAudio).play();
    },
    onDisconnected: () => {
      notifyDisconnection();

      new Audio(disconnectAudio).play();
    },
  });

  useRoomEventHandlers(room);

  return (
    <LiveKitRoom
      room={room}
      serverUrl={process.env.VITE_WS_URL}
      token={token}
    >
      {children}
      <CallAudio />
    </LiveKitRoom>
  );
}