import { useActiveIds } from '@hooks';
import { GifPickerButton } from './gif-picker-button';
import { EmojiPickerButton } from './emoji-picker-button';

export function MessageOptionsBar() {
  const activeTabState = useActiveIds();

  return (
    <div>
      <GifPickerButton tabState={activeTabState} />
      <EmojiPickerButton tabState={activeTabState} />
    </div>
  );
}