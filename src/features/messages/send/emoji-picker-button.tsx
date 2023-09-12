import { useRef } from 'react';

import type { ActiveIdState } from '@hooks';

import { ClickPopup } from '@components/ui/popups';
import { MessageEmojiPicker } from './message-emoji-picker';

type EmojiPickerButtonProps = {
  tabState: ActiveIdState;
};

export function EmojiPickerButton({
  tabState,
}: EmojiPickerButtonProps) {
  const emojiPickerBtnRef = useRef<HTMLButtonElement>(null);

  const { set } = tabState;

  return (
    <ClickPopup
      renderPopup={() => <MessageEmojiPicker btnRef={emojiPickerBtnRef} />}
      onOpen={() => { set('emoji'); }}
      onClose={() => { set(null); }}
      btnRef={emojiPickerBtnRef}
    >
      <img src="#" alt="Emoji" />
    </ClickPopup>
  );
}