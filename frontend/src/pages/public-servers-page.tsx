import { useRef } from 'react';

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

  const ref = useRef<HTMLDivElement>(null);

  return (
    <MainLayout sideBar={<DiscoverServersNavbar />}>
      <ContentLayout>
        <div className={styles.content} ref={ref}>
          <SearchQueryWrapper
            result={<SearchResultServersContainer />}
          >
            <DiscoverServersContainer containerRef={ref} />
          </SearchQueryWrapper>
        </div>
      </ContentLayout>
    </MainLayout>
  );
}