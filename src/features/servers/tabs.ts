import { generateTabs } from '@utils';

import { ServerOverviewForm } from './edit';
import { CustomEmojiForm } from '@features/emojis/list';
import { ServerRolesForm } from '@features/roles/settings';

export const SERVER_SETTINGS = generateTabs({
  'Overview': ServerOverviewForm,
  'Roles': ServerRolesForm,
  'Emoji': CustomEmojiForm,
});