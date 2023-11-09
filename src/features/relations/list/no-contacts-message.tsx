import { ContactsTabs } from '../types';

import styles from './no-contacts-message.module.scss';

import wumpus1 from '@assets/static/wumpus_1.svg';
import wumpus2 from '@assets/static/wumpus_2.svg';
import wumpus3 from '@assets/static/wumpus_3.svg';
import wumpus4 from '@assets/static/wumpus_4.svg';

type NoContactsMessageProps = {
  activeTab: ContactsTabs;
  query: string;
};

export function NoContactsMessage({ activeTab, query }: NoContactsMessageProps) {
  const switchProps = (tab: ContactsTabs) => {
    switch (tab) {
      case 'online': return {
        src: wumpus1,
        message: 'No one\'s around to play with Wumpus...',
      };
      case 'all': return {
        src: wumpus2,
        message: 'Wumpus has no friends. You could though!',
      };
      case 'pending': return {
        src: wumpus3,
        message: 'There are no pending friend requests. Here\'s Wumpus for now.',
      };
      case 'blocked': return {
        src: wumpus4,
        message: 'You can\'t unblock the Wumpus.',
      };
      default: return {
        src: '',
        message: '',
      };
    }
  };

  const { src, message } = switchProps(activeTab);

  return (
    <div className={styles.container}>
      <img src={src || wumpus1} />
      <p>{query
        ? 'Wumpus looked, but couldn\'t find anyone with that name.'
        : message
      }</p>
    </div>
  );
}