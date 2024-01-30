import { useLivekitContext } from '../hooks';

import type { ModalProps } from '@types';

import { ConfirmationModal } from '@components/ui/modals';

import connectAudio from '@assets/audio/connect.mp3';

import styles from './connect-to-room-confirmation-modal.module.scss';

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
    connectToRoom,
    notifyDisconnection,
  } = livekit;

  return (
    <ConfirmationModal
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      title="You Sure?"
      message={`Looks like you're in another voice channel. Are you sure you want to switch to ${newRoomName}?`}
      confirmLabel="Confirm"
      onConfirm={() => {
        notifyDisconnection();

        if (newRoomId) {
          connectToRoom(newRoomId);
          new Audio(connectAudio).play();
        }
      }}
    />
  );
}