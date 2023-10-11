import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
  EditServerMemberFields,
  ServerMemberData
} from '../types';

import { editServerMemberSchema } from '../schema';

import {
  TextInput,
  ColorInput,
  TextAreaInput,
  FormGroup,
  FormChangesAlert,
} from '@components/ui/forms';

import { useUpdateServerMemberMutation } from '../api';

type EditServerMemberFormProps = {
  member: ServerMemberData;
};

export function EditServerMemberForm({
  member,
}: EditServerMemberFormProps) {
  const defaultValues = {
    memberId: member._id,
    serverId: member.serverId,
    displayName: member.displayName,
    bio: member.bio,
    bannerColor: member.bannerColor || '#18191c',
  };

  const [updateMember] = useUpdateServerMemberMutation();

  const methods = useForm<EditServerMemberFields>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(editServerMemberSchema),
  });
  const {
    watch,
    handleSubmit,
    reset,
  } = methods;

  const {
    displayName,
    bannerColor,
    bio,
  } = watch();

  const onSubmit = async (data: EditServerMemberFields) => {
    await updateMember(data).unwrap();

    reset(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormGroup label="Server Nickname" htmlFor="display-name">
            <TextInput
              id="display-name"
              name="displayName"
              value={displayName}
            />
          </FormGroup>
          <FormGroup label="Banner Color" htmlFor="banner-color">
            <ColorInput
              id="banner-color"
              name="bannerColor"
              value={bannerColor}
            />
          </FormGroup>
          <FormGroup label="About Me" htmlFor="bio">
            <TextAreaInput
              id="bio"
              name="bio"
              value={bio}
              maxLength={190}
              options={{ showCharCount: true }}
            />
          </FormGroup>
        </div>
        <FormChangesAlert defaultValues={defaultValues} />
      </form>
    </FormProvider>
  );
}