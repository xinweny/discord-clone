import { useState, useEffect, useRef } from 'react';

import { PositionData, usePopupPos } from '@components/hooks';

import { PopupWrapper } from '.';

type ClickPopupProps = {
  renderPopup: () => React.ReactElement;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
  position?: PositionData;
};

export function ClickPopup({
  renderPopup,
  children,
  onOpen,
  onClose,
  btnRef,
  position = {
    direction: 'left',
    align: 'start',
    gap: 0,
  },
}: ClickPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean | null>(null);

  const defaultRef = useRef(null);
  const buttonRef = btnRef || defaultRef;

  const popupRef = useRef<HTMLDivElement>(null);

  const style = usePopupPos({
    show: !!showPopup,
    btnRef: buttonRef,
    popupRef,
    position,
  });

  useEffect(() => {
    if (showPopup === true && onOpen) onOpen();
    if (showPopup === false && onClose) onClose();
  }, [showPopup]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowPopup(prev => !prev);
        }}
        ref={buttonRef}
      >
        {children}
      </button>
      <PopupWrapper
        isOpen={!!showPopup}
        closePopup={() => { setShowPopup(false); }}
        popupOpts={{
          style,
          ref: popupRef,
        }}
      >
        {renderPopup()}
      </PopupWrapper>
    </>
  );
}