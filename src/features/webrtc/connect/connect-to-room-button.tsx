import { useNavigate } from 'react-router-dom';

import { useLivekitContext } from '../hooks';

import { ModalButton } from '@components/ui/buttons';
import { ConnectToRoomConfirmationModal } from './connect-to-room-confirmation-modal';

type ConnectToRoomButtonProps = {
  roomId: string;
  roomName: string;
  children: React.ReactNode;
  serverId?: string;
  withVideo?: boolean;
  className?: string;
};

export function ConnectToRoomButton({
  roomId,
  roomName,
  children,
  serverId,
  withVideo = false,
  className,
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
        className={className}
      >
        {children}
      </ModalButton>
    )
    : (
      <button
        type="button"
        onClick={() =>{
          if (isOngoingCurrentRoom && roomData) navigate(roomData.url);

          if (!isOngoingCurrentRoom) connectToRoom(roomId, serverId, { withVideo });
        }}
        className={className}
      >
        {children}
      </button>
    );
}