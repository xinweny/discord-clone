import { Outlet } from 'react-router-dom';

import { MainLayout } from '@components/layouts';

import { DmsNavbar } from '@features/dms/nav';

export function DashboardPage() {
  return (
    <MainLayout sideBar={<DmsNavbar />}>
      <Outlet />
    </MainLayout>
  );
}