import { useRef } from 'react';

import type { CategoryData } from '@features/categories/types';
import type { ModalProps } from '@types';

import { ModalWrapper } from '@components/wrappers';

import { CreateChannelForm } from './create-channel-form';

type CreateChannelModalProps = {
  category?: CategoryData;
} & ModalProps;

export function CreateChannelModal({
  isOpen,
  onClose,
  category
}: CreateChannelModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen}>
      <div>
        <h2>Create Channel</h2>
        {category && <p>{`in ${category.name}`}</p>}
      </div>
      <CreateChannelForm categoryId={category?._id} closeBtnRef={closeBtnRef} />
      <button ref={closeBtnRef} type="button" onClick={onClose}>x</button>
    </ModalWrapper>
  );
}