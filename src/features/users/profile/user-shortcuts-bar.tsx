import { UserQuickInfo } from './user-quick-info';
import { CallShortcuts } from '@features/webrtc/stream';

export function UserShortcutsBar() {
  return (
    <div>
      <CallShortcuts />
      <UserQuickInfo />
    </div>
  );
}