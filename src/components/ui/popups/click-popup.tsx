import { useState, useEffect } from 'react';
import { ClickAwayListener } from '@mui/material';

type ClickPopupProps = {
  renderPopup: () => React.ReactElement;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
};

export function ClickPopup({
  renderPopup,
  children,
  onOpen,
  onClose,
}: ClickPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if (showPopup) {
      if (onOpen) onOpen();
    } else {
      if (onClose) onClose();
    }
  }, [showPopup]);

  return (
    <div>
      <button
        onClick={() => {
          setShowPopup(prev => !prev);
        }}
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