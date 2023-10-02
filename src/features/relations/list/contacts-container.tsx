import { ContactsTabs } from '../types';

import { useContacts } from '../hooks';

import { NoContactsMessage } from './no-contacts-message';
import { ContactCard } from './contact-card';

type ContactsContainerProps = {
  query: string;
  activeTab: ContactsTabs;
};

export function ContactsContainer({ query, activeTab }: ContactsContainerProps) {
  const {
    contacts,
    statuses,
    updateStatus,
  } = useContacts(query, activeTab);

  const numContacts = activeTab === ContactsTabs.ONLINE
    ? Object.entries(statuses).filter(([, isOnline]) => isOnline).length
    : contacts.length;

  return (
    <div>
      <p>{`${activeTab.toUpperCase()} - ${numContacts}`}</p>
      {contacts.length > 0
        ? (
          <div>
            {contacts.map(contact => (
              <ContactCard
                key={contact._id}
                contact={contact}
                activeTab={activeTab}
                updateStatus={updateStatus}
                hidden={activeTab === ContactsTabs.ONLINE
                ? !statuses[contact.user._id]
                : false}
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