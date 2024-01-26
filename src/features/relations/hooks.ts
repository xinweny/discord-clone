import { useEffect, useState } from 'react';

import {
  RelationData,
  ContactsTabs,
  RelationStatus,
} from './types';

const RELATION_DICT: {
  [key in ContactsTabs]: string;
} = {
  online: RelationStatus.FRIENDS,
  all: RelationStatus.FRIENDS,
  pending: 'pending',
  blocked: RelationStatus.BLOCKED,
};

export const useContacts = (relations: RelationData[] | undefined, tab: ContactsTabs) => {

  const [contacts, setContacts] = useState<RelationData[]>([]);

  useEffect(() => {
    if (!relations || relations.length === 0) return;

    const filteredContacts = relations.filter(
      relation => relation.status.includes(RELATION_DICT[tab])
    );

    setContacts(filteredContacts);
  }, [relations, tab]);

  return contacts;
};

export const useSearchContacts = (contacts: RelationData[], query: string) => {
  const [filteredContacts, setFilteredContacts] = useState<RelationData[]>([]);

  useEffect(() => {
    if (!query) {
      setFilteredContacts(contacts);
      return;
    }

    const q = query.trim().toLowerCase();

    setFilteredContacts(contacts.filter((relation) => {
        const { username, displayName } = relation.user;
        
        return (
          username.toLowerCase().includes(q) ||
          displayName.toLowerCase().includes(q)
        );
      })
    );
  }, [query, contacts]);

  return filteredContacts;
};