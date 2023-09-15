import type { CustomEditor } from '@config';

import { useActiveIds } from '@hooks';

import { GifPickerButton } from './gif-picker-button';
import { EmojiPickerButton } from './emoji-picker-button';

type MessageOptionsBarProps = {
  editor: CustomEditor;
};

export function MessageOptionsBar({ editor }: MessageOptionsBarProps) {
  const activeTabState = useActiveIds();

  return (
    <div>
      <GifPickerButton tabState={activeTabState} />
      <EmojiPickerButton tabState={activeTabState} editor={editor} />
    </div>
  );
}