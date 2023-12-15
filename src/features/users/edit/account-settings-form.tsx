import { useSettingsContext } from '@components/context';

import { useGetUserData } from '@features/auth/hooks';

import { Avatar, ColorBanner } from '@components/ui/media';

import { UserStatusIcon } from '../status';

export function AccountSettingsForm() {
  const settings = useSettingsContext();
  const { user } = useGetUserData();
  
  const self = user.data;

  if (!self) return null;

  return (
    <div>
      <ColorBanner color={self.bannerColor} />
      <div>
        <Avatar
          src={self.avatarUrl}
          notification={<UserStatusIcon userId={self.id} />}
        />
        <h3>{self.displayName}</h3>
        <button></button>
      </div>
      <div>

      </div>
    </div>
  );
}