import { useEffect, useState } from 'react';

import type { RelationData } from './types';

import { useGetUserData } from '@hooks';

import { useGetRelationsQuery } from './api';

export const useContacts = (query: string) => {
  const { user } = useGetUserData();

  const relations = useGetRelationsQuery(user.data!.id);

  const [contacts, setContacts] = useState<RelationData[]>([]);

  useEffect(() => {
    if (relations.isSuccess) setContacts(relations.data);
  }, [relations]);

  useEffect(() => {
    if (query && relations.isSuccess) {
      const q = query.toLowerCase();

      setContacts((contacts) => {
        return contacts.filter((relation) => {
          const { username, displayName } = relation.user;
          
          return (
            username.toLowerCase().includes(q) ||
            displayName.toLowerCase().includes(q)
          );
        })
      });
    }
  }, [query]);

  const filterContactsByStatus = (status: string) => {
    if (relations.isSuccess) {
      setContacts(
        relations.data.filter(
          relation => relation.status.includes(status)
        ));
    }
  }

  return {
    contacts,
    filterContactsByStatus,
  };
};