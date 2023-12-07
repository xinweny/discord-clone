import { MutualServersList } from './mutual-servers-list';
import { MutualFriendsList } from './mutual-friends-list';

type MutualsListsProps = {
  participantId: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function MutualsLists({ participantId, ...props }: MutualsListsProps) {
  return (
    <div {...props}>
      <MutualServersList participantId={participantId} />
      <MutualFriendsList participantId={participantId} />
    </div>
  );
}