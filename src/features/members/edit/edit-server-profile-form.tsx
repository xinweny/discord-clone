import { useForm, FormProvider } from 'react-hook-form';

import { useActiveIds } from '@hooks';

import { useGetUserData } from '@features/auth/hooks';
import { useGetJoinedServersQuery } from '@features/servers/api';

export function EditServerProfileForm() {
  const currentServer = useActiveIds();

  const { user } = useGetUserData();

  const { data: joinedServers } = useGetJoinedServersQuery(user.data!._id);

  const methods = useForm();

  if (!joinedServers) return null;

  return (
    <div>
      <p>Show who you are with different profiles for each of your servers.</p>
    </div>
  );
}