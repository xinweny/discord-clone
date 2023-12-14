import type { TabData } from '@utils';

import styles from './settings-screen.module.scss';

export type SettingsScreenWrapperProps = {
  activeTabId: string;
};

type SettingsScreenProps = {
  activeTabId: string;
  tabs: TabData[];
};

export function SettingsScreen({ activeTabId, tabs }: SettingsScreenProps) {
  return (
    <div className={styles.wrapper}>
      {tabs.map(tab => {
        if (activeTabId !== tab.id) return null;

        const SettingsForm = tab.component;

        return (
          <div key={tab.id}>
            <h2>{tab.label}</h2>
            <SettingsForm />
          </div>
        );
      })}
    </div>
  );
}