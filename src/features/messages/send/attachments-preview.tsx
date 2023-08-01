import type { Control } from 'react-hook-form';

import type { MessageFields } from '.';

import { useFileWatchMulti } from '@hooks';

import { AttachmentCard } from './attachment-card';

type AttachmentsPreviewProps = {
  control: Control<MessageFields>;
};

export function AttachmentsPreview({
  control
}: AttachmentsPreviewProps) {
  const { previews, handleRemove } = useFileWatchMulti({ control, name: 'attachments' });

  if (previews.length === 0) return null;

  return (
    <div>
      {previews.map(preview => 
        <div key={preview.id}>
          <AttachmentCard preview={preview} handleRemove={handleRemove} />
        </div>
      )
      }
    </div>
  );
}