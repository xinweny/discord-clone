import { useNavigate } from 'react-router-dom';

import { useLivekitContext } from '../hooks';

import { ModalButton } from '@components/ui/buttons';
import { ConnectToRoomConfirmationModal } from './connect-to-room-confirmation-modal';

import connectAudio from '@assets/audio/connect.mp3';

type ConnectToRoomButtonProps = {
  roomId: string;
  roomName: string;
  children: React.ReactNode;
  serverId?: string;
  withVideo?: boolean;
};

export function ConnectToRoomButton({
  roomId,
  roomName,
  children,
  serverId,
  withVideo = false,
}: ConnectToRoomButtonProps) {
  const livekit = useLivekitContext();

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

          connectToRoom(roomId, serverId, { withVideo });
          
          new Audio(connectAudio).play();
        }}
      >
        {children}
      </button>
    );
}