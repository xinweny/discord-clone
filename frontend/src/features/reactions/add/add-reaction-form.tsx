import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';

import { useMessageContext } from '@features/messages/context';

import { useGetServerRoomIds } from '@hooks';
import { useGetPickerCustomEmojis } from '../../emojis/hooks';

import { useCreateReactionMutation } from '../api';

type AddReactionFormProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
};

export function AddReactionForm({
  btnRef
}: AddReactionFormProps) {
  const message = useMessageContext();

  const { custom, categoryIcons } = useGetPickerCustomEmojis();

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
    <Picker
      data={data}
      custom={custom}
      onEmojiSelect={handleClick}
      theme="dark"
      skinTonePosition="none"
      set="twitter"
      categoryIcons={categoryIcons}
    />
  );
}