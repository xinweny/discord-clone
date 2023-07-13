import { ContentLayout } from '@components/layouts';

import { ServerSearchBanner } from './server-search-banner';

export function DiscoverServersPage() {
  return (
    <ContentLayout>
      <div>
        <ServerSearchBanner />
        <p>FEATURED SERVERS</p>
      </div>
    </ContentLayout>
  )
}