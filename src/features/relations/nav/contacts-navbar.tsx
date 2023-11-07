import { capitalize } from 'lodash';

import type { ActiveIdState } from '@hooks';

import { ContactsTabs } from '../types';

import { TabButton } from '@components/ui/buttons';
import { Separator } from '@components/ui/displays';

import styles from './contacts-navbar.module.scss';
import { Tooltip } from '@components/ui/popups';
import { CreateDmButton } from '@features/dms/create';

import FriendsIcon from '@assets/icons/friends.svg?react';
import NewConvoIcon from '@assets/icons/new-conversation.svg?react';

export function ContactsNavbar({
  set, id
}: ActiveIdState) {
  const tabs = Object.values(ContactsTabs);

  return (
    <div className={styles.header}>
      <div>
        <FriendsIcon />
        <h2>Friends</h2>
        <Separator className={styles.divider} />
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
      <Tooltip
        text="New Group DM"
        direction="bottom"
      >
        <CreateDmButton
          position={{
            direction: 'bottom',
            align: 'end',
            gap: 0,
          }}
        >
          <NewConvoIcon />
        </CreateDmButton>
      </Tooltip>
    </div>
  );
}