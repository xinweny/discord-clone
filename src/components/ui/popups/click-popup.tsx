import { useState, useEffect } from 'react';
import { ClickAwayListener } from '@mui/material';

type ClickPopupProps = {
  renderPopup: () => React.ReactElement;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
};

export function ClickPopup({
  renderPopup,
  children,
  onOpen,
  onClose,
  btnRef,
}: ClickPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean | null>(null);

  useEffect(() => {
    if (showPopup === true && onOpen) onOpen();
    if (showPopup === false && onClose) onClose();
  }, [showPopup]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setShowPopup(prev => !prev);
        }}
        ref={btnRef}
      >
        {children}
      </button>
      {showPopup && (
        <ClickAwayListener
          onClickAway={() => { setShowPopup(false); }}
        >
          <div>
            {renderPopup()}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}