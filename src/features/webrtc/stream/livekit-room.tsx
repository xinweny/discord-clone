import { useContext } from 'react';

import { socket } from '@app';

import { WebRTCContext } from '../context';

import {
  LiveKitRoom,
} from '@livekit/components-react';

import { env } from '@config';
import { ParticipantsEvent } from '../types';

type LivekitRoomProps = {
  children: React.ReactNode;
};

export function LivekitRoom({ children }: LivekitRoomProps) {
  const livekit = useContext(WebRTCContext);

  if (!livekit) return null;

  const {
    data: { token, roomId },
    isOnCall,
    notifyDisconnection,
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
    >
      {children}
    </LiveKitRoom>
  );
}

/* 
  <VideoConference />
  <ControlBar
    controls={{
      microphone: true,
      camera: true,
      screenShare: true,
      leave: true,
      chat: false,
    }}
  />
*/