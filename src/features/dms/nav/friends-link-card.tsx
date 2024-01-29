import { Link, useParams } from 'react-router-dom';

import { DmsNavItem } from '.';

import FriendsIcon from '@assets/icons/friends.svg?react';

export function FriendsLinkCard() {
  const { roomId } = useParams();

  return (
    <Link to="/channels/@me">
      <DmsNavItem
        icon={<FriendsIcon width="24px" height="24px" />}
        isActive={!roomId}
      >
        <p>Friends</p>
      </DmsNavItem>
    </Link>
  );
}