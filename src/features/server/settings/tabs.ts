import { generateTabs } from '@utils';

import { ServerOverviewForm } from '../edit';

export const SERVER_SETTINGS = generateTabs({
  'Overview': ServerOverviewForm,
  // 'Roles': EditRolesForm,
  // 'Emoji': CustomEmojiForm,
});