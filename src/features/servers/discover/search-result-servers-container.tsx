import { useSearchParams } from 'react-router-dom';
import pluralize from 'pluralize';

import {
  ServerSearchForm,
  SearchResultServersList,
} from '@features/servers/discover';

import { useGetPublicServersQuery } from '@features/servers/api';

export function SearchResultServersContainer() {
  const [params] = useSearchParams();
  const query = params.get('query');

  const { data, isLoading } = useGetPublicServersQuery(query as string);

  if (isLoading || !data) return null;

  const numResults = data.totalDocs;

  return (
    <>
      <h2>{`${pluralize('community', numResults, true)} for '${query}'`}</h2>
      <ServerSearchForm />
      <SearchResultServersList servers={data.items} />
    </>
  );
}