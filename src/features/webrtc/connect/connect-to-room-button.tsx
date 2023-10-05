import { useContext } from 'react';

import { WebRTCContext } from '../context';

import { ModalButton } from '@components/ui/buttons';
import { ConnectToRoomConfirmationModal } from './connect-to-room-confirmation-modal';

type ConnectToRoomButtonProps = {
  roomId: string;
  roomName: string;
  children: React.ReactNode;
}

export function ConnectToRoomButton({
  roomId,
  roomName,
  children,
}: ConnectToRoomButtonProps) {
  const livekit = useContext(WebRTCContext);

  if (!livekit) return null;

  return livekit.roomData
    ? (
      <ModalButton
        modal={ConnectToRoomConfirmationModal}
        modalProps={{
          newRoomId: roomId,
          newRoomName: roomName,
        }}
      >
        {children}
      </ModalButton>
    )
    : (
      <button
        type="button"
        onClick={() =>{ livekit.connectToRoom(roomId); }}
      >
        {children}
      </button>
    );
}