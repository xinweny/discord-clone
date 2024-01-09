import { Tabs } from '@components/ui/tabs';

import { ProfilesSettingsForm } from '../edit';
import { EditServerProfileForm } from '@features/members/edit';

export function ProfilesSettingsTabs() {
  return (
    <Tabs
      tabs={{
        'User Profile': <ProfilesSettingsForm />,
        'Server Profiles': <EditServerProfileForm />,
      }}
    />
  );
}