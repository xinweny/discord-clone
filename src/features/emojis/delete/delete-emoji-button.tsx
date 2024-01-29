import { useServerContext } from '@features/servers/context';

import { useDeleteEmojiMutation } from '../api';

type DeleteEmojiButtonProps = {
  emojiId: string;
  children: React.ReactNode;
  className?: string;
};

export function DeleteEmojiButton({ emojiId, children, className }: DeleteEmojiButtonProps) {
  const { _id: serverId } = useServerContext()!;

  const [deleteEmoji] = useDeleteEmojiMutation();

  const handleClick = async () => {
    await deleteEmoji({ serverId,emojiId });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}