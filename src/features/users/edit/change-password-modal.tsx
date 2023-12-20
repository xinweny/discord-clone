import { useRef } from 'react';

import { ModalWrapper } from '@components/ui/modals';

import { ChangePasswordForm } from './change-password-form';

import type { ModalProps } from '@types';

export function ChangePasswordModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen} closeBtnRef={closeBtnRef}>
      <header>
        <h2>Update your password</h2>
        <p>Enter your current password and a new password.</p>
      </header>
      <ChangePasswordForm closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}