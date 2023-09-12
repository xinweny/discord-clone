import type { ActiveIdState } from '@hooks';

import { ClickPopup } from '@components/ui/popups';
import { MessageGifPicker } from './message-gif-picker';

type GifPickerButtonProps = {
  tabState: ActiveIdState;
};

export function GifPickerButton({
  tabState,
}: GifPickerButtonProps) {
  const { set } = tabState;

  return (
    <ClickPopup
      renderPopup={() => <MessageGifPicker />}
      onOpen={() => { set('gif'); }}
      onClose={() => { set(null); }}
    >
      <img src="#" alt="GIF" />
    </ClickPopup>
  );
}