import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data/sets/14/twitter.json';

import type { CustomEditor } from '@config';

import { useGetPickerCustomEmojis } from '@features/emojis/hooks';

import { insertEmoji } from '../slate';

type MessageEmojiPickerProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
  editor: CustomEditor;
};

export function MessageEmojiPicker({
  btnRef,
  editor,
}: MessageEmojiPickerProps) {
  const { custom, categoryIcons } = useGetPickerCustomEmojis();

  const handleClick = (emoji: any) => {
    insertEmoji(editor, emoji);

    btnRef.current?.click();
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