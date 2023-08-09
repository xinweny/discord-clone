import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userProfileSchema } from './schema';

import { useGetUserData } from '@hooks';

import { useUpdateUserMutation } from '../api';

import {
  UserProfilePreview,
  ProfileAvatarInput,
} from '.';

import {
  TextInput,
  ColorInput,
  TextAreaInput,
  FormChangesAlert,
  FormGroup,
} from '@components/ui/forms';

export type UserProfileFields = {
  displayName: string;
  file?: File;
  bannerColor: string;
  bio: string;
};

export function ProfilesSettingsForm() {
  const { user } = useGetUserData();
  const {
    id,
    username,
    displayName,
    bannerColor,
    bio,
  } = user.data!;

  const defaultValues = {
    displayName,
    bannerColor: bannerColor || '#18191c',
    bio,
  };

  const methods = useForm<UserProfileFields>({
    resolver: zodResolver(userProfileSchema),
    defaultValues,
    mode: 'onChange',
  });
  const { reset, handleSubmit } = methods;

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: UserProfileFields) => {
    await updateUser({
      userId: id,
      username,
      ...data,
    });

    reset(data);
  };

  return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup label="display name" htmlFor="displayName">
            <TextInput
              name="displayName"
              id="displayName"
              label="Display Name"
            />
          </FormGroup>
          <ProfileAvatarInput />
          <FormGroup label="banner color" htmlFor="bannerColor">
            <ColorInput
              name="bannerColor"
              id="bannerColor"
              label="Banner Color"
            />
          </FormGroup>
          <FormGroup label="about me" htmlFor="bio">
            <TextAreaInput
              name="bio"
              id="bio"
              label="About Me"
              maxLength={190}
              options={{ showCharCount: true }}
            />
          </FormGroup>
          <FormChangesAlert defaultValues={defaultValues} />
        </form>
        <div>
          <p>PREVIEW</p>
          <UserProfilePreview />
        </div>
      </FormProvider>
  );
}