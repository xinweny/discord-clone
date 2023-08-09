import _ from 'lodash';
import { v4 as uuid } from 'uuid';

export type TabData = {
  id: string;
  label: string;
  component: React.FC;
};

type TabInfo = {
  [key: string]: React.FC;
};

export const generateTabs = (tabData: TabInfo): TabData[] => {
  const tabs = _.map(tabData, (fc, key) => ({
    id: uuid(),
    label: key,
    component: fc,
  }))

  return tabs;
};