import { UserSelfData } from '../types';

import { useSettingsContext } from '@components/context';

import { useGetUserData } from '@features/auth/hooks';

import { USER_SETTINGS_TABS } from '../tabs';

import { Avatar, ColorBanner } from '@components/ui/media';
import { Separator } from '@components/ui/displays';

import { UserStatusIcon } from '@features/statuses/get';

import { AccountEditSection } from './account-edit-section';
import { ChangePasswordButton } from './change-password-button';
import { ChangeUsernameButton } from './change-username-button';

import styles from './account-settings-form.module.scss';

export function AccountSettingsForm() {
  const { activeTabState } = useSettingsContext()!;
  const { user } = useGetUserData();

  if (!user.data) return null;

  const { set } = activeTabState;
  const {
    id,
    bannerColor,
    avatarUrl,
    displayName,
    username,
    email,
  } = user.data as UserSelfData;
  
  const goToProfile = () => { set(USER_SETTINGS_TABS[1].id); };

  return (
    <div>
      <div className={styles.container}>
        <ColorBanner color={bannerColor} className={styles.banner} />
        <div className={styles.header}>
          <div className={styles.wrapper}>
            <Avatar
              src={avatarUrl}
              notification={<UserStatusIcon userId={id} />}
            />
          </div>
          <h3>{displayName}</h3>
          <button onClick={goToProfile} className={styles.blueButton}>
            Edit User Profile
          </button>
        </div>
        <div className={styles.options}>
          <AccountEditSection
            header="DISPLAY NAME"
            value={displayName}
            button={(
              <button onClick={goToProfile}>Edit</button>
            )}
          />
          <AccountEditSection
            header="USERNAME"
            value={username}
            button={(
              <ChangeUsernameButton>Edit</ChangeUsernameButton>
            )}
          />
          <AccountEditSection
            header="EMAIL"
            value={email}
            revealPattern={/.+?(?=@)/}
            button={<button disabled>Edit</button>}
          />
        </div>
      </div>
      <Separator className={styles.divider} />
      <div className={styles.section}>
        <h2>Password and Authentication</h2>
        <ChangePasswordButton className={styles.blueButton}>Change Password</ChangePasswordButton>
      </div>
    </div>
  );
}