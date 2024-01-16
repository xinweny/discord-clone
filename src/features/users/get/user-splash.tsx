import { UserData } from '../types';

import { ColorBanner, Avatar } from '@components/ui/media';

import { UserStatusIcon } from '../status';
import { UserProfileButton } from '.';

import styles from './user-splash.module.scss';

type UserSplashProps = {
  user: Pick<UserData, '_id' | 'bannerColor' | 'avatarUrl'>;
  className?: string;
  withProfileBtn?: boolean;
  onClick?: () => void;
};

export function UserSplash({
  user,
  className,
  withProfileBtn = false,
  onClick,
}: UserSplashProps) {
  const { _id, bannerColor, avatarUrl } = user;

  const avatar = (
    <div className={styles.wrapper}>
      <Avatar
        src={avatarUrl}
        notification={<UserStatusIcon userId={_id} />}
      />
    </div>
  );

  return (
    <ColorBanner
      className={`${styles.banner} ${className || ''}`}
      color={bannerColor}
    >
      {withProfileBtn
        ? <UserProfileButton userId={_id} onOpen={onClick}>
          {avatar}
        </UserProfileButton>
        : avatar
      }
    </ColorBanner>
  );
}