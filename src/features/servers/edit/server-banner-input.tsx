import { useWatch, useFormContext } from 'react-hook-form';

import { ImagePreview } from '@components/ui/media';

import { FormGroup, FileInput } from '@components/ui/forms';

type ServerBannerInputProps = {
  src?: string;
};

export function ServerBannerInput({
  src
}: ServerBannerInputProps) {
  const name = 'banner';

  const { setValue, control } = useFormContext();
  const banner = useWatch({ control, name })

  return (
    <div>
      <FormGroup label="Server Banner Background" htmlFor="server-banner">
        <div>
          <p>This image will display at the top of your channels list.</p>
          <p>The recommended minimum size is 960x540 and recommended aspect ratio is 16:9.</p>
        </div>
        <label htmlFor="upload-image">
          <div>Upload Background</div>
          <FileInput
            id="server-banner"
            name={name}
            accept="image/*"
            label="Upload Banner"
            hidden
          />
        </label>
      </FormGroup>
      <div>
        <label htmlFor="server-banner">
          <ImagePreview name={name}>
            <img src={src} alt="" />
          </ImagePreview>
          <FileInput
            id="server-banner"
            name={name}
            accept="image/*"
            label="Upload Banner"
            hidden
          />
        </label>
        {banner && (
          <button
            type="button"
            onClick={() => { setValue(name, undefined); }}
          >Remove</button>
        )}
      </div>
    </div>
  );
}