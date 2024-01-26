import { useState, useEffect } from 'react';

import { ContactsTabs } from '../types';

import { useSocketRoomJoin } from '@services/websocket';

import { useContacts, useSearchContacts } from '../hooks';
import { useGetUserData } from '@features/auth/hooks';

import { NoContactsMessage } from './no-contacts-message';
import { ContactCard } from './contact-card';

import { useGetRelationsQuery } from '../api';
import { useGetFriendStatusesQuery } from '@features/statuses/api';

import styles from './contacts-list.module.scss';

type ContactsListProps = {
  query: string;
  activeTab: ContactsTabs;
};

export function ContactsList({ query, activeTab }: ContactsListProps) {
  const { user } = useGetUserData();
  const userId = user.data!.id;

  const [numContacts, setNumContacts] = useState<number>(0);

  const { data: relations } = useGetRelationsQuery(userId);
  const { data: statuses } = useGetFriendStatusesQuery(userId);

  useSocketRoomJoin(statuses ? Object.keys(statuses) : []);

  const contacts = useContacts(relations, activeTab);
  const filteredContacts = useSearchContacts(contacts, query);

  useEffect(() => {
    setNumContacts(activeTab === ContactsTabs.ONLINE
      ? (statuses
        ? Object.entries(statuses).filter(([, isOnline]) => isOnline).length
        : 0)
      : filteredContacts.length)
  }, [activeTab, filteredContacts, statuses]);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <p>{`${activeTab.toUpperCase()}${activeTab === ContactsTabs.ALL ? ' FRIENDS' : ''} — ${numContacts}`}</p>
      </div>
        {(activeTab === ContactsTabs.ONLINE
          ? statuses && Object.values(statuses).includes(true)
          : filteredContacts.length > 0)
            ? <div className={styles.list}>
              {filteredContacts.map(contact => (
                <ContactCard
                  key={contact._id}
                  contact={contact}
                  activeTab={activeTab}
                  isOnline={statuses ? statuses[contact.userId] : false}
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