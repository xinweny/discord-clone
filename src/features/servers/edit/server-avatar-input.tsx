import { useWatch, useFormContext } from 'react-hook-form';

import { ImagePreview } from '@components/ui/media';

import { FileInput } from '@components/ui/forms';

type ServerAvatarInputProps = {
  src?: string;
};

export function ServerAvatarInput({
  src
}: ServerAvatarInputProps) {
  const name = 'avatar';

  const { setValue, control } = useFormContext();
  const avatar = useWatch({ control, name })

  return (
    <div>
      <div>
        <label htmlFor="server-avatar">
          <ImagePreview
            name={name}
            src={src}
            defaultSrc="#"
          />
          <FileInput
            id="server-avatar"
            name={name}
            accept="image/*"
            label="Upload"
            hidden
          />
        </label>
        {avatar
          ? <button
            type="button"
            onClick={() => { setValue(name, undefined); }}
          >Remove</button>
          : <p>Minimum Size: 128x128</p>
        }
      </div>
      <div>
        <p>We recommend an image of at least 512 x 512 for the server.</p>
        <label htmlFor="upload-image">
          <div>Change Avatar</div>
          <FileInput
          id="upload-image"
          name={name}
          accept="image/*"
          label="Upload"
          hidden
        />
        </label>
      </div>
    </div>
  );
}