import { useRef } from 'react';

import { ModalWrapper } from '@components/ui/modals';

import { ChangePasswordForm } from './change-password-form';

import type { ModalProps } from '@types';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './account-edit-modal.module.scss';

export function ChangePasswordModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen} className={styles.modal}>
      <div>
        <h2>Update your password</h2>
        <p>Enter your current password and a new password.</p>
      </div>
      <ChangePasswordForm closeBtnRef={closeBtnRef} />
      <button ref={closeBtnRef} type="button" onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}>
        <CrossIcon />
      </button>
    </ModalWrapper>
  );
}