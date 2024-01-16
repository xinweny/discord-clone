import { useState } from 'react';

import { useGetUserData } from '@features/auth/hooks';

import { Separator } from '@components/ui/displays';

import { UserHeader, UserInfo, UserSplash } from '.';
import { EditCustomStatusButton } from '../edit';

import { useGetUserQuery } from '../api';

import styles from './self-short-profile.module.scss';

export function SelfShortProfile() {
  const { user } = useGetUserData();
  const userId = user.data!._id;

  const { data: self } = useGetUserQuery(userId);

  const [hidden, setHidden] = useState<boolean>(false);

  if (!self) return null;

  const separator = <Separator className={styles.separator} />;

  const { customStatus } = self;

  return (
    <div hidden={hidden} className={styles.card}>
      <UserSplash
        user={self}
        className={styles.banner}
        withProfileBtn
        onClick={() => { setHidden(true); }}
      />
      <div className={styles.content}>
        <UserHeader user={self} />
        {separator}
        <UserInfo user={self} />
        {separator}
        <EditCustomStatusButton customStatus={customStatus}>
          Edit Custom Status
        </EditCustomStatusButton>
      </div>
    </div>
  );
}