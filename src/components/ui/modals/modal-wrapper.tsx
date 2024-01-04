import { PortalWrapper } from '@components/wrappers';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './modal-wrapper.module.scss';

type ModalWrapperProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  rootId?: string;
  withClickAway?: boolean;
  className?: string;
  closeBtnRef?: React.RefObject<HTMLButtonElement>;
  hasScroll?: boolean;
  header?: React.ReactNode;
};

export function ModalWrapper({
  isOpen,
  closeModal,
  header,
  children,
  rootId,
  withClickAway = true,
  className,
  closeBtnRef,
  hasScroll = true,
}: ModalWrapperProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };
  
  return (
    <PortalWrapper
      rootId={rootId || 'modal-root'}
      isOpen={isOpen}
      close={closeModal}
      className={styles.container}
      withClickAway={withClickAway}
    >
      <div className={`${styles.modal} ${className || ''} ${hasScroll ? styles.scroll : ''}`}>
        {header}
        {children}
        {closeBtnRef && (
          <button ref={closeBtnRef} type="button" onClick={handleClose}>
            <CrossIcon />
          </button>
        )}
      </div>
    </PortalWrapper>
  );
}