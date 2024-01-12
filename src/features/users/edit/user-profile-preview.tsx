import { useFormContext, useWatch } from 'react-hook-form';

import { useFileWatchSingle } from '@components/hooks';
import { useGetUserData } from '@features/auth/hooks';

import { Avatar, ColorBanner } from '@components/ui/media';

import { UserStatusIcon } from '../status';

import styles from './user-profile-preview.module.scss';
import { Separator } from '@components/ui/displays';

export function UserProfilePreview() {
  const { user } = useGetUserData();
  const { id: userId, avatarUrl, username } = user.data!;

  const { control } = useFormContext();

  const displayName = useWatch({ control, name: 'displayName' });
  const bannerColor = useWatch({ control, name: 'bannerColor' });
  const bio = useWatch({ control, name: 'bio' });

  const { fileDataUrl } = useFileWatchSingle({ control, name: 'file' });

  return (
    <div className={styles.container}>
      <ColorBanner color={bannerColor} className={styles.banner}>
        <div className={styles.wrapper}>
          <Avatar
            src={fileDataUrl || avatarUrl}
            notification={<UserStatusIcon userId={userId} />}
          />
        </div>
      </ColorBanner>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{displayName}</h2>
          <span>{username}</span>
        </div>
        {bio && (
          <>
            <Separator className={styles.separator} />
            <div>
              <h3>ABOUT ME</h3>
              <p>{bio}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}