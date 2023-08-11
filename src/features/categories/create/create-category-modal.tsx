import { useRef } from 'react';

import type { ModalProps } from '@types';

import { ModalWrapper } from '@components/wrappers';

import { CreateCategoryForm } from './create-category-form';

export function CreateCategoryModal({ isOpen, onClose }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper isOpen={isOpen} closeModal={onClose} >
      <div>
        <h2>Create Category</h2>
      </div>
      <CreateCategoryForm closeBtnRef={closeBtnRef} />
      <button ref={closeBtnRef} type="button" onClick={onClose}>x</button>
    </ModalWrapper>
  );
}