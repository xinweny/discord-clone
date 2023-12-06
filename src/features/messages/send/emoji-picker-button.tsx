import { useRef } from 'react';

import type { CustomEditor } from '@config';

import type { ActiveIdState } from '@hooks';
import { PositionData } from '@components/hooks';

import { ClickPopup } from '@components/ui/popups';
import { MessageEmojiPicker } from './message-emoji-picker';

type EmojiPickerButtonProps = {
  tabState: ActiveIdState;
  editor: CustomEditor;
  position: PositionData;
};

export function EmojiPickerButton({
  tabState,
  editor,
  position,
}: EmojiPickerButtonProps) {
  const emojiPickerBtnRef = useRef<HTMLButtonElement>(null);

  const { set } = tabState;

  return (
    <ClickPopup
      renderPopup={() => <MessageEmojiPicker
        btnRef={emojiPickerBtnRef}
        editor={editor}
      />}
      onOpen={() => { set('emoji'); }}
      onClose={() => { set(null); }}
      btnRef={emojiPickerBtnRef}
      position={position}
    >
      <img src="#" alt="Emoji" />
    </ClickPopup>
  );
}