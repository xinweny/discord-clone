import { Link } from 'react-router-dom';

import type { DMData } from '../types';

import { getDmInfo } from '../utils';

import { Avatar } from '@components/ui/media';

import { UserStatusIcon } from '@features/users/status';

import defaultGroupAvatar from '@assets/static/default-group-avatar.png';

type DMCardProps = {
  dm: DMData;
  userId: string;
  withStatus?: boolean;
};

export function DmCard({
  dm,
  userId,
  withStatus = true,
}: DMCardProps) {
  const { isGroup } = dm;

  const {
    avatarUrl,
    name,
    customStatus,
    participants,
  } = getDmInfo(dm, userId);

  return (
    <Link to={`/channels/@me/${dm._id}`}>
      <div>
        <Avatar
          src={isGroup && !avatarUrl
            ? defaultGroupAvatar
            : avatarUrl
          }
          notification={(withStatus && !isGroup) && <UserStatusIcon
            userId={participants[0]._id}
          />}
        />
        <div>
          <p>{name}</p>
          <p>{customStatus}</p>
        </div>
      </div>
    </Link>
  );
}