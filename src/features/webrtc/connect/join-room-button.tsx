import { useContext } from 'react';

import { WebRTCContext } from '../context';

type JoinRoomButtonProps = {
  roomId: string;
  children: React.ReactNode;
}

export function JoinRoomButton({
  roomId,
  children,
}: JoinRoomButtonProps) {
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