import type { CustomEditor } from '@config';

import { useActiveIds } from '@hooks';

import { GifPickerButton } from './gif-picker-button';
import { EmojiPickerButton } from './emoji-picker-button';

type MessageOptionsBarProps = {
  editor: CustomEditor;
  editMode?: boolean;
};

export function MessageOptionsBar({
  editor,
  editMode = false,
}: MessageOptionsBarProps) {
  const activeTabState = useActiveIds();

  return (
    <div>
      {!editMode && <GifPickerButton tabState={activeTabState} />}
      <EmojiPickerButton tabState={activeTabState} editor={editor} />
    </div>
  );
}