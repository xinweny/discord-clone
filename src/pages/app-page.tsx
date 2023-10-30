import { Outlet } from 'react-router-dom';

import { LivekitContext } from '@features/webrtc/context';

import { useGetUserData } from '@features/auth/hooks';
import { useLivekit } from '@features/webrtc/hooks';
import { useJoinAllRooms } from '@features/notifications/hooks';

import { AppLayout } from '@components/layouts';

import { JoinedServersNavbar } from '@features/servers/joined';
import { LivekitRoom } from '@features/webrtc/stream';

import styles from './app-page.module.scss';

export function AppPage() {
  const { user } = useGetUserData();
  const livekit = useLivekit();

  useJoinAllRooms(user.data);

  if (!user.isSuccess) return null;

  return (
    <LivekitContext.Provider value={livekit}>
        <LivekitRoom>
          <div className={styles.page}>
            <AppLayout navBar={<JoinedServersNavbar userId={user.data!.id} />}>
                <Outlet context={user.data} />
            </AppLayout>
          </div>
        </LivekitRoom>
    </LivekitContext.Provider>
  );
}