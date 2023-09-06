import { useGetUserData } from '@hooks';

import { useGetDmsQuery } from '../api';

export function DmList() {
  const { user } = useGetUserData();

  const { data: dms, isSuccess } = useGetDmsQuery(user.data!.id);

  if (!isSuccess) return null;

  return (
    <div>
    </div>
  );
}