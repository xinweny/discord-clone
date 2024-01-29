import { ModalProps } from '@types';

import { NoticeModal } from '@components/ui/modals';

import styles from './password-request-sent-modal.module.scss';

type PasswordRequestSentModalProps = {
  email?: string;
} & ModalProps;

export function PasswordRequestSentModal({
  email = '',
  isOpen,
  onClose,
}: PasswordRequestSentModalProps) {
  return (
    <NoticeModal
      title="Instructions Sent"
      children={<span className={styles.message}>
        We sent instructions to change your password to <span>{email}</span>, please check both your inbox and spam folder.
      </span>}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}