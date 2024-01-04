import { useClickAway } from '@uidotdev/usehooks';

import { PortalWrapper } from '@components/wrappers';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './modal-wrapper.module.scss';

type ModalWrapperProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
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
  className,
  closeBtnRef,
  withClickAway = true,
  hasScroll = true,
}: ModalWrapperProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  const clickAwayRef = useClickAway(() => { closeModal(); }) as React.RefObject<HTMLDivElement>;

  return (
    <PortalWrapper
      layer={2}
      isOpen={isOpen}
      close={closeModal}
      className={styles.container}
    >
      <div
        className={`${styles.modal} ${className || ''} ${hasScroll ? styles.scroll : ''}`}
        ref={withClickAway ? clickAwayRef : undefined}
      >
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