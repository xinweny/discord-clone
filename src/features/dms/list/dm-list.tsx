import { useGetUserData } from '@hooks';

import { useGetDmsQuery } from '../api';

import { DmCard } from './dm-card';

export function DmList() {
  const { user } = useGetUserData();

  const { data: dms, isSuccess } = useGetDmsQuery(user.data!.id);

  if (!isSuccess) return null;

  return (
    <div>
      {dms.map(dm => <DmCard
        key={dm._id}
        dm={dm}
        userId={user.data!.id}
      />)}
    </div>
  );
}