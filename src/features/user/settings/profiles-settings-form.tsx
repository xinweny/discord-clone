import { useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { fileValidator } from '@utils';

import { UserSelfData } from '../types';

import { UserProfilePreview } from './user-profile-preview';

import {
  FormInput,
  FileInput,
  ColorInput,
  FormTextArea
} from '@components/ui';

export type UserFields = {
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

export function ProfilesSettingsForm() {
  const user = useOutletContext<UserSelfData>();

  const {
    register,
    handleSubmit,
    setValue,
    formState,
    control,
    reset,
  } = useForm<UserFields>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      displayName: user.displayName,
      bannerColor: user.bannerColor,
      bio: user.bio,
    },
  });

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
              hidden
            />
          </label>
          <button
            type="button"
            onClick={() => { setValue('file', undefined); }}
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
          register={register}
          control={control}
          maxLength={190}
          options={{ showLabel: true, showCharCount: true }}
        />
        {formState.isDirty && <div>
          <p>Careful - you have unsaved changes!</p>
          <button type="reset" onClick={() => { reset(); }}>Reset</button>
          <button type="submit">Save Changes</button>
        </div>}
      </form>
      <div>
        <p>PREVIEW</p>
        <UserProfilePreview
          control={control}
          username={user.username}
          avatarUrl={user.avatarUrl}
        />
      </div>
    </div>
  );
}