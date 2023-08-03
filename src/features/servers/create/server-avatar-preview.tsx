import { useFormContext } from 'react-hook-form';

import { useFileWatchSingle } from '@hooks';

export function ServerAvatarPreview() {
  const { control } = useFormContext();

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