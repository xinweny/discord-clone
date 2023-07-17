import { UserQuickInfo } from './user-quick-info';
import { UserSettingsModal } from '../settings/user-settings-modal';

import { useModal } from '@hooks';

export function UserShortcutsBar() {
  const [display, toggle] = useModal();

  return (
    <div>
      <UserQuickInfo />
      <button onClick={toggle}>
        <img src="#" alt="Settings" />
      </button>
      <UserSettingsModal display={display} hide={toggle} />
    </div>
  )
}