import { generateTabs } from '@utils';

import {
  AccountSettingsForm,
  ProfilesSettingsForm,
} from '../edit';

export const USER_SETTINGS = generateTabs({
  'My Account': AccountSettingsForm,
  'Profiles': ProfilesSettingsForm,
});