import { useEffect } from 'react';

import {
  ContactsTabs,
  RelationStatus,
} from '../types';

import { useContacts } from '../hooks';

import { NoContactsMessage } from './no-contacts-message';
import { ContactCard } from './contact-card';

type ContactsContainerProps = {
  query: string;
  activeTab: ContactsTabs;
};

const RELATION_DICT: {
  [key in ContactsTabs]: string;
} = {
  online: RelationStatus.FRIENDS,
  all: RelationStatus.FRIENDS,
  pending: 'pending',
  blocked: RelationStatus.BLOCKED,
};

export function ContactsContainer({ query, activeTab }: ContactsContainerProps) {
  const {
    contacts,
    filterContactsByStatus,
  } = useContacts(query);

  useEffect(() => {
    filterContactsByStatus(RELATION_DICT[activeTab]);
  }, [activeTab]);

  return (
    <div>
      <p>{`${activeTab.toUpperCase()} - ${contacts.length}`}</p>
      {contacts.length > 0
        ? (
          <div>
            {contacts.map(contact => (
              <ContactCard key={contact._id} contact={contact} activeTab={activeTab} />
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