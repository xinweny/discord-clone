import pluralize from 'pluralize';
import { useToggle } from '@uidotdev/usehooks';

import { MutualServersList } from './mutual-servers-list';
import { MutualFriendsList } from './mutual-friends-list';

type MutualsListsProps = {
  participantId: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function MutualsLists({ participantId, ...props }: MutualsListsProps) {
  const [showServers, toggleServers] = useToggle(false);
  const [showFriends, toggleFriends] = useToggle(false);

  return (
    <div {...props}>
      <div>
        <button onClick={() => toggleServers(!showServers)}>
          {pluralize('Mutual Server', length, true)}
        </button>
        {showServers && <MutualServersList participantId={participantId} />}
      </div>
      <div>
        <button onClick={() => toggleFriends(!showFriends)}>
          {pluralize('Mutual Friend', length, true)}
        </button>
        {showFriends && <MutualFriendsList participantId={participantId} />}
      </div>
    </div>
  );
}