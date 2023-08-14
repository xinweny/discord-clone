import { useState } from 'react';

import type { ModalProps } from '@types';

import { ModalWrapper } from '@components/wrappers';
import { FormGroup, Input } from '../forms';

type ConfirmationModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmation?: {
    value: string;
    label: string;
  };
} & ModalProps;

export function ConfirmationModal({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  confirmation,
}: ConfirmationModalProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(!!confirmation);

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} closeModal={onClose}>
      <h2>{title}</h2>
      <p>{message}</p>
      {confirmation && (
        <FormGroup label={confirmation.label}>
          <Input
            name="confirmation"
            type="text"
            label={confirmation.label}
            onChange={(e) => {
              if (e.target.value === confirmation.value) setIsDisabled(false);
            }}
          />
        </FormGroup>
      )}
      <div>
        <button type="button" onClick={onClose}>Cancel</button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          disabled={isDisabled}
        >
          {title}
        </button>
      </div>
    </ModalWrapper>
  );
}