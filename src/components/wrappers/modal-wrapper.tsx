import { createPortal } from 'react-dom';
import { ClickAwayListener } from '@mui/material';

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
  const modalRootNode = document.getElementById('modal-root');

  if (!isOpen || !modalRootNode) return null;

  return createPortal((
    <div className={styles.container}>
      <ClickAwayListener onClickAway={closeModal}>
        <div className={styles.modal}>
          {children}
        </div>
      </ClickAwayListener>
    </div>
  ), modalRootNode);
}