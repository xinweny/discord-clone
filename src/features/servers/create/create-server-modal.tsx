import { useRef } from 'react';

import { ModalHeader, ModalWrapper } from '@components/ui/modals';

import { CreateServerForm } from './create-server-form';

import type { ModalProps } from '@types';

export function CreateServerModal({
  isOpen, onClose
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      closeBtnRef={closeBtnRef}
      header={<ModalHeader
        title="Create a server"
        subtitle="Your server is where you and your friends hang out. Make yours and start talking."
        alt
      />}
    >
      <CreateServerForm closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}