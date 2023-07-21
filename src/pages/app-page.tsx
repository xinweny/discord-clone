import { Outlet } from 'react-router-dom';

import { useRefreshTokenQuery } from '@features/auth/api';
import { useGetUserSelfQuery } from '@features/user/api';

import { ServersNavBar } from '@features/servers/nav';

import { AppLayout } from '@components/layouts';


export function AppPage() {
  const auth = useRefreshTokenQuery();

  const user = useGetUserSelfQuery(auth.data!.userId);

  if (user.isLoading) return null;

  return (
    <div>
      <AppLayout navBar={<ServersNavBar userId={user.data!.id} />}>
        <Outlet context={user.data} />
      </AppLayout>
    </div>
  );
}