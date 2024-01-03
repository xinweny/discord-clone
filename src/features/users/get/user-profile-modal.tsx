import { useRef } from 'react';

import type { ModalProps } from '@types';

import { ModalWrapper } from '@components/ui/modals';

import { useGetUserQuery } from '../api';

type UserProfileModalProps = {
  userId?: string;
} & ModalProps;

export function UserProfileModal({
  isOpen,
  onClose,
  userId,
}: UserProfileModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const { data: user } = useGetUserQuery(userId!);

  if (!user) return null;

  return (
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      closeBtnRef={closeBtnRef}
    >
      <div></div>
    </ModalWrapper>
  );
}