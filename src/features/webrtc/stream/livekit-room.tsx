import { useContext } from 'react';

import { WebRTCContext } from '../context';

import {
  LiveKitRoom,
  VideoConference,
  ControlBar,
} from '@livekit/components-react';

import { env } from '@config';

export function LivekitRoom() {
  const livekit = useContext(WebRTCContext);

  if (!livekit) return null;

  const {
    lkToken,
    isOnCall,
    notifyDisconnection,
  } = livekit;

  if (!isOnCall) return null;

  return (
    <LiveKitRoom
      token={lkToken}
      serverUrl={env.VITE_WS_URL}
      connect={!!lkToken}
      onDisconnected={() => { notifyDisconnection(); }}
    >
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
    </LiveKitRoom>
  );
}