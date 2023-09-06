import { generateTabs } from '@utils';

import { ServerOverviewForm } from '../edit';
import { CustomEmojiForm } from '@features/emojis/form';
import { ServerRolesForm } from '@features/roles/form';

export const SERVER_SETTINGS = generateTabs({
  'Overview': ServerOverviewForm,
  'Roles': ServerRolesForm,
  'Emoji': CustomEmojiForm,
});