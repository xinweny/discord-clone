import { useRef } from 'react';

import type { ModalProps } from '@types';

import { ModalHeader, ModalWrapper } from '@components/ui/modals';

import { ChangeUsernameForm } from './change-username-form';

export function ChangeUsernameModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      closeBtnRef={closeBtnRef}
      header={<ModalHeader
        title="Change your username"
        subtitle="Enter a new username and your existing password."
        alt
      />}
    >
      <ChangeUsernameForm closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}