import { useEffect, useState } from 'react';

import {
  RelationData,
  ContactsTabs,
  RelationStatus,
} from './types';
import { UserStatusesData } from '@features/users/types';

import { useGetUserData } from '@features/auth/hooks';

import { useGetRelationsQuery } from './api';

const RELATION_DICT: {
  [key in ContactsTabs]: string;
} = {
  online: RelationStatus.FRIENDS,
  all: RelationStatus.FRIENDS,
  pending: 'pending',
  blocked: RelationStatus.BLOCKED,
};

export const useContacts = (query: string, tab: ContactsTabs) => {
  const { user } = useGetUserData();

  const relations = useGetRelationsQuery(user.data!.id);

  const [contacts, setContacts] = useState<RelationData[]>([]);
  const [statuses, setStatuses] = useState<UserStatusesData>({});

  useEffect(() => {
    if (relations.isSuccess) {
      setContacts(relations.data);
    }
  }, [relations]);

  useEffect(() => {
    if (query && relations.isSuccess) {
      const q = query.toLowerCase();

      setContacts(relations.data.filter((relation) => {
          const { username, displayName } = relation.user;
          
          return (
            username.toLowerCase().includes(q) ||
            displayName.toLowerCase().includes(q)
          );
        })
      );
    }
  }, [query]);

  useEffect(() => {
    if (relations.isSuccess) {
      const filteredContacts = relations.data.filter(
        relation => relation.status.includes(RELATION_DICT[tab])
      );

      setContacts(filteredContacts);
    }
  }, [tab]);

  useEffect(() => {
    if (tab === ContactsTabs.ONLINE && relations.isSuccess) {
      const friendContacts = relations.data.filter(
        relation => relation.status === RelationStatus.FRIENDS
      );

      setContacts(friendContacts.filter(relation => !!statuses[relation.userId]));
    }
  }, [statuses]);

  const updateStatus = (userId: string, isOnline: boolean) => {
    console.log('UPDATE STATUS: ', userId, isOnline)
    setStatuses(prevStatuses => ({
      ...prevStatuses,
      [userId]: isOnline,
    }));
  };

  return {
    contacts,
    updateStatus,
  };
};