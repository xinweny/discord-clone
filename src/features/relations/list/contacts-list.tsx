import { ContactsTabs } from '../types';

import { useContacts } from '../hooks';

import { NoContactsMessage } from './no-contacts-message';
import { ContactCard } from './contact-card';

import styles from './contacts-list.module.scss';

type ContactsListProps = {
  query: string;
  activeTab: ContactsTabs;
};

export function ContactsList({ query, activeTab }: ContactsListProps) {
  const {
    contacts,
    statuses,
    updateStatus,
  } = useContacts(query, activeTab);

  const numContacts = activeTab === ContactsTabs.ONLINE
    ? Object.entries(statuses).filter(([, isOnline]) => isOnline).length
    : contacts.length;

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <p>{`${activeTab.toUpperCase()}${activeTab === ContactsTabs.ALL ? ' FRIENDS' : ''} — ${numContacts}`}</p>
      </div>
        {(activeTab === ContactsTabs.ONLINE
          ? Object.values(statuses).includes(true)
          : contacts.length > 0
        )
          ? <div className={styles.list}>
            {contacts.map(contact => (
              <ContactCard
                key={contact._id}
                contact={contact}
                activeTab={activeTab}
                updateStatus={updateStatus}
                hidden={activeTab === ContactsTabs.ONLINE
                  ? !statuses[contact.user._id]
                  : false}
                userStatuses={statuses}
              />
            ))}
          </div>
          : <NoContactsMessage
            activeTab={activeTab}
            query={query}
          />
        }
    </div>
  )
}