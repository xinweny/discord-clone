import { useState } from 'react';

import type { ModalProps } from '@types';

import { ModalHeader, ModalWrapper } from '.';
import { FormGroup, Input } from '../forms';

import styles from './confirmation-modal.module.scss';

type ConfirmationModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmation?: {
    value: string;
    label: string;
  };
  confirmLabel?: string;
  children?: React.ReactNode;
  hasScroll?: boolean;
} & ModalProps;

export function ConfirmationModal({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  confirmation,
  confirmLabel,
  children,
  hasScroll = true,
}: ConfirmationModalProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(!!confirmation);

  if (!isOpen) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      closeModal={onClose}
      header={<ModalHeader
        title={title}
        subtitle={message}
        alt
        className={styles.header}
      />}
      hasScroll={hasScroll}
    >
      <div className="content">
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
        {children}
      </div>
      <div className={styles.submit}>
        <button type="button" onClick={onClose}>Cancel</button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          disabled={isDisabled}
        >
          {confirmLabel || title}
        </button>
      </div>
    </ModalWrapper>
  );
}