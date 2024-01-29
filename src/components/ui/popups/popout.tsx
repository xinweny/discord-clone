import { useState, useEffect, useRef } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import { PositionData, usePopupPos } from '@components/hooks';

import { PortalWrapper } from '@components/wrappers';

import styles from './popout.module.scss';
import { mergeRefs } from '@utils';

type PopoutProps = {
  renderPopup: () => React.ReactElement | null | undefined | Promise<React.ReactElement | null | undefined>;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
  position?: PositionData;
  toggleComponent?: React.ReactNode;
  className?: string;
};

export function Popout({
  renderPopup,
  children,
  onOpen,
  onClose,
  btnRef,
  className,
  position = {
    direction: 'left',
    align: 'start',
    gap: 0,
  },
  toggleComponent,
}: PopoutProps) {
  const [showPopup, setShowPopup] = useState<boolean | null>(null);
  const [popup, setPopup] = useState<React.ReactElement | null>(null);

  const defaultRef = useRef<HTMLButtonElement>(null);
  const buttonRef = btnRef || defaultRef;

  const popupRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const posStyles = usePopupPos({
    show: !!showPopup,
    btnRef: buttonRef,
    popupRef,
    isLoaded: !!popup,
    position,
  });

  const clickAwayRef = useClickAway((e: Event) => {
    if (!showPopup) return;
    if (buttonRef.current?.contains(e.target as Node)) return;

    const portal = wrapperRef.current?.parentNode;

    const popups =  Array.from(portal!.childNodes).map(node => node.firstChild) as ChildNode[];

    const selfIndex = popups.findIndex(node => node.isSameNode(popupRef.current));

    if (selfIndex < popups.findIndex(node => node.contains(e.target as Node))) return;

    setShowPopup(false);
  });

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => { setShowPopup(prev => !prev); }}
        ref={buttonRef}
      >
        {!showPopup
          ? children
          : (toggleComponent || children)
        }
      </button>
      <PortalWrapper
        layer={1}
        isOpen={!!showPopup}
        className={styles.container}
        wrapperRef={wrapperRef}
      >
        <div
          className={styles.popup}
          style={posStyles}
          ref={mergeRefs(
            clickAwayRef as React.RefObject<HTMLDivElement>,
            popupRef,
          )}
        >
          {popup}
        </div>
      </PortalWrapper>
    </>
  );
}