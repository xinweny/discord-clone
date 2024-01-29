import { useState } from 'react';

import type { ModalProps } from '@types';

import { ModalHeader, ModalWrapper } from '.';
import { Input } from '../forms';

import styles from './confirmation-modal.module.scss';

type ConfirmationModalProps = {
  title: string;
  message: string | React.ReactNode;
  onConfirm: () => void;
  confirmation?: {
    value: string;
    label: string;
  };
  confirmLabel?: string;
  children?: React.ReactNode;
  hasScroll?: boolean;
  className?: string;
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
  className,
  hasScroll = true,
}: ConfirmationModalProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(!!confirmation);

  if (!isOpen) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      closeModal={onClose}
      className={`${styles.wrapper} ${className || ''}`}
      header={<ModalHeader
        title={title}
        subtitle={message}
        alt
        className={styles.header}
      />}
      hasScroll={hasScroll}
    >
      <div className={styles.content}>
        {children}
        {confirmation && (
          <div className={styles.confirmation}>
            <label>
              <h2>{confirmation.label}</h2>
            </label>
            <Input
              name="confirmation"
              type="text"
              label={confirmation.label}
              onChange={(e) => {
                if (e.target.value === confirmation.value) setIsDisabled(false);
              }}
            />
          </div>
        )}
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