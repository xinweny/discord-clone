import { UserPanel } from './user-panel';
import { CallShortcuts } from '@features/webrtc/stream';

export function UserShortcutsBar() {
  return (
    <div>
      <CallShortcuts />
      <UserPanel />
    </div>
  );
}