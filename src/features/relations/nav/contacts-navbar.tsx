import { capitalize } from 'lodash';

import type { ActiveIdState } from '@hooks';

import { ContactsTabs } from '../types';

import { TabButton } from '@components/ui/buttons';

import FriendsIcon from '@assets/icons/friends.svg?react';

import styles from './contacts-navbar.module.scss';

export function ContactsNavbar({
  set, id
}: ActiveIdState) {
  const tabs = Object.values(ContactsTabs);

  return (
    <div className={styles.header}>
      <div>
        <FriendsIcon />
        <h2>Friends</h2>
      </div>
      <nav>
        {tabs.map(tab => <TabButton
          key={tab}
          tab={tab}
          set={set}
          id={id}
        >
          {capitalize(tab)}
        </TabButton>)}
        <TabButton
          id={id}
          tab="add_friend"
          set={set}
        >Add Friend</TabButton>
      </nav>
    </div>
  );
}