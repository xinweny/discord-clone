import { useActiveIds } from '@hooks';
import { GifPickerButton } from './gif-picker-button';

export function MessageOptionsBar() {
  const activeTabState = useActiveIds();

  return (
    <div>
      <GifPickerButton tabState={activeTabState} />
    </div>
  );
}