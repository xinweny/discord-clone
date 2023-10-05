import { useContext } from 'react';

import { WebRTCContext } from '../context';

import {
  LiveKitRoom,
} from '@livekit/components-react';

import { env } from '@config';

type LivekitRoomProps = {
  children: React.ReactNode;
};

export function LivekitRoom({ children }: LivekitRoomProps) {
  const livekit = useContext(WebRTCContext);

  if (!livekit) return null;

  const {
    data: { token },
    isOnCall,
    notifyDisconnection,
  } = livekit;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={env.VITE_WS_URL}
      connect={isOnCall}
      onDisconnected={() => { notifyDisconnection(); }}
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