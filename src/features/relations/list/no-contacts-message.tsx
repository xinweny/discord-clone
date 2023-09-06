import { ContactsTabs } from '../types';

type NoContactsMessageProps = {
  activeTab: ContactsTabs;
  query: string;
};

export function NoContactsMessage({ activeTab, query }: NoContactsMessageProps) {
  const switchMessage = (tab: ContactsTabs) => {
    switch (tab) {
      case 'online': return 'No one\'s around to play with Wumpus...';
      case 'all': return 'Wumpus has no friends. You could though!';
      case 'pending': return 'There are no pending friend requests. Here\'s Wumpus for now.';
      case 'blocked': return 'You can\'t unblock the Wumpus.';
      default: return '';
    }
  };

  return (
    <div>
      <img src="#" alt="#" />
      <p>{query
        ? 'Wumpus looked but couldn\'t find anyone with that name.'
        : switchMessage(activeTab)
      }</p>
    </div>
  );
}