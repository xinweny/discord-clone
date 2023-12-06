import { useRef } from 'react';

import type { ActiveIdState } from '@hooks';
import type { PositionData } from '@components/hooks';

import { ClickPopup } from '@components/ui/popups';
import { MessageGifPicker } from './message-gif-picker';

type GifPickerButtonProps = {
  tabState: ActiveIdState;
  position: PositionData;
};

export function GifPickerButton({
  tabState,
  position,
}: GifPickerButtonProps) {
  const gifPickerBtnRef = useRef<HTMLButtonElement>(null);

  const { set } = tabState;

  return (
    <ClickPopup
      renderPopup={() => <MessageGifPicker btnRef={gifPickerBtnRef} />}
      onOpen={() => { set('gif'); }}
      onClose={() => { set(null); }}
      btnRef={gifPickerBtnRef}
      position={position}
    >
      <img src="#" alt="GIF" />
    </ClickPopup>
  );
}