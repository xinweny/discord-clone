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
              <div>
                <h2>{tab.label}</h2>
                <SettingsForm key={tab.id} />
              </div>
            )
            : null;
        }
      )}
    </div>
  );
}