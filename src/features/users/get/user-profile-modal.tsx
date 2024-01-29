
import type { ModalProps } from '@types';

import { useGetUserData } from '@features/auth/hooks';

import { ModalWrapper } from '@components/ui/modals';
import { Tabs } from '@components/ui/tabs';
import { Separator } from '@components/ui/displays';

import { MutualServersList, MutualFriendsList } from '@features/mutuals/list';
import { UserProfileOptions } from '@features/relations/get';

import { UserHeader, UserInfo, UserSplash } from '.';

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

  return (
    <ModalWrapper
      closeModal={onClose}
      isOpen={isOpen}
      className={styles.container}
    >
      <div className={styles.modal}>
        <UserSplash user={user} className={styles.banner} />
        <div className={styles.options}>
          {!isSelf && <UserProfileOptions
            senderId={selfId}
            recipientId={userId}
            closeModal={onClose}
          />}
        </div>
        <div className={styles.content}>
          <UserHeader user={user} className={styles.header} />
          {isSelf
            ? <>
              <Separator className={styles.separator} />
              <UserInfo user={user} className={styles.info} />
            </>
            : <Tabs
              tabs={{
                'User Info': <UserInfo user={user} className={styles.info} />,
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
              className={styles.tabs}
              activeStyles={styles.active}
            />
          }
        </div>
      </div>
    </ModalWrapper>
  );
}