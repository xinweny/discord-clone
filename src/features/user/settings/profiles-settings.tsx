import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { usePreviewSingle } from '@hooks';

import { fileValidator } from '@utils';

import { FormInput, FileInput, ColorInput, FormTextArea } from '@components/ui';

type UserFields = {
  displayName: string;
  file?: string;
  bannerColor: string;
  bio: string;
};

const userSchema = zod.object({
  displayName: zod.string().min(2),
  bannerColor: zod.string().optional(),
  bio: zod.string().min(2).max(190).optional(),
  file: fileValidator.avatar,
});

export function ProfilesSettings() {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register, 
    handleSubmit,
    setValue,
    setFocus,
    formState,
    reset,
  } = useForm<UserFields>({
    resolver: zodResolver(userSchema),
  });

  const { fileDataUrl, handleChange } = usePreviewSingle();

  return (
    <div>
      <form>
        <FormInput
          name="displayName"
          id="displayName"
          label="Display Name"
          register={register}
        />
        <div>
          <p>AVATAR</p>
          <label htmlFor="upload">
            <div>Change Avatar</div>
            <FileInput
              id="upload"
              name="file"
              accept="image/*"
              label="Upload"
              register={register}
              setValue={setValue}
              setPreview={handleChange}
              hidden
            />
          </label>
          <button
            type="button"
            onClick={() => setValue('file', undefined)}
          >Remove Avatar</button>
        </div>
        <ColorInput
          name="bannerColor"
          id="bannerColor"
          label="Banner Color"
          register={register}
        />
        <FormTextArea
          name="bio"
          id="bio"
          label="About Me"
          showLabel
          register={register}
        />
        {formState.isDirty && <div>
          <p>Careful - you have unsaved changes!</p>
          <button type="reset" onClick={() => { reset(); }}>Reset</button>
          <button type="submit">Save Changes</button>
        </div>}
      </form>
    </div>
  );
}