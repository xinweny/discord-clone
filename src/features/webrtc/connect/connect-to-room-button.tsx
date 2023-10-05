import { useContext } from 'react';

import { WebRTCContext } from '../context';

type ConnectToRoomButtonProps = {
  roomId: string;
  children: React.ReactNode;
}

export function ConnectToRoomButton({
  roomId,
  children,
}: ConnectToRoomButtonProps) {
  const livekit = useContext(WebRTCContext);

  if (!livekit) return null;

  return (
    <button
      type="button"
      onClick={() =>{ livekit.connectToRoom(roomId); }}
    >
      {children}
    </button>
  );
}