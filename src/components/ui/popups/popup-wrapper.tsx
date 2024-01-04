import { PortalWrapper } from '@components/wrappers';

import { useClickAway } from '@uidotdev/usehooks';

import styles from './popup-wrapper.module.scss';

type PopupWrapperProps = {
  isOpen: boolean;
  close: (e: Event) => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function PopupWrapper({
  isOpen,
  close,
  children,
  ...props
}: PopupWrapperProps) {
  const clickAwayRef = useClickAway(close) as React.RefObject<HTMLDivElement>;

  return (
    <PortalWrapper
      layer={1}
      isOpen={isOpen}
      className={styles.container}
      {...props}
    >
      <div className={styles.popup} ref={clickAwayRef}>
        {children}
      </div>
    </PortalWrapper>
  );
}