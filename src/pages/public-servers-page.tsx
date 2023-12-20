import { setDocumentTitle } from '@utils';

import { MainLayout, ContentLayout } from '@components/layouts';
import { SearchQueryWrapper } from '@components/wrappers';

import {
  DiscoverServersNavbar,
  DiscoverServersContainer,
  SearchResultServersContainer,
} from '@features/servers/discover';

import styles from './public-servers-page.module.scss';

export function PublicServersPage() {
  setDocumentTitle(['Find your community']);

  return (
    <MainLayout sideBar={<DiscoverServersNavbar />}>
      <ContentLayout>
        <div className={styles.content}>
          <SearchQueryWrapper
            result={<SearchResultServersContainer />}
          >
            <DiscoverServersContainer />
          </SearchQueryWrapper>
        </div>
      </ContentLayout>
    </MainLayout>
  );
}