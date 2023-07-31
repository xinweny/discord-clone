import { ProfilesSettings } from './profiles-settings';

type UserSettingsProps = {
  activeTabId: string;
};

export function UserSettings({ activeTabId }: UserSettingsProps) {
  return (
    <div>
      {activeTabId === 'profiles' && <ProfilesSettings />}
    </div>
  );
}