import { Outlet } from 'react-router-dom';

import { useGetUserData } from '@features/auth/hooks';
import { useLivekit } from '@features/webrtc/hooks';

import { WebRTCContext } from '@features/webrtc/context';

import { JoinedServersNavbar } from '@features/servers/joined';

import { AppLayout } from '@components/layouts';

export function AppPage() {
  const { user } = useGetUserData();
  const livekit = useLivekit();

  if (user.isLoading) return null;

  return (
    <WebRTCContext.Provider value={livekit}>
      <div>
        <AppLayout navBar={<JoinedServersNavbar userId={user.data!.id} />}>
            <Outlet context={user.data} />
        </AppLayout>
      </div>
    </WebRTCContext.Provider>
  );
}