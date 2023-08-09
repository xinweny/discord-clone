import { generateTabs } from '@utils';

import { AccountSettingsForm } from './account-settings-form';
import { ProfilesSettingsForm } from './profiles-settings-form';

export const USER_SETTINGS = generateTabs({
  'My Account': AccountSettingsForm,
  'Profiles': ProfilesSettingsForm,
});