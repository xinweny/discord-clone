import { useSearchParams } from 'react-router-dom';
import pluralize from 'pluralize';

import { ContentLayout } from '@components/layouts';

import {
  ServerSearchForm,
  SearchResultServersContainer,
} from '@features/servers/discover';

import { useGetPublicServersQuery } from '@features/servers/api';

export function SearchResultServersPage() {
  const [params] = useSearchParams();
  const query = params.get('query');

  const { data, isLoading } = useGetPublicServersQuery(query as string);

  if (isLoading || !data) return null;

  const numResults = data.totalDocs;

  return (
    <ContentLayout>
      <div>
        <h2>{`${pluralize('community', numResults, true)} for '${query}'`}</h2>
        <ServerSearchForm />
        <SearchResultServersContainer servers={data.items} />
      </div>
    </ContentLayout>
  );
}