import { useState, useEffect, useRef } from 'react';

import { PopupWrapper } from '.';

type ClickPopupProps = {
  renderPopup: () => React.ReactElement;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
  position?: {
    direction: 'top' | 'bottom' | 'left' | 'right';
    align: 'start' | 'end' | 'center';
    gap: number;
  }
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
    gap: 0
  },
}: ClickPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const defaultRef = useRef(null);
  const buttonRef = btnRef || defaultRef;

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPopup) return;
    if (!buttonRef.current || !popupRef.current) return;

    const btnRect = buttonRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();

    const { direction, align, gap } = position;

    setStyle({
      top: `${btnRect.top + btnRect.height}px`,
      left: `${btnRect.left}px`,
    });
  }, [showPopup]);

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
        style={style}
      >
        <div ref={popupRef}>
          {renderPopup()}
        </div>
      </PopupWrapper>
    </>
  );
}