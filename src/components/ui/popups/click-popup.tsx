import { useState, useEffect, useRef } from 'react';

import { PositionData, usePopupPos } from '@components/hooks';

import { PopupWrapper } from '.';

type ClickPopupProps = {
  renderPopup: () => React.ReactElement | null | undefined | Promise<React.ReactElement | null | undefined>;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
  position?: PositionData;
  toggleComponent?: React.ReactNode;
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
  toggleComponent,
}: ClickPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean | null>(null);
  const [popup, setPopup] = useState<React.ReactElement | null>(null);

  const defaultRef = useRef<HTMLButtonElement>(null);
  const buttonRef = btnRef || defaultRef;

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPopup === true) {
      const getPopup = async () => {
        const component = await renderPopup();
        
        if (component) {
          setPopup(component);
          if (onOpen) onOpen();
        }
      };
  
      getPopup();
    } else {
      if (onClose) onClose();
    }
  }, [showPopup]);

  const style = usePopupPos({
    show: !!showPopup,
    btnRef: buttonRef,
    popupRef,
    popup,
    position,
  });

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowPopup(prev => !prev);
        }}
        ref={buttonRef}
      >
        {!showPopup
          ? children
          : (toggleComponent || children)
        }
      </button>
      <PopupWrapper
        isOpen={!!showPopup}
        closePopup={() => { setShowPopup(false); }}
      >
        <div style={style} ref={popupRef}>
          {popup}
        </div>
      </PopupWrapper>
    </>
  );
}