import { Outlet } from 'react-router-dom';

import { useRefreshTokenQuery } from '@features/auth/api';
import { useGetUserSelfQuery } from '@features/user/api';

import { AppLayout } from '@components/layouts';
import { NavBar } from '@components/ui';

export function AppPage() {
  const auth = useRefreshTokenQuery();

  const user = useGetUserSelfQuery(auth.data!.userId);

  if (user.isLoading) return null;

  const servers = user.data?.servers || [];

  return (
    <div>
      <AppLayout navBar={<NavBar servers={servers} />}>
        <Outlet context={user.data} />
      </AppLayout>
    </div>
  );
}