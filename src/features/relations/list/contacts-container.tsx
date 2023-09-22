import type { ContactsTabs } from '../types';

import { useContacts } from '../hooks';

import { NoContactsMessage } from './no-contacts-message';
import { ContactCard } from './contact-card';

type ContactsContainerProps = {
  query: string;
  activeTab: ContactsTabs;
};

export function ContactsContainer({ query, activeTab }: ContactsContainerProps) {
  const { contacts, updateStatus } = useContacts(query, activeTab);

  return (
    <div>
      <p>{`${activeTab.toUpperCase()} - ${contacts.length}`}</p>
      {contacts.length > 0
        ? (
          <div>
            {contacts.map(contact => (
              <ContactCard
                key={contact._id}
                contact={contact}
                activeTab={activeTab}
                updateStatus={updateStatus}
              />
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