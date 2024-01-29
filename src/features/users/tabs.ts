import { generateTabs } from '@utils';

import { AccountSettingsForm } from './edit';
import { ProfilesSettingsTabs } from './settings';

export const USER_SETTINGS_TABS = generateTabs({
  'My Account': AccountSettingsForm,
  'Profiles': ProfilesSettingsTabs,
});