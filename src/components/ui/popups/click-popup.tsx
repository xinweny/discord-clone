import { useState, useEffect } from 'react';

import { PortalWrapper } from '@components/wrappers';

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

  const popupButton = <button
    type="button"
    onClick={() => {
      setShowPopup(prev => !prev);
    }}
    ref={btnRef}
  >
    {children}
  </button>;

  return (
    <>
      {popupButton}
      <PortalWrapper
        rootId="popup-root"
        isOpen={!!showPopup}
        close={() => { setShowPopup(false); }}
        className={styles.container}
        style={{

        }}
      >
        {renderPopup()}
      </PortalWrapper>
    </>
  );
}