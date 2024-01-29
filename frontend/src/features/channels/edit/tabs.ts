import { generateTabs } from '@utils';

import { ChannelOverviewForm } from './channel-overview-form';

export const CHANNEL_SETTINGS = generateTabs({
  'Overview': ChannelOverviewForm,
});