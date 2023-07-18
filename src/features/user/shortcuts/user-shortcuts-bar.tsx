import { UserQuickInfo } from './user-quick-info';
import { UserSettingsButton } from '@features/user/settings';

export function UserShortcutsBar() {
  return (
    <div>
      <UserQuickInfo />
      <UserSettingsButton />
      
    </div>
  )
}