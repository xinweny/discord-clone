import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data/sets/14/twitter.json';

import { useGetPickerCustomEmojis } from '@features/reactions/hooks';

type MessageEmojiPickerProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
};

export function MessageEmojiPicker({
  btnRef,
}: MessageEmojiPickerProps) {
  const { custom, categoryIcons } = useGetPickerCustomEmojis();

  const handleClick = (emoji: any) => {
    console.log(emoji);

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