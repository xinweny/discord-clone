import { useRef } from 'react';

import type { ModalProps } from '@types';

import { ModalHeader, ModalWrapper } from '@components/ui/modals';

import { ChangePasswordForm } from './change-password-form';

export function ChangePasswordModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      closeBtnRef={closeBtnRef}
      header={<ModalHeader
        title="Update your password"
        subtitle="Enter your current password and a new password."
        alt
      />}
    >
      <ChangePasswordForm closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}