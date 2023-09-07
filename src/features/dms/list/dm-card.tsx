import { Link } from 'react-router-dom';
import pluralize from 'pluralize';

import type { DMData } from '../types';

import { Avatar } from '@components/ui/media';

type DMCardProps = {
  dm: DMData;
  userId: string;
};

export function DmCard({ dm, userId }: DMCardProps) {
  const {
    isGroup,
    imageUrl,
  } = dm;

  const participants = dm.participants.filter(participant => participant._id !== userId);

  const avatarUrl = isGroup
    ? imageUrl || "#"
    : participants[0].avatarUrl || "#";

  return (
    <Link to={`/channels/@me/${dm._id}`}>
      <div>
        <Avatar src={avatarUrl} />
        <div>
          <p>{isGroup
            ? dm.name || participants.map(participant => participant.displayName).join(', ')
            : participants[0].displayName
          }</p>
          <p>{isGroup
            ? `${pluralize('Member', participants.length, true)}`
            : participants[0].customStatus || ''
          }</p>
        </div>
      </div>
    </Link>
  );
}