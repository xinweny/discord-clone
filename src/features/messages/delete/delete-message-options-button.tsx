import { useMessageContext } from '../context';

import { useMessageAuthorize } from '../hooks';

import { useDeleteMessageMutation } from '../api';
import { useServerAuthorize } from '@features/servers/hooks';

type DeleteMessageOptionsButtonProps = {
  set: React.Dispatch<React.SetStateAction<string | null>>;
  deleteBtnRef: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
};

export function DeleteMessageOptionsButton({
  set,
  deleteBtnRef,
  children
}: DeleteMessageOptionsButtonProps) {
  const message = useMessageContext();
  const dmAuthorized = useMessageAuthorize();
  const serverAuthorized = useServerAuthorize('manageMessages');

  const [deleteMessage] = useDeleteMessageMutation();

  if (
    !message ||
    (!dmAuthorized && !serverAuthorized) ||
    !dmAuthorized
  ) return null;

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
      {children}
    </button>
  );
}