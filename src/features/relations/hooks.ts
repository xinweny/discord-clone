import { useEffect, useState } from 'react';

import {
  RelationData,
  ContactsTabs,
  RelationStatus,
} from './types';
import { UserStatusesData } from '@features/statuses/types';

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

      const st: UserStatusesData = {};

      const friendContacts = relations.data.filter(
        relation => relation.status === RelationStatus.FRIENDS
      );

      for (const friend of friendContacts) {
        st[friend.user._id] = false;
      }

      setStatuses(st);
    }
  }, [relations]);

  useEffect(() => {
    if (!relations.isSuccess) return;

    if (query) {
      const q = query.trim().toLowerCase();

      setContacts(relations.data.filter((relation) => {
          const { username, displayName } = relation.user;
          
          return (
            username.toLowerCase().includes(q) ||
            displayName.toLowerCase().includes(q)
          );
        })
      );
    } else {
      setContacts(relations.data);
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

  const updateStatus = (userId: string, isOnline: boolean) => {
    setStatuses(prevStatuses => ({
      ...prevStatuses,
      [userId]: isOnline,
    }));
  };

  return {
    contacts,
    statuses,
    updateStatus,
  };
};