import { Outlet } from 'react-router-dom';

import { useGetUserData } from '@features/auth/hooks';
import { useLivekit } from '@features/webrtc/hooks';

import { LivekitContext } from '@features/webrtc/context';

import { JoinedServersNavbar } from '@features/servers/joined';
import { LivekitRoom } from '@features/webrtc/stream';

import { AppLayout } from '@components/layouts';

export function AppPage() {
  const { user } = useGetUserData();
  const livekit = useLivekit();

  if (user.isLoading) return null;

  return (
    <LivekitContext.Provider value={livekit}>
      <div>
        <LivekitRoom>
          <AppLayout navBar={<JoinedServersNavbar userId={user.data!.id} />}>
              <Outlet context={user.data} />
          </AppLayout>
        </LivekitRoom>
      </div>
    </LivekitContext.Provider>
  );
}