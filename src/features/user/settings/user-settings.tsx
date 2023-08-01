import { ProfilesSettingsForm } from './profiles-settings-form';

type UserSettingsProps = {
  activeTabId: string;
};

export function UserSettings({ activeTabId }: UserSettingsProps) {
  return (
    <div>
      {activeTabId === 'profiles' && <ProfilesSettingsForm />}
    </div>
  );
}