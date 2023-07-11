import { Outlet } from 'react-router-dom';

import { MainLayout } from '@common/components/layouts';

export function DashboardPage() {
  return (
    <div>
      <MainLayout sideBar={<div>dms</div>}>
        <Outlet />
      </MainLayout>
    </div>
  );
}