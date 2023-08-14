import { generateTabs } from '@utils';

import { ServerOverviewForm } from './server-overview-form';

export const SERVER_SETTINGS = generateTabs({
  'Overview': ServerOverviewForm,
  // 'Roles': EditRolesForm,
  // 'Emoji': CustomEmojiForm,
});