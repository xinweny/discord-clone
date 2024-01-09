import { generateTabs } from '@utils';

import {
  AccountSettingsForm,
  ProfilesSettingsForm,
} from './edit';
import { ProfilesSettingsTabs } from './settings';
import { EditServerProfileForm } from '@features/members/edit';

export const USER_SETTINGS = generateTabs({
  'My Account': AccountSettingsForm,
  'Profiles': ProfilesSettingsTabs,
});

export const PROFILE_SETTINGS = generateTabs({
  'User Profile': ProfilesSettingsForm,
  'Server Profiles': EditServerProfileForm,
});