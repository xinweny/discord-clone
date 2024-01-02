import { useRef } from 'react';

import type { CategoryData } from '@features/categories/types';
import type { ModalProps } from '@types';

import { ModalHeader, ModalWrapper } from '@components/ui/modals';

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
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      closeBtnRef={closeBtnRef}
      header={<ModalHeader
        title="Create Channel"
        subtitle={category && `in ${category.name}`}
      />}
    >
      <CreateChannelForm categoryId={category?._id} closeBtnRef={closeBtnRef} />
    </ModalWrapper>
  );
}