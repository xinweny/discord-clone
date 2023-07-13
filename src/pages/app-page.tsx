import { Outlet } from 'react-router-dom';

import { useRefreshTokenQuery } from '@services/api/auth';
import { useGetUserSelfQuery } from '@services/api/user';

import { AppLayout } from '@components/layouts';
import { NavBar } from '@components/ui';

export function AppPage() {
  const auth = useRefreshTokenQuery();

  const user = useGetUserSelfQuery(auth.data!.userId);

  if (user.isLoading) return null;

  const servers = user.data?.servers || [];

  console.log(user.data);

  return (
    <div>
      <AppLayout navBar={<NavBar servers={servers} />}>
        <Outlet context={user.data} />
      </AppLayout>
    </div>
  );
}