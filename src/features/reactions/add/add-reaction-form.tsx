import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';

import { useGetPickerCustomEmojis } from '../hooks';

export function AddReactionForm() {
  const { custom, categoryIcons } = useGetPickerCustomEmojis();

  const handleClick = (emoji: any) => {
    console.log(emoji);
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