import { useMessageContext } from '@features/messages/context';

import { useGetServerRoomIds } from '@hooks';

import { EmojiPicker } from '@features/emojis/list';

import { useCreateReactionMutation } from '../api';


type AddReactionFormProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
};

export function AddReactionForm({
  btnRef
}: AddReactionFormProps) {
  const message = useMessageContext();

  const { serverId, roomId } = useGetServerRoomIds();

  const [createReaction] = useCreateReactionMutation();

  const closeForm = () => { btnRef.current?.click(); };

  const handleClick = async (emoji: any) => {
    if (!message?._id) return;

    const emojiInfo = emoji.unified ? {
      custom: false as const,
      unified: emoji.unified as string,
      native: emoji.native as string,
    } : {
      custom: true as const,
      emojiId: emoji.name as string,
      url: emoji.src as string,
    };

    await createReaction({
      serverId,
      roomId: roomId!,
      messageId: message._id,
      emoji: {
        name: emoji.id as string,
        ...emojiInfo,
      }
    }).unwrap();

    closeForm();
  };

  return (
    <EmojiPicker handleSelect={handleClick} />
  );
}