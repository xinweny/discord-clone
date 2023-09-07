import { useParams } from 'react-router-dom';

import { ContentLayout } from '@components/layouts';

import { DmHeader } from '@features/dms/get';

import { useGetDmQuery } from '@features/dms/api';

export function DMPage() {
  const { roomId } = useParams();

  const { data: dm, isSuccess } = useGetDmQuery(roomId!);

  if (!isSuccess) return null;

  return (
    <div>
      <ContentLayout
        header={<DmHeader dm={dm} />}
        infoTab={<div>contacts info</div>}
      >
        <div>DM MESSAGES</div>
      </ContentLayout>
    </div>
  );
}