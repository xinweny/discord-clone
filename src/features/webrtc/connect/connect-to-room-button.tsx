import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { WebRTCContext } from '../context';

import { ModalButton } from '@components/ui/buttons';
import { ConnectToRoomConfirmationModal } from './connect-to-room-confirmation-modal';

type ConnectToRoomButtonProps = {
  roomId: string;
  roomName: string;
  children: React.ReactNode;
  serverId?: string;
};

export function ConnectToRoomButton({
  roomId,
  roomName,
  children,
  serverId,
}: ConnectToRoomButtonProps) {
  const livekit = useContext(WebRTCContext);

  const navigate = useNavigate();

  if (!livekit) return null;

  const {
    connectToRoom,
    isCurrentRoom,
    isOnCall,
    roomData,
  } = livekit;

  const isOngoingCurrentRoom = isCurrentRoom(roomId);

  return isOnCall && !isOngoingCurrentRoom
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
        onClick={() =>{
          if (isOngoingCurrentRoom && roomData) navigate(roomData.url);
          
          connectToRoom(roomId, serverId);
        }}
      >
        {children}
      </button>
    );
}