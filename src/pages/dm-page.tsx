import { MainLayout } from '@common/components/layouts/main-layout'

export function DMPage() {
  return (
    <div>
      <MainLayout
        sideBar={<div>dms</div>}
        mainContent={<div>dm messages</div>}
        infoTab={<div>contact info</div>}
      />
    </div>
  );
}