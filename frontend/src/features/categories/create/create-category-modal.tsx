import { useRef } from 'react';

import type { ModalProps } from '@types';

import { ModalHeader, ModalWrapper } from '@components/ui/modals';

import { CreateCategoryForm } from './create-category-form';

export function CreateCategoryModal({ isOpen, onClose }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper
      isOpen={isOpen}
      closeModal={onClose}
      header={<ModalHeader title="Create Category" />}
      closeBtnRef={closeBtnRef}
    >
      <CreateCategoryForm closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}