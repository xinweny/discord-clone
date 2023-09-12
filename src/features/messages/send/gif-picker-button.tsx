import { useRef } from 'react';

import type { ActiveIdState } from '@hooks';

import { ClickPopup } from '@components/ui/popups';
import { MessageGifPicker } from './message-gif-picker';

type GifPickerButtonProps = {
  tabState: ActiveIdState;
};

export function GifPickerButton({
  tabState,
}: GifPickerButtonProps) {
  const gifPickerBtnRef = useRef<HTMLButtonElement>(null);

  const { set } = tabState;

  return (
    <ClickPopup
      renderPopup={() => <MessageGifPicker btnRef={gifPickerBtnRef} />}
      onOpen={() => { set('gif'); }}
      onClose={() => { set(null); }}
      btnRef={gifPickerBtnRef}
    >
      <img src="#" alt="GIF" />
    </ClickPopup>
  );
}