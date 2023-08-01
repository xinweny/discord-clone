import { Control, useWatch } from 'react-hook-form';

import { useFileWatchSingle } from '@hooks';

import { Avatar } from '@components/ui';

import type { UserProfileFields } from './profiles-settings-form';

type UserProfilePreviewProps = {
  avatarUrl: string;
  username: string;
  control: Control<UserProfileFields>;
}

export function UserProfilePreview({
  control,
  avatarUrl,
  username,
}: UserProfilePreviewProps) {
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