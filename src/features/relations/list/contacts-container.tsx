import { useState, useEffect } from 'react';

import { RelationData, RelationStatus } from '../types';

import { useGetUserData } from '@hooks';

import { useGetRelationsQuery } from '../api';

import { NoContactsMessage } from './no-contacts-message';
import { ContactCard } from './contact-card';

type ContactsContainerProps = {
  query: string;
  activeTab: string;
};

const RELATION_DICT: {
  [key: string]: string;
} = {
  online: RelationStatus.FRIENDS,
  all: RelationStatus.FRIENDS,
  pending: 'pending',
  blocked: RelationStatus.BLOCKED,
};

export function ContactsContainer({ query, activeTab }: ContactsContainerProps) {
  const [contacts, setContacts] = useState<RelationData[]>([]);

  const { user } = useGetUserData();

  const relations = useGetRelationsQuery(user.data!.id);

  useEffect(() => {
    if (relations.isSuccess) setContacts(relations.data);
  }, [relations]);

  useEffect(() => {
    if (relations.isSuccess) {
      setContacts(
        relations.data.filter(
          relation => relation.status.includes(RELATION_DICT[activeTab])
        )
      );
    }
  }, [activeTab]);

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

  return (
    <div>
      <p>{`${activeTab.toUpperCase()} - ${contacts.length}`}</p>
      {contacts.length > 0
        ? (
          <div>
            {contacts.map(contact => (
              <ContactCard key={contact._id} contact={contact} />
            ))}
          </div>
        )
        : (
          <NoContactsMessage
            activeTab={activeTab}
            query={query}
          />
        )
      }
    </div>
  )
}