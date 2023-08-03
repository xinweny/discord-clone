import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userProfileSchema } from './user-profile-schema';

import { useGetUserData } from '@hooks';

import { useUpdateUserMutation } from '../api';

import { UserProfilePreview } from './user-profile-preview';

import {
  TextInput,
  FileInput,
  ColorInput,
  TextAreaInput,
  FormChangesModal,
  FormGroup,
} from '@components/ui';

export type UserProfileFields = {
  displayName: string;
  file?: File;
  bannerColor: string;
  bio: string;
};

export function ProfilesSettingsForm() {
  const { user: { data: user } } = useGetUserData();

  const {
    register,
    handleSubmit,
    setValue,
    formState,
    control,
    reset,
  } = useForm<UserProfileFields>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: user!.displayName,
      bannerColor: user!.bannerColor || '#18191c',
      bio: user!.bio,
    },
  });

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: UserProfileFields) => {
    await updateUser({
      userId: user!.id,
      username: user!.username,
      ...data,
    });

    reset(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="display name" htmlFor="displayName">
          <TextInput
            name="displayName"
            id="displayName"
            label="Display Name"
            register={register}
          />
        </FormGroup>
        <FormGroup label="avatar">
          <div>
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
        </FormGroup>
        <FormGroup label="banner color" htmlFor="bannerColor">
          <ColorInput
            name="bannerColor"
            id="bannerColor"
            label="Banner Color"
            register={register}
          />
        </FormGroup>
        <FormGroup label="about me" htmlFor="bio">
          <TextAreaInput
            name="bio"
            id="bio"
            label="About Me"
            register={register}
            control={control}
            maxLength={190}
            options={{ showCharCount: true }}
          />
        </FormGroup>
        <FormChangesModal
          reset={reset}
          isDirty={formState.isDirty}
        />
      </form>
      <div>
        <p>PREVIEW</p>
        <UserProfilePreview
          control={control}
          username={user!.username}
          avatarUrl={user!.avatarUrl}
        />
      </div>
    </div>
  );
}