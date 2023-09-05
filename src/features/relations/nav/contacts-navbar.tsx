import { capitalize } from 'lodash';

import type { ActiveIdState } from '@hooks';

import { TabButton } from '@components/ui/buttons';

export function ContactsNavbar({
  set, id
}: ActiveIdState) {
  const tabs = ['online', 'all', 'pending', 'blocked'];

  return (
    <div>
      <div>
        <img src="#" />
        <p><strong>Friends</strong></p>
      </div>
      <div>
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
      </div>
    </div>
  );
}