
import type { ModalProps } from '@types';

import { useGetUserData } from '@features/auth/hooks';

import { ModalWrapper } from '@components/ui/modals';
import { Avatar, ColorBanner } from '@components/ui/media';
import { Tabs } from '@components/ui/tabs';

import { UserStatusIcon } from '../status';
import { MutualServersList, MutualFriendsList } from '@features/mutuals/list';
import { UserProfileOptions } from '@features/relations/get';

import { UserHeader, UserInfo } from '.';

import { useGetUserQuery } from '../api';

import noCommonServersSrc from '@assets/static/no-common-servers.svg';
import noCommonFriendsSrc from '@assets/static/no-common-friends.svg';

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
  const selfId = self.data!.id;

  const { data: user } = useGetUserQuery(userId!);

  if (!userId || !user) return null;

  const isSelf = userId === selfId;

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
          {!isSelf && <UserProfileOptions
            senderId={selfId}
            recipientId={userId}
          />}
        </div>
        <div className={styles.content}>
          <UserHeader user={user} />
          {isSelf
            ? <UserInfo user={user} />
            : <Tabs
              tabs={{
                'User Info': <UserInfo user={user} />,
                'Mutual Servers': <MutualServersList
                  participantId={userId}
                  placeholder={<div className={styles.noResult}>
                    <img src={noCommonServersSrc} />
                    <span>NO SERVERS IN COMMON</span>
                  </div>}
                />,
                'Mutual Friends': <MutualFriendsList
                  participantId={userId}
                  placeholder={<div className={styles.noResult}>
                    <img src={noCommonFriendsSrc} />
                    <span>NO FRIENDS IN COMMON</span>
                  </div>}
                />,
              }}
            />
          }
        </div>
      </div>
    </ModalWrapper>
  );
}