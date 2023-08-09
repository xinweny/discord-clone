import type { TabData } from '@utils';

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
            ? <SettingsForm key={tab.id} />
            : null;
        }
      )}
    </div>
  );
}