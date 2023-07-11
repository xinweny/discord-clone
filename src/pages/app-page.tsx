import { Outlet } from 'react-router-dom';

import { useFetch, useAppSelector } from '@common/hooks';

import { IServer } from '@features/servers/types';

import { AppLayout } from '@common/components/layouts';
import { NavBar } from '@common/components/ui';

type UserType = {
  servers: IServer[];
}

export function AppPage() {
  const userId = useAppSelector(state => state.auth.userId);

  const [user] = useFetch<UserType>(`/users/${userId}`, 'user');

  if (!user) return null;

  return (
    <div>
      <AppLayout navBar={<NavBar servers={user.servers} />}>
        <Outlet context={user} />
      </AppLayout>
    </div>
  );
}