import { useEffect, useState } from 'react';

import {
  RelationData,
  ContactsTabs,
  RelationStatus,
} from './types';

import { useGetUserStatusesQuery } from '@features/statuses/api';

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

export const useFriends = (relations: RelationData[] | undefined) => {
  const [friends, setFriends] = useState<RelationData[]>([]);

  const { data: statuses } = useGetUserStatusesQuery(
    friends.map(friend => friend._id),
    { skip: friends.length === 0 }
  );

  useEffect(() => {
    if (!relations || relations.length === 0) return;

    setFriends(relations.filter(relation => relation.status === RelationStatus.FRIENDS));
  }, [relations]);

  return { friends, statuses };
}