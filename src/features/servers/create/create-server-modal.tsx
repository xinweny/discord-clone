import { useRef } from 'react';

import { ModalWrapper } from '@components/ui/modals';

import { CreateServerForm } from './create-server-form';

import type { ModalProps } from '@types';

export function CreateServerModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen} closeBtnRef={closeBtnRef}>
      <header>
        <h2>Create a server</h2>
        <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
      </header>
      <CreateServerForm closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}