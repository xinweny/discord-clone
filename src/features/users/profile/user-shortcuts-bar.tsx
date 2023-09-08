import { UserQuickInfo } from './user-quick-info';
import { UserSettingsButton } from '@features/users/settings';

export function UserShortcutsBar() {
  return (
    <div>
      <UserQuickInfo />
      <UserSettingsButton />
    </div>
  )
}