import _ from 'lodash';

type SettingsScreenProps = {
  activeTabId: string;
  formDict: {
    [key: string]: React.FC;
  };
};

export function SettingsScreen({ activeTabId, formDict }: SettingsScreenProps) {
  return (
    <div>
      {_.map(
        formDict,
        (component, id) => {
          const SettingsForm = component;
          return (activeTabId === id)
            ? <SettingsForm key={id} />
            : null;
        }
      )}
    </div>
  );
}