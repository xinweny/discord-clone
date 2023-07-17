import { Outlet } from 'react-router-dom';

import { useRefreshTokenQuery } from '@features/auth/api';
import { useGetUserSelfQuery } from '@features/user/api';

import { ServerNavBar } from '@features/servers/nav';

import { AppLayout } from '@components/layouts';


export function AppPage() {
  const auth = useRefreshTokenQuery();

  const user = useGetUserSelfQuery(auth.data!.userId);

  if (user.isLoading) return null;

  const servers = user.data?.servers || [];

  return (
    <div>
      <AppLayout navBar={<ServerNavBar servers={servers} />}>
        <Outlet context={user.data} />
      </AppLayout>
    </div>
  );
}