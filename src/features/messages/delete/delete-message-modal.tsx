import type { ModalProps } from '@types';

import { useMessageContext } from '../context';

import { ConfirmationModal } from '@components/ui/modals';

import { DeleteMessagePreview } from './delete-message-preview';
import { DeleteMessageProtip } from './delete-message-protip';

import { useDeleteMessageMutation } from '../api';

export function DeleteMessageModal({
  isOpen,
  onClose,
}: ModalProps) {
  const message = useMessageContext();

  const [deleteMessage] = useDeleteMessageMutation();

  if (!message) return null;

  const onConfirm = async () => {
    const { serverId, roomId, _id: messageId } = message;

    await deleteMessage({
      serverId,
      roomId,
      messageId,
    }).unwrap();
  };

  return (
    <ConfirmationModal
      title="Delete Message"
      message="Are you sure you want to delete this message?"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmLabel="Delete"
      hasScroll={false}
    >
      <DeleteMessagePreview />
      <DeleteMessageProtip />
    </ConfirmationModal>
  );
}

