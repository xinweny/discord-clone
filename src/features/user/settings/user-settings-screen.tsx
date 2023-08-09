import { ProfilesSettingsForm } from './profiles-settings-form';
import { SettingsScreen } from '@components/ui/presentation';

type UserSettingsProps = {
  activeTabId: string;
};

export function UserSettingsScreen({ activeTabId }: UserSettingsProps) {
  return (
    <SettingsScreen
      activeTabId={activeTabId}
      formDict={{
        profiles: ProfilesSettingsForm,
      }}
    />
  );
}