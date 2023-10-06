import { socket } from '@app';

import { useLivekitContext } from '../hooks';

import type { ModalProps } from '@types';
import { ParticipantsEvent } from '../types';

import { ConfirmationModal } from '@components/ui/modals';

type ConnectToRoomConfirmationModalProps = {
  newRoomId?: string;
  newRoomName?: string;
} & ModalProps;

export function ConnectToRoomConfirmationModal({
  isOpen,
  onClose,
  newRoomId,
  newRoomName,
}: ConnectToRoomConfirmationModalProps) {
  const livekit = useLivekitContext();

  if (!livekit || !livekit.roomData) return null;

  const {
    data: { roomId },
    connectToRoom,
    notifyDisconnection,
  } = livekit;

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title="You Sure?"
      message={`Looks like you're in another voice channel. Are you sure you want to switch to ${newRoomName}?`}
      confirmLabel="Confirm"
      onConfirm={() => {
        notifyDisconnection();
        socket.emit(ParticipantsEvent.Get, roomId);
        if (newRoomId) connectToRoom(newRoomId);
      }}
    />
  );
}