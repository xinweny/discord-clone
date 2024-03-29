import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { StateContext } from '@context';
4
import { useGetUserData } from '@features/auth/hooks';
import { useLivekitContext } from '@features/webrtc/hooks';

import { setDocumentTitle } from '@utils';
import { getDmInfo } from '@features/dms/utils';

import { ContentLayout } from '@components/layouts';

import {
  DmContainer,
  DmHeader,
  DmParticipantsPanel,
} from '@features/dms/get';

import { useGetDmQuery } from '@features/dms/api';

export function DMPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const livekit = useLivekitContext();

  const panelState = useState<boolean>(true);
  const [showPanel] = panelState;

  const { user } = useGetUserData();
  const { data: dm, isError } = useGetDmQuery({ dmId: roomId!, userId: user.data!.id });

  useEffect(() => {
    if (isError) navigate('/channels/@me');
  }, [isError]);

  if (!dm) return null;

  const { name } = getDmInfo(dm, user.data!.id);

  const { isGroup } = dm;

  setDocumentTitle([`${isGroup ? '' : '@'}${name}`]);

  const isInCurrentRoomCall = livekit?.isCurrentRoom(roomId!);

  return (
    <StateContext.Provider value={panelState}>
      <ContentLayout
        header={<DmHeader dm={dm} />}
        panel={<DmParticipantsPanel
          participants={dm.participants}
          isGroup={isGroup}
          show={showPanel && !isInCurrentRoomCall}
        />}
      >
        <DmContainer dm={dm} />
      </ContentLayout>
    </StateContext.Provider>
  );
}