import type { Control } from 'react-hook-form';

import type { CreateServerFields } from './create-server-form';

import { useFileWatchSingle } from '@hooks';

type ServerAvatarPreviewProps = {
  control: Control<CreateServerFields, any>;
};

export function ServerAvatarPreview({ control }: ServerAvatarPreviewProps) {
  const { fileDataUrl } = useFileWatchSingle({ control, name: 'file' });

  return (
    <div>
      <img
        src={fileDataUrl || '#'}
        alt={fileDataUrl ? 'Preview' : 'Upload'}
      />
    </div> 
  )
}