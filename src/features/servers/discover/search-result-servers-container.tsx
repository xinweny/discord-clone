import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import pluralize from 'pluralize';

import {
  ServerSearchForm,
  SearchResultServersList,
} from '@features/servers/discover';

import { Paginator } from './paginator';

import { useGetPublicServersQuery } from '@features/servers/api';

import ArrowIcon from '@assets/icons/arrow.svg?react';

import styles from './search-result-servers-container.module.scss';

export function SearchResultServersContainer() {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const [page, setPage] = useState<number>(1);

  const query = params.get('query');

  const { data, isLoading } = useGetPublicServersQuery({
    query: query as string,
    page: Number(params.get('page')),
    limit: Number(params.get('limit')),
  });

  if (isLoading || !data) return null;

  const numResults = data.totalDocs;

  return (
    <>
      <div className={styles.header}>
        <button onClick={() => { navigate('/servers'); }}>
          <ArrowIcon />
        </button>
        <h2>{`${pluralize('community', numResults, true)} for "${query}"`}</h2>
      </div>
      <ServerSearchForm page={page} className={styles.form} />
      <SearchResultServersList servers={data.items} />
      <Paginator
        currentPage={page}
        totalPages={data.totalPages}
        setPage={setPage}
      />
    </>
  );
}