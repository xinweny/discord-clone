import { useEffect, useState } from 'react';

import type { ModalProps } from '@types';
import type { DMData } from '@features/dms/types';

import { useServerContext } from '@features/servers/context';

import { useQuery } from '@hooks';
import { useGetUserData } from '@features/auth/hooks';

import { getDmInfo } from '@features/dms/utils';

import { ModalWrapper } from '@components/ui/modals';
import { SearchInput } from '@components/ui/forms';

import { ServerInviteLink } from '@features/server-invites/get';
import { DmCard } from '@features/dms/list';
import { SendInviteButton } from '.';

import { useGetDmsQuery } from '@features/dms/api';

type InviteFriendsModalProps = ModalProps;

export function InviteFriendsModal({
  isOpen,
  onClose,
}: InviteFriendsModalProps) {
  const server = useServerContext();

  const { query, setQuery } = useQuery();

  const { user } = useGetUserData();
  const userId = user.data!.id;

  const { data: dms } = useGetDmsQuery(userId);

  const [filteredDms, setFilteredDms] = useState<DMData[]>([]);

  useEffect(() => {
    const queriedDms = (query.length > 0 && dms)
      ? dms.filter(dm => {
        const { name } = getDmInfo(dm, userId);

        return name.toLowerCase().includes(query.toLowerCase());
      })
      : (dms || []);

      setFilteredDms(queriedDms);
  }, [query]);

  useEffect(() => {
    if (dms) setFilteredDms(dms);
  }, [dms]);

  if (!server) return null;

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen}>
      <div>
        <div>
          <h3>{`Invite friends to ${server.name}`}</h3>
          <SearchInput
            query={query}
            setQuery={setQuery}
            placeholder="Search for friends"
            showButton
          />
        </div>
        <div>
          {(filteredDms.length > 0)
            ? filteredDms.map(dm => <div
              key={dm._id}
            >
              <DmCard dm={dm} userId={userId} withStatus={false} />
              <SendInviteButton dmId={dm._id} serverId={server._id} />
            </div>)
          : <p>NO RESULTS FOUND</p>}
        </div>
        <div>
          <h3>OR SEND A SERVER INVITE LINK TO A FRIEND</h3>
          <ServerInviteLink serverId={server._id} />
        </div>
      </div>
      <button type="button" onClick={onClose}>x</button>
    </ModalWrapper>
  );
}