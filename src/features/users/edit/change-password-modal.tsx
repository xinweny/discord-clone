import { useRef } from 'react';

import { ModalHeader, ModalWrapper } from '@components/ui/modals';

import { ChangePasswordForm } from './change-password-form';

import type { ModalProps } from '@types';

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