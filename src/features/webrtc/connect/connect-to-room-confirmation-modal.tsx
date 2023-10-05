import { useContext, } from 'react';

import { socket } from '@app';

import type { ModalProps } from '@types';
import { ParticipantsEvent } from '../types';

import { WebRTCContext } from '../context';

import { ConfirmationModal } from '@components/ui/modals';

type ConnectToRoomConfirmationModalProps = {
  newRoomId?: string;
} & ModalProps;

export function ConnectToRoomConfirmationModal({
  isOpen,
  onClose,
  newRoomId,
}: ConnectToRoomConfirmationModalProps) {
  const livekit = useContext(WebRTCContext);

  if (!livekit || !livekit.roomData) return null;

  const {
    data: { roomId },
    roomData: { name },
    connectToRoom,
    notifyDisconnection,
  } = livekit;

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title="You Sure?"
      message={`Looks like you're in another voice channel. Are you sure you want to switch to ${name}?`}
      confirmLabel="Confirm"
      onConfirm={() => {
        notifyDisconnection();
        socket.emit(ParticipantsEvent.Get, roomId);
        if (newRoomId) connectToRoom(newRoomId);
      }}
    />
  );
}