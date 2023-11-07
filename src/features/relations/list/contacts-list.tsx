import { useState, useEffect } from 'react';

import { ContactsTabs } from '../types';

import { ContactsSearch } from './contacts-search';
import { ContactsContainer } from './contacts-container';

import styles from './contacts-list.module.scss';

type ContactsListProps = {
  activeTab: ContactsTabs;
};

export function ContactsList({ activeTab }: ContactsListProps) {
  const [query, setQuery] = useState<string>('');

  useEffect(() => { setQuery('') }, [activeTab]);

  return (
    <div className={styles.container}>
      <ContactsSearch query={query} setQuery={setQuery} />
      <ContactsContainer query={query} activeTab={activeTab} />
    </div>
  );
}