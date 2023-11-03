import { PortalWrapper } from '@components/wrappers';

import styles from './popup-wrapper.module.scss';

type ModalWrapperProps = {
  isOpen: boolean;
  closePopup: () => void;
  children: React.ReactNode;
};

export function ModalWrapper({
  isOpen,
  closePopup,
  children
}: ModalWrapperProps) {
  return (
    <PortalWrapper
      rootId="modal-root"
      isOpen={isOpen}
      close={closePopup}
      className={styles.container}
    >
      {children}
    </PortalWrapper>
  );
  }