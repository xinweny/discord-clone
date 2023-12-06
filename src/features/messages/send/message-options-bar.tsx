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

  const popupPosition = {
    direction: 'top' as const,
    align: 'end' as const,
    gap: 20,
  };

  return (
    <div>
      {!editMode && <GifPickerButton
        tabState={activeTabState}
        position={popupPosition}
      />}
      <EmojiPickerButton
        tabState={activeTabState}
        editor={editor}
        position={popupPosition}
      />
    </div>
  );
}