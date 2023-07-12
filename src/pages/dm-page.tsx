import { ContentLayout } from '@components/layouts';

export function DMPage() {
  return (
    <div>
      <ContentLayout
        header={<div>dm room info</div>}
        infoTab={<div>contacts info</div>}
      >
        <div>DM MESSAGES</div>
      </ContentLayout>
    </div>
  );
}