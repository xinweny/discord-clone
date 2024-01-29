import { useRef } from 'react';

import type { ActiveIdState } from '@hooks';
import type { PositionData } from '@components/hooks';

import { Popout } from '@components/ui/popups';
import { MessageGifPicker } from './message-gif-picker';

import GifIcon from '@assets/icons/gif.svg?react';

import styles from './gif-picker-button.module.scss';

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
    <Popout
      renderPopup={() => <MessageGifPicker btnRef={gifPickerBtnRef} />}
      onOpen={() => { set('gif'); }}
      onClose={() => { set(null); }}
      btnRef={gifPickerBtnRef}
      position={position}
    >
      <GifIcon className={styles.icon} />
    </Popout>
  );
}