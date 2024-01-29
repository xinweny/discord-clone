import { useRef } from 'react';

import type { ModalProps } from '@types';

import { ModalWrapper } from '@components/ui/modals';

import { EditCustomStatusForm } from './edit-custom-status-form';

import customStatusSrc from '@assets/static/custom-status.svg';

import styles from './edit-custom-status-modal.module.scss';

export function EditCustomStatusModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      closeBtnRef={closeBtnRef}
      header={<header className={styles.header}>
        <img src={customStatusSrc} alt="" />
        <h1>Set a custom status</h1>
      </header>}
    >
      <EditCustomStatusForm closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}