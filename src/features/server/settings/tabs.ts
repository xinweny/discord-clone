import { generateTabs } from '@utils';

import { ServerOverviewForm } from '../edit';
import { CustomEmojiForm } from '@features/emojis/edit';

export const SERVER_SETTINGS = generateTabs({
  'Overview': ServerOverviewForm,
  // 'Roles': EditRolesForm,
  'Emoji': CustomEmojiForm,
});