import type { ModalProps } from '@types';

import { ModalWrapper } from '@components/wrappers';

type ConfirmationModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
} & ModalProps;

export function ConfirmationModal({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} closeModal={onClose}>
      <h2>{title}</h2>
      <p>{message}</p>
      <div>
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="button" onClick={onConfirm}>{title}</button>
      </div>
    </ModalWrapper>
  );
}