import { PortalWrapper } from '@components/wrappers';

import styles from './modal-wrapper.module.scss';

type ModalWrapperProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export function ModalWrapper({
  isOpen,
  closeModal,
  children
}: ModalWrapperProps) {
  return (
    <PortalWrapper
      rootId="modal-root"
      isOpen={isOpen}
      close={closeModal}
      className={styles.container}
    >
    {children}
    </PortalWrapper>
  );
  }