import { useFormContext, useWatch } from 'react-hook-form';

import { useFileWatchSingle, useGetUserData } from '@hooks';

import { Avatar } from '@components/ui';

export function UserProfilePreview() {
  const { user } = useGetUserData();
  const { avatarUrl, username } = user.data!;

  const { control } = useFormContext();

  const displayName = useWatch({ control, name: 'displayName' });
  const bannerColor = useWatch({ control, name: 'bannerColor' });
  const bio = useWatch({ control, name: 'bio' });

  const { fileDataUrl } = useFileWatchSingle({ control, name: 'file' });

  return (
    <div>
      <div style={{ color: bannerColor }}></div>
      <Avatar src={fileDataUrl || avatarUrl} />
      <div>
        <div>
          <h4>{displayName}</h4>
          <p>{username}</p>
        </div>
        {bio && (
          <div>
            <p>ABOUT ME</p>
            <p>{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}