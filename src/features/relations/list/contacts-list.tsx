import { useState, useEffect } from 'react';


import { ContactsSearch } from './contacts-search';
import { ContactsContainer } from './contacts-container';

type ContactsListProps = {
  activeTab: string;
};

export function ContactsList({ activeTab }: ContactsListProps) {
  const [query, setQuery] = useState<string>('');

  useEffect(() => { setQuery('') }, [activeTab]);

  return (
    <div>
      <ContactsSearch query={query} setQuery={setQuery} />
      <ContactsContainer query={query} activeTab={activeTab} />
    </div>
  );
}