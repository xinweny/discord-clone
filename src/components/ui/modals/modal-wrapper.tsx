import { PortalWrapper } from '@components/wrappers';

import styles from './modal-wrapper.module.scss';

type ModalWrapperProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  rootId?: string;
  withClickAway?: boolean;
};

export function ModalWrapper({
  isOpen,
  closeModal,
  children,
  rootId,
  withClickAway = true,
}: ModalWrapperProps) {
  return (
    <PortalWrapper
      rootId={rootId || 'modal-root'}
      isOpen={isOpen}
      close={closeModal}
      className={styles.container}
      withClickAway={withClickAway}
    >
    {children}
    </PortalWrapper>
  );
}