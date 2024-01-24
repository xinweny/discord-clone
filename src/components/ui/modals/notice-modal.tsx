import type { ModalProps } from '@types';

import { ModalWrapper } from '.';

import styles from './notice-modal.module.scss';

type NoticeModalProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  confirmLabel?: string;
} & ModalProps;

export function NoticeModal({
  title,
  isOpen,
  onClose,
  className,
  children,
  confirmLabel = 'Okay',
}: NoticeModalProps) {
  if (!isOpen) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      closeModal={onClose}
      className={`${styles.wrapper} ${className || ''}`}
      header={<header className={styles.header}>
        <h1>{title}</h1>
      </header>}
    >
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.confirm}>
        <button
          type="button"
          onClick={onClose}
        >
          {confirmLabel}
        </button>
      </div>
    </ModalWrapper>
  );
}