import { useFormContext } from 'react-hook-form';

import { FormGroup, FileInput } from '@components/ui/forms';

export function ProfileAvatarInput() {
  const { setValue } = useFormContext();

  return (
    <FormGroup label="avatar">
      <div>
        <label htmlFor="upload">
          <div>Change Avatar</div>
          <FileInput
            id="upload"
            name="file"
            accept="image/*"
            label="Upload"
            hidden
          />
        </label>
        <button
          type="button"
          onClick={() => { setValue('file', undefined); }}
        >Remove Avatar</button>
      </div>
    </FormGroup>
  );
}