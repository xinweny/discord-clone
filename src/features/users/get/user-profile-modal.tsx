
import type { ModalProps } from '@types';

import { useGetUserData } from '@features/auth/hooks';

import { ModalWrapper } from '@components/ui/modals';
import { Avatar, ColorBanner } from '@components/ui/media';
import { Tabs } from '@components/ui/tabs';

import { UserStatusIcon } from '../status';

import { useGetUserQuery } from '../api';

import styles from './user-profile-modal.module.scss';

type UserProfileModalProps = {
  userId?: string;
} & ModalProps;

export function UserProfileModal({
  isOpen,
  onClose,
  userId,
}: UserProfileModalProps) {
  const { user: self } = useGetUserData();

  const { data: user } = useGetUserQuery(userId!);

  if (!userId || !user) return null;

  const isSelf = userId === self.data?.id;

  const { bannerColor, avatarUrl } = user;

  return (
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      className={styles.modal}
    >
      <div>
        <ColorBanner color={bannerColor} className={styles.banner}>
          <Avatar
            src={avatarUrl}
            notification={<UserStatusIcon userId={userId} />}
          />
        </ColorBanner>
        <div className={styles.options}>
          {!isSelf && <div></div>}
        </div>
        <div className={styles.content}>
          
        </div>
      </div>
    </ModalWrapper>
  );
}