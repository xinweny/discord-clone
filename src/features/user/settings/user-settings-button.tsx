import { useModal } from '@hooks';

import { UserSettingsModal } from './user-settings-modal';

export function UserSettingsButton() {
  const [show, toggle] = useModal();

  return (
    <div>
      <button type="button" onClick={toggle}>
        <img src="#" alt="User settings" />
      </button>
      <UserSettingsModal show={show} toggle={toggle} />
    </div>
  );
}