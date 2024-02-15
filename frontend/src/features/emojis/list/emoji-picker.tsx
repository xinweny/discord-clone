import Picker from '@emoji-mart/react';

import data from '@emoji-mart/data/sets/14/twitter.json';

import { useGetPickerCustomEmojis } from '../hooks';

type EmojiPickerProps = {
  handleSelect: (emoji: any) => void;
};

export function EmojiPicker({
  handleSelect
}: EmojiPickerProps) {
  const { custom } = useGetPickerCustomEmojis();

  return (
    <Picker
      data={data}
      custom={custom}
      onEmojiSelect={handleSelect}
      theme="dark"
      skinTonePosition="none"
      set="twitter"
    />
  );
}