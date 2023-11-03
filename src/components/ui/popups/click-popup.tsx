import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ClickAwayListener } from '@mui/material';

import styles from './click-popup.module.scss';

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
    <>
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
          <div className={styles.popup}>
            {renderPopup()}
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}