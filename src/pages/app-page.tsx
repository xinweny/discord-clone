import { Outlet } from 'react-router-dom';

import { useFetch, useAppSelector } from '@common/hooks';

import { AppLayout } from '@common/components/layouts';

export function AppPage() {
  const userId = useAppSelector(state => state.auth.userId);

  const [user] = useFetch(`/users/${userId}`);

  return (
    <div>
      <AppLayout navBar={<div>nav</div>}>
        <Outlet context={user} />
      </AppLayout>
    </div>
  );
}