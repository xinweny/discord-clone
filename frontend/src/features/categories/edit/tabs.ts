import { generateTabs } from '@utils';

import { CategoryOverviewForm } from './category-overview-form';

export const CATEGORY_SETTINGS = generateTabs({
  'Overview': CategoryOverviewForm,
});