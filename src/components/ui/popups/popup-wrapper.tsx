import { PortalWrapper } from '@components/wrappers';

import styles from './popup-wrapper.module.scss';

type PopupWrapperProps = {
  isOpen: boolean;
  closePopup: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function PopupWrapper({
  isOpen,
  closePopup,
  children,
  ...props
}: PopupWrapperProps) {
  return (
    <PortalWrapper
      rootId="popup-root"
      isOpen={isOpen}
      close={closePopup}
      className={styles.container}
      {...props}
    >
      {children}
    </PortalWrapper>
  );
  }