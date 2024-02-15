import type { CustomEditor } from '@config';

import { EmojiPicker } from '@features/emojis/list';

import { insertEmoji } from '../slate';

type MessageEmojiPickerProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
  editor: CustomEditor;
};

export function MessageEmojiPicker({
  btnRef,
  editor,
}: MessageEmojiPickerProps) {
  const handleClick = (emoji: any) => {
    insertEmoji(editor, emoji);

    btnRef.current?.click();
  };

  return (
    <EmojiPicker handleSelect={handleClick} />
  );
}