import { Link } from 'react-router-dom';

import type { DMData } from '../types';

import { Avatar } from '@components/ui/media';
import { useDmInfo } from '../hooks';

type DMCardProps = {
  dm: DMData;
  userId: string;
};

export function DmCard({ dm, userId }: DMCardProps) {
  const {
    avatarUrl,
    name,
    customStatus,
  } = useDmInfo(dm, userId);

  return (
    <Link to={`/channels/@me/${dm._id}`}>
      <div>
        <Avatar src={avatarUrl} />
        <div>
          <p>{name}</p>
          <p>{customStatus}</p>
        </div>
      </div>
    </Link>
  );
}