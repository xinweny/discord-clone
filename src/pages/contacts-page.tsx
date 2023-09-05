import { ContentLayout } from '@components/layouts';

import { useActiveIds } from '@hooks';

export function ContactsPage() {
  const activeTabState = useActiveIds('online');

  const { id } = activeTabState;

  return (
    <div>
      <ContentLayout
        header={<div>contacts nav</div>}
      >
        
      </ContentLayout>
    </div>
  )
}