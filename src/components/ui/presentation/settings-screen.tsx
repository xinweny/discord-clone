import type { TabData } from '@utils';

export type SettingsScreenWrapperProps = {
  activeTabId: string;
};

type SettingsScreenProps = {
  activeTabId: string;
  tabs: TabData[];
};

export function SettingsScreen({ activeTabId, tabs }: SettingsScreenProps) {
  return (
    <div>
      {tabs.map(tab => {
          const SettingsForm = tab.component;
          return (activeTabId === tab.id)
            ? (
              <div key={tab.id}>
                <h2>{tab.label}</h2>
                <SettingsForm />
              </div>
            )
            : null;
        }
      )}
    </div>
  );
}