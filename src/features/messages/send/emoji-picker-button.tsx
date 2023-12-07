import { useRef, useState, useEffect } from 'react';
import data from '@emoji-mart/data/sets/14/twitter.json';

import type { CustomEditor } from '@config';

import { getTwemoji } from '@utils';

import type { ActiveIdState } from '@hooks';
import { PositionData } from '@components/hooks';

import { ClickPopup } from '@components/ui/popups';

import { MessageEmojiPicker } from './message-emoji-picker';

import styles from './emoji-picker-button.module.scss';

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
  const icons = data.categories.find(category => category.id === 'people')!.emojis.slice(0, 104);

  const [currentEmoji, setCurrentEmoji] = useState<string>(icons[0]);
  const [spriteUrl, setSpriteUrl] = useState<string>('');

  useEffect(() => {
    const { url } = getTwemoji((data.emojis as any)[currentEmoji].skins[0].native);

    setSpriteUrl(url);
  }, [currentEmoji]);

  const emojiPickerBtnRef = useRef<HTMLButtonElement>(null);

  const { set } = tabState;

  if (!spriteUrl) return null;

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
      <img
        className={styles.sprite}
        src={spriteUrl}
        onMouseEnter={() => {
          setCurrentEmoji(icons[Math.floor(Math.random() * icons.length)]);
        }}
      />
    </ClickPopup>
  );
}