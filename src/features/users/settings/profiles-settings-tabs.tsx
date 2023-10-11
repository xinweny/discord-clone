import { useActiveIds } from '@hooks';

import { ProfileSettingsTabs } from '../types';

import { ProfilesSettingsForm } from '../edit';

export function ProfilesSettingsTabs() {
  const { id, set } = useActiveIds(ProfileSettingsTabs.USER_PROFILE);

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => { set(ProfileSettingsTabs.USER_PROFILE); }}
        >User Profile</button>
        <button
          type="button"
          onClick={() => { set(ProfileSettingsTabs.SERVER_PROFILES); }}
        >Server Profiles</button>
      </div>
      {id === ProfileSettingsTabs.USER_PROFILE
        ? <ProfilesSettingsForm />
        : <></>
      }
    </div>
  );
}