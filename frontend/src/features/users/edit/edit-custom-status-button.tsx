import { ModalButton } from '@components/ui/buttons';

import { useGetUserData } from '@features/auth/hooks';

import { EditCustomStatusModal } from './edit-custom-status-modal';

import { useUpdateUserMutation, useGetUserQuery } from '../api';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './edit-custom-status-button.module.scss';

type EditCustomStatusButtonProps = {
  customStatus?: string;
  children: React.ReactNode;
  className?: string;
};

export function EditCustomStatusButton({ customStatus, children, className }: EditCustomStatusButtonProps) {
  const { user } = useGetUserData();
  const userId = user.data!.id;

  const { data: self } = useGetUserQuery(userId);

  const [updateCustomStatus] = useUpdateUserMutation();

  if (!self) return null;

  const { bannerColor, username, displayName } = self;

  const resetCustomStatus = async () => {
    if (self.customStatus) await updateCustomStatus({
      userId,
      bannerColor,
      username,
      displayName,
      customStatus: '',
    }).unwrap();
  };

  return (
    <div className={`${styles.button} ${className || ''}`}>
      <ModalButton
        modal={EditCustomStatusModal}
        className={styles.editButton}
      >
        {children}
      </ModalButton>
      {customStatus && (
        <button onClick={resetCustomStatus} className={styles.resetButton}>
          <CrossIcon />
        </button>
      )}
    </div>
  );
}