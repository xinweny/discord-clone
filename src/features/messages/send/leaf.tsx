import type { RenderLeafProps } from 'slate-react';
import { useNavigate } from 'react-router-dom';

import type { CustomText } from '@config';

import { useLazyGetServerInviteQuery } from '@features/server-invites/api';

export function Leaf ({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  const navigate = useNavigate();

  const [getServerInvite] = useLazyGetServerInviteQuery();

  const renderLeaf = (leaf: CustomText) => {
    const { decoration, text } = leaf;

    switch (decoration) {
      case 'link':
        return (
          <a
            style={{ cursor: 'pointer' }}
            href={text}
            onClick={() => {
              window.open(text, '_blank', 'noopener,noreferrer');
            }}
          >
            {children}
          </a>
        );
      case 'server_invite_link':
        return (
          <a
            style={{ cursor: 'pointer' }}
            href={text}
            onClick={async (e) => {
              e.preventDefault();

              const urlId = text.split('/').slice(-1)[0];

              const serverInvite = await getServerInvite({ urlId }).unwrap();

              navigate(serverInvite
                ? `/channels/${serverInvite.serverId}`
                : '/channels/@me');
            }}
          >
            {children}
          </a>
        );
      default:
        return children;
    }
  };

  return (
    <span {...attributes}>
      {renderLeaf(leaf)}
    </span>
  );
}