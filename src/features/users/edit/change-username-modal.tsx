import { useRef } from 'react';

import { ModalWrapper } from '@components/ui/modals';

import { ChangeUsernameForm } from './change-username-form';

import type { ModalProps } from '@types';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './account-edit-modal.module.scss';

export function ChangeUsernameModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen} className={styles.modal}>
      <div>
        <h2>Change your username</h2>
        <p>Enter a new username and your existing password.</p>
      </div>
      <ChangeUsernameForm closeBtnRef={closeBtnRef} />
      <button ref={closeBtnRef} type="button" onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}>
        <CrossIcon />
      </button>
    </ModalWrapper>
  );
}