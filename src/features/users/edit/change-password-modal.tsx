import { useRef } from 'react';

import { ModalWrapper } from '@components/ui/modals';

import { ChangePasswordForm } from './change-password-form';

import type { ModalProps } from '@types';

export function ChangePasswordModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen}>
      <div>
        <h2>Update your password</h2>
        <p>Enter your current password and a new password.</p>
      </div>
      <ChangePasswordForm closeBtnRef={closeBtnRef} />
      <button ref={closeBtnRef} type="button" onClick={onClose}>x</button>
    </ModalWrapper>
  );
}