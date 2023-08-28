import { useContext } from 'react';

import { MessageContext } from '../context';

import { useDeleteMessageMutation } from '../api';

type DeleteMessageOptionsButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
  deleteBtnRef: React.RefObject<HTMLButtonElement>;
};

export function DeleteMessageOptionsButton({
  set,
  deleteBtnRef,
}: DeleteMessageOptionsButtonProps) {
  const message = useContext(MessageContext);

  const [deleteMessage] = useDeleteMessageMutation();

  if (!message) return null;

  const handleShiftClick = async () => {
    const { serverId, roomId, _id: messageId } = message;

    await deleteMessage({
      serverId,
      roomId,
      messageId,
    }).unwrap();
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        if (e.shiftKey) {
          handleShiftClick();
        } else {
          set('deleteMessage');
          deleteBtnRef.current?.click();
        }
      }}
    >
      <img src="#" alt="Delete Button" />
    </button>
  );
}