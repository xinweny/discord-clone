type NoContactsMessageProps = {
  activeTab: string;
  query: string;
};

export function NoContactsMessage({ activeTab, query }: NoContactsMessageProps) {
  let message = '';

  switch (activeTab) {
    case 'online': message = 'No one\'s around to play with Wumpus...'; break;
    case 'all': message = 'Wumpus has no friends. You could though!'; break;
    case 'pending': message = 'There are no pending friend requests. Here\'s Wumpus for now.'; break;
    case 'blocked': message = 'You can\'t unblock the Wumpus.'; break;
    default: break;
  }

  if (query) message = 'Wumpus looked but couldn\'t find anyone with that name.';

  return (
    <div>
      <img src="#" alt="#" />
      <p>{message}</p>
    </div>
  );
}