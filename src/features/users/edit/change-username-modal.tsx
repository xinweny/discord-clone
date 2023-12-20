import { useRef } from 'react';

import { ModalWrapper } from '@components/ui/modals';

import { ChangeUsernameForm } from './change-username-form';

import type { ModalProps } from '@types';

export function ChangeUsernameModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen} closeBtnRef={closeBtnRef}>
      <header>
        <h2>Change your username</h2>
        <p>Enter a new username and your existing password.</p>
      </header>
      <ChangeUsernameForm closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}