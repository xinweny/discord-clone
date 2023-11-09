import { useState, useEffect } from 'react';

import { ContactsTabs } from '../types';

import { ContactsSearch } from './contacts-search';
import { ContactsList } from './contacts-list';

import styles from './contacts-container.module.scss';

type ContactsContainerProps = {
  activeTab: ContactsTabs;
};

export function ContactsContainer({ activeTab }: ContactsContainerProps) {
  const [query, setQuery] = useState<string>('');

  useEffect(() => { setQuery('') }, [activeTab]);

  return (
    <div className={styles.container}>
      <ContactsSearch query={query} setQuery={setQuery} />
      <ContactsList query={query} activeTab={activeTab} />
    </div>
  );
}