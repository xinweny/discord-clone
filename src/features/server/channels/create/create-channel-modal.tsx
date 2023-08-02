import { useRef } from 'react';

import type { CategoryData } from '@features/server/categories/api';
import type { ModalProps } from '@types';

import { CreateChannelForm } from './create-channel-form';

type CreateChannelModalProps = {
  category?: CategoryData;
} & ModalProps;

export function CreateChannelModal({
  show,
  onClose,
  category
}: CreateChannelModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  if (!show) return null;

  return (
    <div>
      <div>
        <h2>Create Channel</h2>
        {category && <p>{`in ${category.name}`}</p>}
      </div>
      <CreateChannelForm categoryId={category?._id} closeBtnRef={closeBtnRef} />
      <button ref={closeBtnRef} type="button" onClick={onClose}>x</button>
    </div>
  );
}