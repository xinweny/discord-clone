import { useServerContext } from '@features/servers/context';

import { useDeleteEmojiMutation } from '../api';

type DeleteEmojiButtonProps = {
  show: boolean;
  emojiId: string;
};

export function DeleteEmojiButton({ show, emojiId }: DeleteEmojiButtonProps) {
  const { _id: serverId } = useServerContext()!;

  const [deleteEmoji] = useDeleteEmojiMutation();

  const handleClick = async () => {
    await deleteEmoji({ serverId,emojiId });
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      <img src="#" alt="Delete" />
    </button>
  );
}