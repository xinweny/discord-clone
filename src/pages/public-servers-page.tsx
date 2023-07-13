import { MainLayout } from '@components/layouts';
import { SearchQueryWrapper } from '@components/wrappers';

import { DiscoverServersPage, SearchResultServersPage } from '@features/servers/discover';

export function PublicServersPage() {
  return (
    <div>
      <MainLayout sideBar={<div>categories</div>}>
        <SearchQueryWrapper
          result={<SearchResultServersPage />}
        >
          <DiscoverServersPage />
        </SearchQueryWrapper>
      </MainLayout>
    </div>
  );
}